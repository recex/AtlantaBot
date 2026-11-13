import { SlashCommandBuilder } from "discord.js";
import { Command } from "../../base/Command.js";
export default class Flip extends Command {
    slashCommand = new SlashCommandBuilder()
        .setName("flip")
        .setDescription("Flip a coin");
    constructor(client) {
        super(client, {
            name: "flip",
            enabled: true,
            guildOnly: false,
            cooldown: 3000,
        });
    }
    async run(interaction, data) {
        const client = interaction.client;
        const locale = data.guild.language;
        const result = Math.random() < 0.5 ? "HEADS" : "TAILS";
        await interaction.reply({
            content: `🪙 ${client.translate(`fun/flip:${result}`, undefined, locale)}`,
        });
    }
}
//# sourceMappingURL=flip.js.map