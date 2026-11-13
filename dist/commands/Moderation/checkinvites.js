import { EmbedBuilder, PermissionFlagsBits, SlashCommandBuilder, } from "discord.js";
import { Command } from "../../base/Command.js";
export default class Checkinvites extends Command {
    slashCommand = new SlashCommandBuilder()
        .setName("checkinvites")
        .setDescription("List all active invites for this server")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild);
    constructor(client) {
        super(client, {
            name: "checkinvites",
            enabled: true,
            guildOnly: true,
            memberPermissions: [PermissionFlagsBits.ManageGuild],
            botPermissions: [PermissionFlagsBits.ManageGuild],
        });
    }
    async run(interaction, data) {
        const client = interaction.client;
        const guild = interaction.guild;
        const t = (key, args) => client.translate(key, args, data.guild.language);
        const invites = await guild.invites.fetch();
        if (!invites.size) {
            return void interaction.reply({
                content: t("moderation/checkinvites:NOBODY"),
                ephemeral: true,
            });
        }
        const sorted = [...invites.values()].sort((a, b) => (b.uses ?? 0) - (a.uses ?? 0));
        const description = sorted
            .slice(0, 20)
            .map((inv) => `**${inv.code}** — ${inv.uses ?? 0} uses — ${inv.inviter?.toString() ?? "Unknown"}`)
            .join("\n");
        const embed = new EmbedBuilder()
            .setColor(client.config.embed.color)
            .setAuthor({ name: guild.name, iconURL: guild.iconURL() ?? undefined })
            .setFooter({ text: client.config.embed.footer })
            .setDescription(description);
        interaction.reply({ embeds: [embed] });
    }
}
//# sourceMappingURL=checkinvites.js.map