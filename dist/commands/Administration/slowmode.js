import { ChannelType, EmbedBuilder, PermissionFlagsBits, SlashCommandBuilder, } from "discord.js";
import { Command } from "../../base/Command.js";
export default class Slowmode extends Command {
    slashCommand = new SlashCommandBuilder()
        .setName("slowmode")
        .setDescription("Set a channel's slowmode interval")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
        .addChannelOption((o) => o.setName("channel").setDescription("Target channel").setRequired(true)
        .addChannelTypes(ChannelType.GuildText))
        .addIntegerOption((o) => o.setName("time").setDescription("Slowmode in seconds (0 to disable)").setRequired(true)
        .setMinValue(0).setMaxValue(21600));
    constructor(client) {
        super(client, {
            name: "slowmode",
            enabled: true,
            guildOnly: true,
            memberPermissions: [PermissionFlagsBits.ManageChannels],
            botPermissions: [PermissionFlagsBits.ManageChannels],
        });
    }
    async run(interaction, data) {
        const client = interaction.client;
        const channel = interaction.options.getChannel("channel", true);
        const time = interaction.options.getInteger("time", true);
        const t = (key, args) => client.translate(key, args, data.guild.language);
        await channel.setRateLimitPerUser(time);
        const embed = new EmbedBuilder()
            .setColor(client.config.embed.color)
            .setFooter({ text: client.config.embed.footer })
            .setDescription(time === 0
            ? t("administration/slowmode:DISABLED", { channel: `<#${channel.id}>` })
            : t("administration/slowmode:ENABLED", { channel: `<#${channel.id}>`, time: String(time) }));
        interaction.reply({ embeds: [embed] });
    }
}
//# sourceMappingURL=slowmode.js.map