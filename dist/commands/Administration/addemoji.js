import { EmbedBuilder, PermissionFlagsBits, SlashCommandBuilder, } from "discord.js";
import { Command } from "../../base/Command.js";
export default class Addemoji extends Command {
    slashCommand = new SlashCommandBuilder()
        .setName("addemoji")
        .setDescription("Add a custom emoji to the server")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuildExpressions)
        .addStringOption((o) => o.setName("name").setDescription("Emoji name").setRequired(true))
        .addStringOption((o) => o.setName("url").setDescription("Image URL for the emoji").setRequired(true));
    constructor(client) {
        super(client, {
            name: "addemoji",
            enabled: true,
            guildOnly: true,
            memberPermissions: [PermissionFlagsBits.ManageGuildExpressions],
            botPermissions: [PermissionFlagsBits.ManageGuildExpressions],
        });
    }
    async run(interaction, data) {
        const client = interaction.client;
        const name = interaction.options.getString("name", true);
        const url = interaction.options.getString("url", true);
        const t = (key, args) => client.translate(key, args, data.guild.language);
        try {
            const emoji = await interaction.guild.emojis.create({ attachment: url, name });
            const embed = new EmbedBuilder()
                .setColor(client.config.embed.color)
                .setFooter({ text: client.config.embed.footer })
                .setDescription(t("administration/addemoji:SUCCESS", { emoji: emoji.toString() }));
            interaction.reply({ embeds: [embed] });
        }
        catch {
            interaction.reply({
                content: t("administration/addemoji:ERROR"),
                ephemeral: true,
            });
        }
    }
}
//# sourceMappingURL=addemoji.js.map