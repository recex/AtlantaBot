import { Client, Collection, type Guild as DiscordGuild, type GuildMember, type Role, type User as DiscordUser } from "discord.js";
import { Player } from "discord-player";
import { GiveawaysManager } from "discord-giveaways";
import type { TFunction } from "i18next";
import type { HydratedDocument } from "mongoose";
import { Command } from "./Command.js";
import GuildModel, { type IGuild } from "./Guild.js";
import UserModel, { type IUser } from "./User.js";
import MemberModel, { type IMember } from "./Member.js";
import LogModel from "./Log.js";
import Logger from "../helpers/logger.js";
import type { BotConfig, CustomEmojis, DatabaseCache, LanguageMeta } from "../types/index.js";
export default class Atlanta extends Client {
    config: BotConfig;
    customEmojis: CustomEmojis;
    languages: LanguageMeta[];
    commands: Collection<string, Command>;
    logger: typeof Logger;
    guildsData: typeof GuildModel;
    usersData: typeof UserModel;
    membersData: typeof MemberModel;
    logs: typeof LogModel;
    translations: Map<string, TFunction>;
    states: Record<string, string>;
    knownGuilds: string[];
    databaseCache: DatabaseCache;
    player: Player;
    giveawaysManager: GiveawaysManager;
    constructor();
    get defaultLanguage(): string;
    translate(key: string, args?: Record<string, unknown>, locale?: string): string;
    printDate(date: Date | number, format?: string, locale?: string): string;
    convertTime(time: number | Date, type?: string, noSuffix?: boolean, locale?: string): string;
    findOrCreateUser({ id: userID }: {
        id: string;
    }, isLean?: boolean): Promise<HydratedDocument<IUser>>;
    findOrCreateMember({ id: memberID, guildID }: {
        id: string;
        guildID: string;
    }, isLean?: boolean): Promise<HydratedDocument<IMember>>;
    findOrCreateGuild({ id: guildID }: {
        id: string;
    }, isLean?: boolean): Promise<HydratedDocument<IGuild>>;
    resolveUser(search: string): Promise<DiscordUser | undefined>;
    resolveMember(search: string, guild: DiscordGuild): Promise<GuildMember | undefined>;
    resolveRole(search: string, guild: DiscordGuild): Promise<Role | undefined>;
}
//# sourceMappingURL=Atlanta.d.ts.map