import { EmbedBuilder, PermissionFlagsBits, SlashCommandBuilder, } from "discord.js";
import { Command } from "../../base/Command.js";
export default class Poll extends Command {
    slashCommand = new SlashCommandBuilder()
        .setName("poll")
        .setDescription("Create a yes/no poll")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .addStringOption((o) => o.setName("question").setDescription("The poll question").setRequired(true));
    constructor(client) {
        super(client, {
            name: "poll",
            enabled: true,
            guildOnly: true,
            memberPermissions: [PermissionFlagsBits.ManageMessages],
        });
    }
    async run(interaction, data) {
        const client = interaction.client;
        const question = interaction.options.getString("question", true);
        const t = (key, args) => client.translate(key, args, data.guild.language);
        const embed = new EmbedBuilder()
            .setColor(client.config.embed.color)
            .setAuthor({ name: t("moderation/poll:TITLE"), iconURL: interaction.user.displayAvatarURL() })
            .setDescription(question)
            .setFooter({ text: client.config.embed.footer });
        await interaction.reply({ content: "Poll sent!", ephemeral: true });
        const channel = interaction.channel;
        if (!("send" in channel))
            return;
        const pollMsg = await channel.send({ embeds: [embed] });
        await pollMsg.react("👍");
        await pollMsg.react("👎");
    }
}
//# sourceMappingURL=poll.js.map