import { ChannelType, EmbedBuilder, PermissionFlagsBits, SlashCommandBuilder, } from "discord.js";
import { Command } from "../../base/Command.js";
export default class Announcement extends Command {
    slashCommand = new SlashCommandBuilder()
        .setName("announcement")
        .setDescription("Send an announcement embed to a channel")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .addChannelOption((o) => o.setName("channel").setDescription("Channel to send the announcement").setRequired(true)
        .addChannelTypes(ChannelType.GuildText, ChannelType.GuildAnnouncement))
        .addStringOption((o) => o.setName("message").setDescription("Announcement content").setRequired(true))
        .addStringOption((o) => o.setName("title").setDescription("Announcement title"))
        .addStringOption((o) => o.setName("color").setDescription("Embed color hex (e.g. #ff0000)"));
    constructor(client) {
        super(client, {
            name: "announcement",
            enabled: true,
            guildOnly: true,
            memberPermissions: [PermissionFlagsBits.ManageMessages],
            botPermissions: [PermissionFlagsBits.SendMessages],
        });
    }
    async run(interaction, data) {
        const client = interaction.client;
        const channel = interaction.options.getChannel("channel", true);
        const message = interaction.options.getString("message", true);
        const title = interaction.options.getString("title");
        const color = interaction.options.getString("color");
        const t = (key, args) => client.translate(key, args, data.guild.language);
        const embed = new EmbedBuilder()
            .setColor(color ?? client.config.embed.color)
            .setDescription(message)
            .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL() ?? undefined })
            .setTimestamp();
        if (title)
            embed.setTitle(title);
        await channel.send({ embeds: [embed] });
        const confirmEmbed = new EmbedBuilder()
            .setColor(client.config.embed.color)
            .setDescription(`${t("moderation/announcement:TITLE")} sent to <#${channel.id}>!`);
        interaction.reply({ embeds: [confirmEmbed], ephemeral: true });
    }
}
//# sourceMappingURL=announcement.js.map