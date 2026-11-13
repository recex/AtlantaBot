import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { Command } from "../../base/Command.js";
export default class Ping extends Command {
    slashCommand = new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Shows the bot latency");
    constructor(client) {
        super(client, {
            name: "ping",
            enabled: true,
            guildOnly: false,
            cooldown: 3000,
        });
    }
    async run(interaction, data) {
        const client = interaction.client;
        const locale = data.guild.language;
        const sent = await interaction.reply({
            content: "Pinging...",
            fetchReply: true,
        });
        const latency = sent.createdTimestamp - interaction.createdTimestamp;
        const embed = new EmbedBuilder()
            .setColor(data.config.embed.color)
            .setFooter({ text: data.config.embed.footer })
            .setDescription(client.translate("general/ping:CONTENT", {
            ping: latency.toString(),
        }, locale));
        await interaction.editReply({ content: null, embeds: [embed] });
    }
}
//# sourceMappingURL=ping.js.map