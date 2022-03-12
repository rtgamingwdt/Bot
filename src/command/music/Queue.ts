import { SlashCommandBuilder } from "@discordjs/builders";

import { BaseGuildTextChannel, CommandInteraction, GuildBasedChannel, GuildTextBasedChannel, MessageEmbed, TextBasedChannel, VoiceBasedChannel } from 'discord.js';
import Command from '../../Command';
import ClientBase from "../../ClientBase";

export default new class Queue extends Command {

    constructor() {
        super(
            new SlashCommandBuilder()
                .setName("queue")
                .setDescription("Get the current queue!")
                .setDefaultPermission(true)
        )
    }

    public async execute(client: ClientBase, interaction: CommandInteraction) {
        const queue = client.getMusicManager().getQueue(interaction.guild!.id);
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