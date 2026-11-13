import { ChannelType, EmbedBuilder, PermissionFlagsBits, SlashCommandBuilder, } from "discord.js";
import { Command } from "../../base/Command.js";
export default class Ignore extends Command {
    slashCommand = new SlashCommandBuilder()
        .setName("ignore")
        .setDescription("Toggle a channel as ignored (bot will not respond there)")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
        .addChannelOption((o) => o.setName("channel").setDescription("Channel to toggle (defaults to current)")
        .addChannelTypes(ChannelType.GuildText));
    constructor(client) {
        super(client, {
            name: "ignore",
            enabled: true,
            guildOnly: true,
            memberPermissions: [PermissionFlagsBits.ManageGuild],
        });
    }
    async run(interaction, data) {
        const client = interaction.client;
        const channel = interaction.options.getChannel("channel") ?? interaction.channel;
        const t = (key, args) => client.translate(key, args, data.guild.language);
        const idx = data.guild.ignoredChannels.indexOf(channel.id);
        if (idx === -1) {
            data.guild.ignoredChannels.push(channel.id);
        }
        else {
            data.guild.ignoredChannels.splice(idx, 1);
        }
        data.guild.markModified("ignoredChannels");
        await data.guild.save();
        const isNowIgnored = idx === -1;
        const embed = new EmbedBuilder()
            .setColor(client.config.embed.color)
            .setFooter({ text: client.config.embed.footer })
            .setDescription(t(isNowIgnored
            ? "administration/ignore:IGNORED"
            : "administration/ignore:ALLOWED", { channel: `<#${channel.id}>` }));
        interaction.reply({ embeds: [embed] });
    }
}
//# sourceMappingURL=ignore.js.map