import { type GuildMember } from "discord.js";
import type Atlanta from "../base/Atlanta.js";
export default class GuildMemberAddEvent {
    client: Atlanta;
    constructor(client: Atlanta);
    run(member: GuildMember): Promise<void>;
}
//# sourceMappingURL=guildMemberAdd.d.ts.map