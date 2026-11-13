export class Command {
    client;
    conf;
    help;
    constructor(client, options) {
        this.client = client;
        this.conf = {
            enabled: options.enabled ?? true,
            guildOnly: options.guildOnly ?? false,
            memberPermissions: options.memberPermissions ?? [],
            botPermissions: options.botPermissions ?? [],
            nsfw: options.nsfw ?? false,
            ownerOnly: options.ownerOnly ?? false,
            cooldown: options.cooldown ?? 3000,
        };
        this.help = {
            name: options.name,
            category: options.category ?? "Other",
        };
    }
}
//# sourceMappingURL=Command.js.map