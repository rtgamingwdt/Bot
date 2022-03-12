const Command = require("../../Command");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { CommandInteraction, MessageEmbed } = require("discord.js");
const ClientBase = require("../../ClientBase");

module.exports = new class Ping extends Command {
    
    constructor() {
        super(
            new SlashCommandBuilder()
            .setName("ping")
            .setDescription("Get the ping of the bot!")
            .setDefaultPermission(true)
            )
    }

    async execute(client, interaction){
        interaction.reply({embeds: [
            new MessageEmbed()
            .setTitle("PING")
            .setColor("RANDOM")
            .setDescription(`The bot's ping is currently: **${client.ws.ping}ms**`)
        ]});
    }
}