import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { Command } from "../../base/Command.js";
export default class Avatar extends Command {
    constructor(client) {
        super(client, {
            name: "avatar",
            enabled: true,
            guildOnly: false,
            cooldown: 3000,
        });
    }
    slashCommand = new SlashCommandBuilder()
        .setName("avatar")
        .setDescription("Show a user's avatar")
        .addUserOption(opt => opt.setName("user").setDescription("The user to show the avatar of").setRequired(false));
    async run(interaction, data) {
        const client = interaction.client;
        const t = (key, args) => client.translate(key, args, data.guild.language);
        const user = interaction.options.getUser("user") ?? interaction.user;
        const avatarURL = user.displayAvatarURL({ size: 2048, extension: "png" });
        const embed = new EmbedBuilder()
            .setColor(data.config.embed.color)
            .setTitle(`${user.username}'s Avatar`)
            .setImage(avatarURL)
            .setDescription(`[png](${user.displayAvatarURL({ extension: "png", size: 2048 })}) | ` +
            `[jpg](${user.displayAvatarURL({ extension: "jpg", size: 2048 })}) | ` +
            `[webp](${user.displayAvatarURL({ extension: "webp", size: 2048 })})`)
            .setFooter({ text: data.config.embed.footer })
            .setTimestamp();
        interaction.reply({ embeds: [embed] });
    }
}
//# sourceMappingURL=avatar.js.map