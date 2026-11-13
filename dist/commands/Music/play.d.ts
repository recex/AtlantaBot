import { ChatInputCommandInteraction } from "discord.js";
import { Command } from "../../base/Command.js";
import type Atlanta from "../../base/Atlanta.js";
import type { CommandData } from "../../types/index.js";
export default class Play extends Command {
    constructor(client: Atlanta);
    slashCommand: import("discord.js").SlashCommandOptionsOnlyBuilder;
    run(interaction: ChatInputCommandInteraction, data: CommandData): Promise<undefined>;
}
//# sourceMappingURL=play.d.ts.map