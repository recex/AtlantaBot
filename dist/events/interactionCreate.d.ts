import { ChatInputCommandInteraction } from "discord.js";
import type Atlanta from "../base/Atlanta.js";
export default class InteractionCreateEvent {
    client: Atlanta;
    constructor(client: Atlanta);
    run(interaction: ChatInputCommandInteraction): Promise<void>;
}
//# sourceMappingURL=interactionCreate.d.ts.map