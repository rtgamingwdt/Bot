import { SlashCommandBuilder } from "@discordjs/builders";

import { BaseGuildTextChannel, CommandInteraction, GuildBasedChannel, GuildTextBasedChannel, MessageEmbed, TextBasedChannel, VoiceBasedChannel } from 'discord.js';
import Command from '../../Command';
import ClientBase from "../../ClientBase";

export default new class Play extends Command {

    constructor() {
        super(
            new SlashCommandBuilder()
                .setName("stop")
                .setDescription("Stop the music manager!")
                .setDefaultPermission(true)
        )
    }

    public async execute(client: ClientBase, interaction: CommandInteraction) {
        const queue = client.getMusicManager().getQueue(interaction.guild!.id);
        if(!queue) return interaction.reply("The music player is currently not active in this server!")
        client.getMusicManager().stop(interaction.guild!.id)
        interaction.reply({embeds: [
            new MessageEmbed()
            .setDescription("Music Player has been stopped!")
            .setColor("BLUE")
        ]})
    }
}