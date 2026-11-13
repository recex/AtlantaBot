import { ChatInputCommandInteraction } from "discord.js";
import { Command } from "../../base/Command.js";
import type Atlanta from "../../base/Atlanta.js";
import type { CommandData } from "../../types/index.js";
export default class Facepalm extends Command {
    constructor(client: Atlanta);
    slashCommand: import("discord.js").SlashCommandOptionsOnlyBuilder;
    run(interaction: ChatInputCommandInteraction, data: CommandData): Promise<void>;
}
//# sourceMappingURL=facepalm.d.ts.map