import { EmbedBuilder, PermissionFlagsBits, SlashCommandBuilder, } from "discord.js";
import { Command } from "../../base/Command.js";
export default class Automod extends Command {
    slashCommand = new SlashCommandBuilder()
        .setName("automod")
        .setDescription("Toggle the automod system")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
        .addSubcommand((sub) => sub.setName("enable").setDescription("Enable automod"))
        .addSubcommand((sub) => sub.setName("disable").setDescription("Disable automod"));
    constructor(client) {
        super(client, {
            name: "automod",
            enabled: true,
            guildOnly: true,
            memberPermissions: [PermissionFlagsBits.ManageGuild],
        });
    }
    async run(interaction, data) {
        const client = interaction.client;
        const sub = interaction.options.getSubcommand();
        const t = (key, args) => client.translate(key, args, data.guild.language);
        const enabling = sub === "enable";
        data.guild.plugins.automod.enabled = enabling;
        data.guild.markModified("plugins");
        await data.guild.save();
        const embed = new EmbedBuilder()
            .setColor(client.config.embed.color)
            .setFooter({ text: client.config.embed.footer })
            .setDescription(t(enabling ? "administration/automod:ENABLED" : "administration/automod:DISABLED"));
        interaction.reply({ embeds: [embed] });
    }
}
//# sourceMappingURL=automod.js.map