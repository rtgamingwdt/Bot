const Command = require("../../Command");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { CommandInteraction, MessageEmbed } = require("discord.js");
const ClientBase = require("../../ClientBase");

module.exports = new class Queue extends Command {

    constructor() {
        super(
            new SlashCommandBuilder()
                .setName("queue")
                .setDescription("Get the current queue!")
                .setDefaultPermission(true)
        )
    }

    async execute(client, interaction) {
        const queue = client.getMusicManager().getQueue(interaction.guild.id);
        if (!queue) return interaction.reply(`There is nothing playing!`);
        const songs = queue.songs
            .map((song, i) => `${i === 0 ? '**Playing:**' : `${i}.`} ${song.name} - \`${song.formattedDuration}\``)
            .join('\n');
        interaction.reply({embeds: [
            new MessageEmbed()
            .setTitle("SERVER QUEUE")
            .setDescription(songs)
            .setColor("BLUE")
        ]})
    }
}