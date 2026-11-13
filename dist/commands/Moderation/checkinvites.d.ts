import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { Command } from "../../base/Command.js";
import type Atlanta from "../../base/Atlanta.js";
import type { CommandData } from "../../types/index.js";
export default class Checkinvites extends Command {
    slashCommand: SlashCommandBuilder;
    constructor(client: Atlanta);
    run(interaction: ChatInputCommandInteraction, data: CommandData): Promise<undefined>;
}
//# sourceMappingURL=checkinvites.d.ts.map