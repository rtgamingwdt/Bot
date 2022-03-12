import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, CacheType, MessageEmbed } from "discord.js";
import axios from "axios";
import ClientBase from "../../ClientBase";
import Command from "../../Command";

export default new class EightBall extends Command {

    constructor() {
        super(
            new SlashCommandBuilder()
            .setName("advice")
            .setDescription("Get advice")
            .setDefaultPermission(true)
            )
    }

    public async execute(client: ClientBase, interaction: CommandInteraction<CacheType>) {
        await axios.get("https://api.adviceslip.com/advice").then((response) => {
            interaction.reply({embeds: [
                new MessageEmbed()
                .setTitle("ADVICE")
                .setColor("RANDOM")
                .setDescription(`${response.data.slip.advice}`)
            ]})
        })
    }
}