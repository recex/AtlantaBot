import { EmbedBuilder, PermissionFlagsBits, SlashCommandBuilder, } from "discord.js";
import { Command } from "../../base/Command.js";
export default class Clear extends Command {
    slashCommand = new SlashCommandBuilder()
        .setName("clear")
        .setDescription("Bulk-delete messages from a channel")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .addIntegerOption((o) => o.setName("amount").setDescription("Number of messages to delete (1-100)").setRequired(true)
        .setMinValue(1).setMaxValue(100))
        .addUserOption((o) => o.setName("user").setDescription("Only delete messages from this user"));
    constructor(client) {
        super(client, {
            name: "clear",
            enabled: true,
            guildOnly: true,
            memberPermissions: [PermissionFlagsBits.ManageMessages],
            botPermissions: [PermissionFlagsBits.ManageMessages],
        });
    }
    async run(interaction, data) {
        const client = interaction.client;
        const amount = interaction.options.getInteger("amount", true);
        const targetUser = interaction.options.getUser("user");
        const channel = interaction.channel;
        const t = (key, args) => client.translate(key, args, data.guild.language);
        await interaction.deferReply({ ephemeral: true });
        const fetched = await channel.messages.fetch({ limit: amount });
        const toDelete = targetUser
            ? fetched.filter((m) => m.author.id === targetUser.id)
            : fetched;
        const deleted = await channel.bulkDelete(toDelete, true);
        const embed = new EmbedBuilder()
            .setColor(client.config.embed.color)
            .setFooter({ text: client.config.embed.footer })
            .setDescription(t("moderation/clear:CLEARED", { amount: deleted.size }));
        interaction.editReply({ embeds: [embed] });
    }
}
//# sourceMappingURL=clear.js.map