import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, CacheType, MessageEmbed } from "discord.js";
import ClientBase from "../../ClientBase";
import Command from "../../Command";

export default new class EightBall extends Command {

    constructor() {
        super(
            new SlashCommandBuilder()
            .setName("say")
            .setDescription("Say something!")
            .addStringOption((option) => 
                option.setName("request")
                .setDescription("The text to send!")
                .setRequired(true))
            .setDefaultPermission(true)
            )
    }

    public async execute(client: ClientBase, interaction: CommandInteraction<CacheType>) {
        interaction.channel?.send(interaction.options.getString("request")!);
    }
}