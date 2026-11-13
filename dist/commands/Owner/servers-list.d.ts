import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { Command } from "../../base/Command.js";
import type Atlanta from "../../base/Atlanta.js";
import type { CommandData } from "../../types/index.js";
export default class ServersList extends Command {
    constructor(client: Atlanta);
    slashCommand: SlashCommandBuilder;
    run(interaction: ChatInputCommandInteraction, data: CommandData): Promise<undefined>;
}
//# sourceMappingURL=servers-list.d.ts.map