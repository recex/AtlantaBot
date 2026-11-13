import { EmbedBuilder, PermissionFlagsBits, SlashCommandBuilder, } from "discord.js";
import { Command } from "../../base/Command.js";
export default class Setwarns extends Command {
    slashCommand = new SlashCommandBuilder()
        .setName("setwarns")
        .setDescription("Configure automatic sanctions based on warn count")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
        .addStringOption((o) => o.setName("action").setDescription("Sanction type").setRequired(true)
        .addChoices({ name: "Kick", value: "kick" }, { name: "Ban", value: "ban" }))
        .addIntegerOption((o) => o.setName("number").setDescription("Number of warns to trigger action (0 to disable)").setRequired(true)
        .setMinValue(0).setMaxValue(100));
    constructor(client) {
        super(client, {
            name: "setwarns",
            enabled: true,
            guildOnly: true,
            memberPermissions: [PermissionFlagsBits.ManageGuild],
        });
    }
    async run(interaction, data) {
        const client = interaction.client;
        const action = interaction.options.getString("action", true);
        const number = interaction.options.getInteger("number", true);
        const t = (key, args) => client.translate(key, args, data.guild.language);
        data.guild.plugins.warnsSanctions[action] = number === 0 ? false : number;
        data.guild.markModified("plugins");
        await data.guild.save();
        const embed = new EmbedBuilder()
            .setColor(client.config.embed.color)
            .setFooter({ text: client.config.embed.footer })
            .setDescription(number === 0
            ? t(`moderation/setwarns:SUCCESS_${action.toUpperCase()}_RESET`)
            : t(`moderation/setwarns:SUCCESS_${action.toUpperCase()}`, { count: number, prefix: "/" }));
        interaction.reply({ embeds: [embed] });
    }
}
//# sourceMappingURL=setwarns.js.map