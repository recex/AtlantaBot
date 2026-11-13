import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import lyricsFinder from "lyrics-finder";
import { Command } from "../../base/Command.js";
export default class Lyrics extends Command {
    constructor(client) {
        super(client, {
            name: "lyrics",
            enabled: true,
            guildOnly: true,
            cooldown: 5000,
        });
    }
    slashCommand = new SlashCommandBuilder()
        .setName("lyrics")
        .setDescription("Fetch lyrics for a song")
        .addStringOption(opt => opt.setName("title").setDescription("Song title (defaults to current track)").setRequired(false));
    async run(interaction, data) {
        const client = interaction.client;
        const t = (key, args) => client.translate(key, args, data.guild.language);
        let title = interaction.options.getString("title");
        if (!title) {
            const queue = client.player.nodes.get(interaction.guildId);
            if (!queue?.currentTrack) {
                return void interaction.reply({
                    content: t("music/lyrics:MISSING_SONG_NAME"),
                    ephemeral: true,
                });
            }
            title = queue.currentTrack.title;
        }
        await interaction.deferReply();
        try {
            const lyrics = await lyricsFinder(title, "");
            if (!lyrics) {
                return void interaction.editReply({
                    content: t("music/lyrics:NO_LYRICS_FOUND", { songName: title }),
                });
            }
            const trimmed = lyrics.length > 4000 ? `${lyrics.slice(0, 4000)}...` : lyrics;
            const embed = new EmbedBuilder()
                .setColor(data.config.embed.color)
                .setTitle(t("music/lyrics:LYRICS_OF", { songName: title }))
                .setDescription(trimmed)
                .setFooter({ text: data.config.embed.footer })
                .setTimestamp();
            interaction.editReply({ embeds: [embed] });
        }
        catch {
            interaction.editReply({ content: "An error occurred while fetching the lyrics." });
        }
    }
}
//# sourceMappingURL=lyrics.js.map