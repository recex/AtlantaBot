import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { Command } from "../../base/Command.js";
const MAX_LENGTH = 256;
export default class SetBio extends Command {
    constructor(client) {
        super(client, {
            name: "setbio",
            enabled: true,
            guildOnly: false,
            cooldown: 5000,
        });
    }
    slashCommand = new SlashCommandBuilder()
        .setName("setbio")
        .setDescription("Set your profile bio")
        .addStringOption((o) => o
        .setName("text")
        .setDescription("Your new bio text")
        .setRequired(true)
        .setMaxLength(MAX_LENGTH));
    async run(interaction, data) {
        const client = interaction.client;
        const t = (key, args) => client.translate(key, args, data.guild.language);
        const text = interaction.options.getString("text", true);
        data.userData.bio = text;
        await data.userData.save();
        const embed = new EmbedBuilder()
            .setAuthor({
            name: "Biography",
            iconURL: interaction.user.displayAvatarURL(),
        })
            .setDescription(t("economy/setbio:SUCCESS"))
            .setColor(data.config.embed.color)
            .setFooter({ text: data.config.embed.footer })
            .setTimestamp();
        await interaction.reply({ embeds: [embed] });
    }
}
//# sourceMappingURL=setbio.js.map