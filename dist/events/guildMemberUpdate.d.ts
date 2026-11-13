import type { GuildMember, PartialGuildMember } from "discord.js";
import type Atlanta from "../base/Atlanta.js";
export default class GuildMemberUpdateEvent {
    client: Atlanta;
    constructor(client: Atlanta);
    run(oldMember: GuildMember | PartialGuildMember, newMember: GuildMember): Promise<void>;
}
//# sourceMappingURL=guildMemberUpdate.d.ts.map