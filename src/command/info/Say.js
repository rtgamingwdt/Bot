const Command = require("../../Command");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { CommandInteraction, MessageEmbed } = require("discord.js");
const ClientBase = require("../../ClientBase");

module.exports = new class Say extends Command {

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

    async execute(client, interaction) {
        interaction.channel.send(interaction.options.getString("request"));
    }
}