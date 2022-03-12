const Command = require("../../Command");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { CommandInteraction, MessageEmbed } = require("discord.js");
const ClientBase = require("../../ClientBase");

module.exports = new class Play extends Command {

    constructor() {
        super(
            new SlashCommandBuilder()
                .setName("stop")
                .setDescription("Stop the music manager!")
                .setDefaultPermission(true)
        )
    }

    async execute(client, interaction) {
        const queue = client.getMusicManager().getQueue(interaction.guild.id);
        if(!queue) return interaction.reply("The music player is currently not active in this server!")
        client.getMusicManager().stop(interaction.guild.id)
        interaction.reply({embeds: [
            new MessageEmbed()
            .setDescription("Music Player has been stopped!")
            .setColor("BLUE")
        ]})
    }
}