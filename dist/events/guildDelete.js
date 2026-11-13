import { EmbedBuilder } from "discord.js";
export default class GuildDeleteEvent {
    client;
    constructor(client) {
        this.client = client;
    }
    async run(guild) {
        const humans = guild.members.cache.filter((m) => !m.user.bot).size;
        const bots = guild.members.cache.filter((m) => m.user.bot).size;
        const embed = new EmbedBuilder()
            .setAuthor({ name: guild.name, iconURL: guild.iconURL() ?? undefined })
            .setColor("#B22222")
            .setDescription(`Removed from **${guild.name}** with **${humans}** members (and ${bots} bots)`);
        const logsChannel = this.client.channels.cache.get(this.client.config.support.logs);
        if (logsChannel?.isTextBased() && "send" in logsChannel)
            logsChannel.send({ embeds: [embed] }).catch(() => { });
    }
}
//# sourceMappingURL=guildDelete.js.map