import { Client, Collection, GatewayIntentBits, } from "discord.js";
import { Player } from "discord-player";
import { GiveawaysManager } from "discord-giveaways";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime.js";
import { config } from "../config.js";
import GuildModel from "./Guild.js";
import UserModel from "./User.js";
import MemberModel from "./Member.js";
import LogModel from "./Log.js";
import Logger from "../helpers/logger.js";
import customEmojis from "../../emojis.json" with { type: "json" };
import languageMeta from "../../languages/language-meta.json" with { type: "json" };
dayjs.extend(relativeTime);
export default class Atlanta extends Client {
    config;
    customEmojis;
    languages;
    commands;
    logger;
    guildsData;
    usersData;
    membersData;
    logs;
    translations;
    states;
    knownGuilds;
    databaseCache;
    player;
    giveawaysManager;
    constructor() {
        super({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.GuildMessageReactions,
                GatewayIntentBits.GuildVoiceStates,
                GatewayIntentBits.DirectMessages,
            ],
            allowedMentions: { parse: ["users"] },
        });
        this.config = config;
        this.customEmojis = customEmojis;
        this.languages = languageMeta;
        this.commands = new Collection();
        this.logger = Logger;
        this.guildsData = GuildModel;
        this.usersData = UserModel;
        this.membersData = MemberModel;
        this.logs = LogModel;
        this.states = {};
        this.knownGuilds = [];
        this.databaseCache = {
            users: new Collection(),
            guilds: new Collection(),
            members: new Collection(),
            usersReminds: new Collection(),
            mutedUsers: new Collection(),
        };
        // --- ALTERADO: adicionado connectionTimeout maior + listeners de erro obrigatórios ---
        this.player = new Player(this, {
            connectionTimeout: 40_000,
        });
        this.player.events.on("error", (queue, error) => {
            console.error(`[Player error] ${queue.guild.name}:`, error);
        });
        this.player.events.on("playerError", (queue, error) => {
            console.error(`[Player playerError] ${queue.guild.name}:`, error);
        });
        // --- FIM DA ALTERAÇÃO ---
        this.giveawaysManager = new GiveawaysManager(this, {
            storage: "./giveaways.json",
            default: {
                botsCanWin: false,
                embedColor: "#FF0000",
                reaction: "🎉",
            },
        });
    }
    get defaultLanguage() {
        return this.languages.find((l) => l.default)?.name ?? "en-US";
    }
    translate(key, args, locale) {
        const lang = locale ?? this.defaultLanguage;
        const translator = this.translations.get(lang);
        if (!translator)
            throw new Error("Invalid language set in data.");
        const result = translator(key, args);
        return result || key.split(":").pop() || key;
    }
    printDate(date, format, locale) {
        const lang = locale ?? this.defaultLanguage;
        const languageData = this.languages.find((l) => l.name === lang || l.aliases.includes(lang));
        const fmt = format ?? languageData?.defaultMomentFormat ?? "MMMM D, YYYY";
        return dayjs(new Date(date)).format(fmt);
    }
    convertTime(time, type, noSuffix, locale) {
        const lang = locale ?? this.defaultLanguage;
        const _languageData = this.languages.find((l) => l.name === lang || l.aliases.includes(lang));
        if (type === "from")
            return dayjs(time).fromNow(noSuffix);
        return dayjs(time).toNow(noSuffix);
    }
    async findOrCreateUser({ id: userID }, isLean) {
        const cached = this.databaseCache.users.get(userID);
        if (cached)
            return isLean ? cached.toJSON() : cached;
        let userData = isLean
            ? await this.usersData.findOne({ id: userID }).lean()
            : await this.usersData.findOne({ id: userID });
        if (userData) {
            if (!isLean)
                this.databaseCache.users.set(userID, userData);
            return userData;
        }
        userData = new this.usersData({ id: userID });
        await userData.save();
        this.databaseCache.users.set(userID, userData);
        return userData;
    }
    async findOrCreateMember({ id: memberID, guildID }, isLean) {
        const cacheKey = `${memberID}${guildID}`;
        const cached = this.databaseCache.members.get(cacheKey);
        if (cached)
            return isLean ? cached.toJSON() : cached;
        let memberData = isLean
            ? await this.membersData.findOne({ guildID, id: memberID }).lean()
            : await this.membersData.findOne({ guildID, id: memberID });
        if (memberData) {
            if (!isLean)
                this.databaseCache.members.set(cacheKey, memberData);
            return memberData;
        }
        memberData = new this.membersData({ id: memberID, guildID });
        await memberData.save();
        const guild = await this.findOrCreateGuild({ id: guildID });
        if (guild) {
            guild.members.push(memberData._id);
            await guild.save();
        }
        this.databaseCache.members.set(cacheKey, memberData);
        return memberData;
    }
    async findOrCreateGuild({ id: guildID }, isLean) {
        const cached = this.databaseCache.guilds.get(guildID);
        if (cached)
            return isLean ? cached.toJSON() : cached;
        let guildData = isLean
            ? await this.guildsData.findOne({ id: guildID }).populate("members").lean()
            : await this.guildsData.findOne({ id: guildID }).populate("members");
        if (guildData) {
            if (!isLean)
                this.databaseCache.guilds.set(guildID, guildData);
            return guildData;
        }
        guildData = new this.guildsData({ id: guildID });
        await guildData.save();
        this.databaseCache.guilds.set(guildID, guildData);
        return guildData;
    }
    async resolveUser(search) {
        if (!search)
            return undefined;
        const mentionMatch = search.match(/^<@!?(\d+)>$/);
        if (mentionMatch) {
            const user = await this.users.fetch(mentionMatch[1]).catch(() => undefined);
            if (user)
                return user;
        }
        return this.users.fetch(search).catch(() => undefined);
    }
    async resolveMember(search, guild) {
        if (!search)
            return undefined;
        const mentionMatch = search.match(/^<@!?(\d+)>$/);
        if (mentionMatch) {
            const member = await guild.members.fetch(mentionMatch[1]).catch(() => undefined);
            if (member)
                return member;
        }
        return guild.members.fetch(search).catch(() => undefined);
    }
    async resolveRole(search, guild) {
        if (!search)
            return undefined;
        const mentionMatch = search.match(/^<@&!?(\d+)>$/);
        if (mentionMatch) {
            const role = guild.roles.cache.get(mentionMatch[1]);
            if (role)
                return role;
        }
        return guild.roles.cache.find((r) => r.name === search) ?? guild.roles.cache.get(search) ?? undefined;
    }
}
//# sourceMappingURL=Atlanta.js.map