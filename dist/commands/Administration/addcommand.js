import { EmbedBuilder, PermissionFlagsBits, SlashCommandBuilder, } from "discord.js";
import { Command } from "../../base/Command.js";
export default class Addcommand extends Command {
    slashCommand = new SlashCommandBuilder()
        .setName("addcommand")
        .setDescription("Add a custom command")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
        .addStringOption((o) => o.setName("name").setDescription("Command name").setRequired(true))
        .addStringOption((o) => o.setName("response").setDescription("Command response text").setRequired(true));
    constructor(client) {
        super(client, {
            name: "addcommand",
            enabled: true,
            guildOnly: true,
            memberPermissions: [PermissionFlagsBits.ManageGuild],
        });
    }
    async run(interaction, data) {
        const client = interaction.client;
        const name = interaction.options.getString("name", true).toLowerCase();
        const response = interaction.options.getString("response", true);
        const t = (key, args) => client.translate(key, args, data.guild.language);
        if (data.guild.customCommands.some((c) => c.name === name)) {
            return void interaction.reply({
                content: `A custom command with the name **${name}** already exists!`,
                ephemeral: true,
            });
        }
        data.guild.customCommands.push({ name, answer: response });
        data.guild.markModified("customCommands");
        await data.guild.save();
        const embed = new EmbedBuilder()
            .setColor(client.config.embed.color)
            .setFooter({ text: client.config.embed.footer })
            .setDescription(t("administration/addcommand:SUCCESS", { prefix: "/", commandName: name }));
        interaction.reply({ embeds: [embed] });
    }
}
//# sourceMappingURL=addcommand.js.map