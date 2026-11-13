import type Atlanta from "../base/Atlanta.js";
import type { Guild } from "discord.js";
export default class GuildCreateEvent {
    client: Atlanta;
    constructor(client: Atlanta);
    run(guild: Guild): Promise<void>;
}
//# sourceMappingURL=guildCreate.d.ts.map