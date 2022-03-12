import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, CacheType, MessageEmbed } from "discord.js";
import ClientBase from "../../ClientBase";
import Command from "../../Command";

export default new class Ping extends Command {
    
    constructor() {
        super(
            new SlashCommandBuilder()
            .setName("ping")
            .setDescription("Get the ping of the bot!")
            .setDefaultPermission(true)
            )
    }

    public async execute(client: ClientBase, interaction: CommandInteraction<CacheType>){
        interaction.reply({embeds: [
            new MessageEmbed()
            .setTitle("PING")
            .setColor("RANDOM")
            .setDescription(`The bot's ping is currently: **${client.ws.ping}ms**`)
        ]});
    }
}