import { ChatInputCommandInteraction } from "discord.js";
import { Command } from "../../base/Command.js";
import type Atlanta from "../../base/Atlanta.js";
import type { CommandData } from "../../types/index.js";
export default class Ascii extends Command {
    slashCommand: import("discord.js").SlashCommandOptionsOnlyBuilder;
    constructor(client: Atlanta);
    run(interaction: ChatInputCommandInteraction, data: CommandData): Promise<void>;
}
//# sourceMappingURL=ascii.d.ts.map