import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import ClientBase from "./ClientBase";

export default class Command {
    get: SlashCommandBuilder;

    constructor(options = new SlashCommandBuilder()) {
        this.get = options;
    }

    public async execute(client : ClientBase, interaction : CommandInteraction) {
        console.error(`Missing "execute" method in command: ${this.get.name}`);
    }
}