import { SlashCommandBuilder } from "discord.js";
import figlet from "figlet";
import { Command } from "../../base/Command.js";
export default class Ascii extends Command {
    slashCommand = new SlashCommandBuilder()
        .setName("ascii")
        .setDescription("Convert text to ASCII art")
        .addStringOption(option => option.setName("text")
        .setDescription("The text to convert")
        .setRequired(true));
    constructor(client) {
        super(client, {
            name: "ascii",
            enabled: true,
            guildOnly: false,
            cooldown: 5000,
        });
    }
    async run(interaction, data) {
        const client = interaction.client;
        const locale = data.guild.language;
        const text = interaction.options.getString("text", true);
        if (text.length > 20) {
            await interaction.reply({
                content: `${client.customEmojis.error} ${client.translate("fun/ascii:TEXT_MISSING", undefined, locale)}`,
                ephemeral: true,
            });
            return;
        }
        const rendered = figlet.textSync(text);
        if (rendered.length > 1990) {
            await interaction.reply({
                content: `${client.customEmojis.error} ${client.translate("fun/ascii:TEXT_MISSING", undefined, locale)}`,
                ephemeral: true,
            });
            return;
        }
        await interaction.reply({
            content: `\`\`\`\n${rendered}\n\`\`\``,
        });
    }
}
//# sourceMappingURL=ascii.js.map