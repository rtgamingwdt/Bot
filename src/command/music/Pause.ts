import { SlashCommandBuilder } from "@discordjs/builders";

import { BaseGuildTextChannel, CommandInteraction, GuildBasedChannel, GuildTextBasedChannel, MessageEmbed, TextBasedChannel, VoiceBasedChannel } from 'discord.js';
import Command from '../../Command';
import ClientBase from "../../ClientBase";

export default new class Pause extends Command {

    constructor() {
        super(
            new SlashCommandBuilder()
                .setName("pause")
                .setDescription("Pause a song!")
                .setDefaultPermission(true)
        )
    }

    public async execute(client: ClientBase, interaction: CommandInteraction) {
        client.getMusicManager().pause(interaction.guild!.id);
        interaction.channel!.send({embeds: [
            new MessageEmbed()
            .setDescription("Successfully paused the song!")
            .setColor("BLUE")
        ]})
    }
}