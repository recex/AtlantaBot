import { SlashCommandBuilder } from "discord.js";
import { Command } from "../../base/Command.js";
export default class Lmg extends Command {
    slashCommand = new SlashCommandBuilder()
        .setName("lmg")
        .setDescription("Let me Google that for you")
        .addStringOption(option => option.setName("query")
        .setDescription("The search query")
        .setRequired(true));
    constructor(client) {
        super(client, {
            name: "lmg",
            enabled: true,
            guildOnly: false,
            cooldown: 3000,
        });
    }
    async run(interaction, _data) {
        const query = interaction.options.getString("query", true);
        const encoded = encodeURIComponent(query);
        await interaction.reply({
            content: `🔍 <https://letmegooglethat.com/?q=${encoded}>`,
        });
    }
}
//# sourceMappingURL=lmg.js.map