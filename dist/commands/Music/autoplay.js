import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { Command } from "../../base/Command.js";
export default class Autoplay extends Command {
    constructor(client) {
        super(client, {
            name: "autoplay",
            enabled: true,
            guildOnly: true,
            cooldown: 3000,
        });
    }
    slashCommand = new SlashCommandBuilder()
        .setName("autoplay")
        .setDescription("Toggle autoplay mode");
    async run(interaction, data) {
        const client = interaction.client;
        const t = (key, args) => client.translate(key, args, data.guild.language);
        const queue = client.player.nodes.get(interaction.guildId);
        if (!queue || !queue.isPlaying()) {
            return void interaction.reply({
                content: t("music/play:NOT_PLAYING"),
                ephemeral: true,
            });
        }
        queue.setRepeatMode(queue.repeatMode === 3 ? 0 : 3);
        const enabled = queue.repeatMode === 3;
        const embed = new EmbedBuilder()
            .setColor(data.config.embed.color)
            .setDescription(enabled
            ? t("music/autoplay:SUCCESS_ENABLED", { success: "✅" })
            : t("music/autoplay:SUCCESS_DISABLED", { success: "✅" }))
            .setFooter({ text: data.config.embed.footer })
            .setTimestamp();
        interaction.reply({ embeds: [embed] });
    }
}
//# sourceMappingURL=autoplay.js.map