import type Atlanta from "../base/Atlanta.js";
import type { Guild } from "discord.js";
export default class GuildDeleteEvent {
    client: Atlanta;
    constructor(client: Atlanta);
    run(guild: Guild): Promise<void>;
}
//# sourceMappingURL=guildDelete.d.ts.map