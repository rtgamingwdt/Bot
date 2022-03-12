const Command = require("../../Command");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { CommandInteraction, MessageEmbed } = require("discord.js");
const ClientBase = require("../../ClientBase");
const axios = require('axios');

module.exports = new class EightBall extends Command {

    constructor() {
        super(
            new SlashCommandBuilder()
            .setName("advice")
            .setDescription("Get advice")
            .setDefaultPermission(true)
            )
    }

    async execute(client, interaction) {
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