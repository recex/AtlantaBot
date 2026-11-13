import { EmbedBuilder, PermissionFlagsBits, SlashCommandBuilder, } from "discord.js";
import { Command } from "../../base/Command.js";
export default class ClearSanctions extends Command {
    slashCommand = new SlashCommandBuilder()
        .setName("clear-sanctions")
        .setDescription("Clear all sanctions for a member")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .addUserOption((o) => o.setName("user").setDescription("Member to clear sanctions for").setRequired(true));
    constructor(client) {
        super(client, {
            name: "clear-sanctions",
            enabled: true,
            guildOnly: true,
            memberPermissions: [PermissionFlagsBits.ManageMessages],
        });
    }
    async run(interaction, data) {
        const client = interaction.client;
        const user = interaction.options.getUser("user", true);
        const guild = interaction.guild;
        const t = (key, args) => client.translate(key, args, data.guild.language);
        const memberData = await client.findOrCreateMember({ id: user.id, guildID: guild.id });
        const count = memberData.sanctions.length;
        if (!count) {
            return void interaction.reply({
                content: `**${user.toString()}** has no sanctions to clear.`,
                ephemeral: true,
            });
        }
        memberData.sanctions = [];
        memberData.markModified("sanctions");
        await memberData.save();
        const embed = new EmbedBuilder()
            .setColor(client.config.embed.color)
            .setFooter({ text: client.config.embed.footer })
            .setDescription(t("moderation/clear-sanctions:SUCCESS", { username: user.toString() }));
        interaction.reply({ embeds: [embed] });
    }
}
//# sourceMappingURL=clear-sanctions.js.map