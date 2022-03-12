const Command = require("../../Command");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { CommandInteraction, MessageEmbed } = require("discord.js");
const ClientBase = require("../../ClientBase");

module.exports = new class Resume extends Command {

    constructor() {
        super(
            new SlashCommandBuilder()
                .setName("resume")
                .setDescription("Resume a song!")
                .setDefaultPermission(true)
        )
    }

    async execute(client, interaction) {
        client.getMusicManager().resume(interaction.guild.id);
        interaction.channel.send({embeds: [
            new MessageEmbed()
            .setDescription("Successfully resumed the song!")
            .setColor("BLUE")
        ]})
    }
}