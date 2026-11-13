import { SlashCommandBuilder } from "discord.js";
import ms from "ms";
import { Command } from "../../base/Command.js";
export default class Remindme extends Command {
    slashCommand = new SlashCommandBuilder()
        .setName("remindme")
        .setDescription("Set a reminder")
        .addStringOption(option => option.setName("time")
        .setDescription("Time until reminder (e.g. 10m, 1h, 2d)")
        .setRequired(true))
        .addStringOption(option => option.setName("message")
        .setDescription("What to remind you about")
        .setRequired(true));
    constructor(client) {
        super(client, {
            name: "remindme",
            enabled: true,
            guildOnly: false,
            cooldown: 5000,
        });
    }
    async run(interaction, data) {
        const client = interaction.client;
        const locale = data.guild.language;
        const timeStr = interaction.options.getString("time", true);
        const message = interaction.options.getString("message", true);
        const duration = ms(timeStr);
        if (!duration || duration < 1000) {
            await interaction.reply({
                content: `${client.customEmojis.error} ${client.translate("general/remindme:MISSING_MESSAGE", undefined, locale)}`,
                ephemeral: true,
            });
            return;
        }
        const sendAt = Date.now() + duration;
        data.userData.reminds.push({
            message,
            createdAt: Date.now(),
            sendAt,
        });
        await data.userData.save();
        client.databaseCache.usersReminds.set(interaction.user.id, data.userData);
        await interaction.reply({
            content: `${client.customEmojis.success} ${client.translate("general/remindme:SAVED", undefined, locale)}`,
        });
    }
}
//# sourceMappingURL=remindme.js.map