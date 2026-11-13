import { type GuildMember, type PartialGuildMember } from "discord.js";
import type Atlanta from "../base/Atlanta.js";
export default class GuildMemberRemoveEvent {
    client: Atlanta;
    constructor(client: Atlanta);
    run(member: GuildMember | PartialGuildMember): Promise<void>;
}
//# sourceMappingURL=guildMemberRemove.d.ts.map