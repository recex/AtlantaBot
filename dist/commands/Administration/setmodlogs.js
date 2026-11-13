import { ChannelType, EmbedBuilder, PermissionFlagsBits, SlashCommandBuilder, } from "discord.js";
import { Command } from "../../base/Command.js";
export default class Setmodlogs extends Command {
    slashCommand = new SlashCommandBuilder()
        .setName("setmodlogs")
        .setDescription("Set the moderation logs channel")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
        .addChannelOption((o) => o.setName("channel").setDescription("Channel for modlogs (omit to disable)")
        .addChannelTypes(ChannelType.GuildText));
    constructor(client) {
        super(client, {
            name: "setmodlogs",
            enabled: true,
            guildOnly: true,
            memberPermissions: [PermissionFlagsBits.ManageGuild],
        });
    }
    async run(interaction, data) {
        const client = interaction.client;
        const channel = interaction.options.getChannel("channel");
        const t = (key, args) => client.translate(key, args, data.guild.language);
        if (channel) {
            data.guild.plugins.modlogs = channel.id;
        }
        else {
            data.guild.plugins.modlogs = false;
        }
        data.guild.markModified("plugins");
        await data.guild.save();
        const embed = new EmbedBuilder()
            .setColor(client.config.embed.color)
            .setFooter({ text: client.config.embed.footer })
            .setDescription(channel
            ? t("administration/setmodlogs:SUCCESS_ENABLED", { channel: `<#${channel.id}>` })
            : t("administration/setmodlogs:SUCCESS_DISABLED"));
        interaction.reply({ embeds: [embed] });
    }
}
//# sourceMappingURL=setmodlogs.js.map