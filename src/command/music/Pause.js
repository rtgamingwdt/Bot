const Command = require("../../Command");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { CommandInteraction, MessageEmbed } = require("discord.js");
const ClientBase = require("../../ClientBase");

module.exports = new class Pause extends Command {

    constructor() {
        super(
            new SlashCommandBuilder()
                .setName("pause")
                .setDescription("Pause a song!")
                .setDefaultPermission(true)
        )
    }

    async execute(client, interaction) {
        client.getMusicManager().pause(interaction.guild.id);
        interaction.channel.send({embeds: [
            new MessageEmbed()
            .setDescription("Successfully paused the song!")
            .setColor("BLUE")
        ]})
    }
}