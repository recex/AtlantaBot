import { SlashCommandBuilder } from "discord.js";
import { Command } from "../../base/Command.js";
export default class Someone extends Command {
    slashCommand = new SlashCommandBuilder()
        .setName("someone")
        .setDescription("Mentions a random member of the server");
    constructor(client) {
        super(client, {
            name: "someone",
            enabled: true,
            guildOnly: true,
            cooldown: 5000,
        });
    }
    async run(interaction, data) {
        const client = interaction.client;
        const locale = data.guild.language;
        const members = await interaction.guild.members.fetch();
        const nonBotMembers = members.filter(m => !m.user.bot);
        const random = nonBotMembers.random();
        if (!random) {
            await interaction.reply({
                content: `${client.customEmojis.error} No members found!`,
                ephemeral: true,
            });
            return;
        }
        await interaction.reply({
            content: `🎲 ${random} (${random.user.tag})`,
        });
    }
}
//# sourceMappingURL=someone.js.map