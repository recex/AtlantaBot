import { EmbedBuilder, PermissionFlagsBits, SlashCommandBuilder, } from "discord.js";
import { Command } from "../../base/Command.js";
export default class Deletemod extends Command {
    slashCommand = new SlashCommandBuilder()
        .setName("deletemod")
        .setDescription("Toggle auto-deletion of moderation commands")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild);
    constructor(client) {
        super(client, {
            name: "deletemod",
            enabled: true,
            guildOnly: true,
            memberPermissions: [PermissionFlagsBits.ManageGuild],
        });
    }
    async run(interaction, data) {
        const client = interaction.client;
        const t = (key, args) => client.translate(key, args, data.guild.language);
        data.guild.autoDeleteModCommands = !data.guild.autoDeleteModCommands;
        await data.guild.save();
        const embed = new EmbedBuilder()
            .setColor(client.config.embed.color)
            .setFooter({ text: client.config.embed.footer })
            .setDescription(t(data.guild.autoDeleteModCommands
            ? "administration/deletemod:ENABLED"
            : "administration/deletemod:DISABLED"));
        interaction.reply({ embeds: [embed] });
    }
}
//# sourceMappingURL=deletemod.js.map