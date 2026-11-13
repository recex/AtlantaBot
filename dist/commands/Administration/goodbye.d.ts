import { ChatInputCommandInteraction } from "discord.js";
import { Command } from "../../base/Command.js";
import type Atlanta from "../../base/Atlanta.js";
import type { CommandData } from "../../types/index.js";
export default class Goodbye extends Command {
    slashCommand: import("discord.js").SlashCommandSubcommandsOnlyBuilder;
    constructor(client: Atlanta);
    run(interaction: ChatInputCommandInteraction, data: CommandData): Promise<undefined>;
}
//# sourceMappingURL=goodbye.d.ts.map