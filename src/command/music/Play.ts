import { SlashCommandBuilder } from "@discordjs/builders";

import { BaseGuildTextChannel, CommandInteraction, GuildBasedChannel, GuildTextBasedChannel, TextBasedChannel, VoiceBasedChannel } from 'discord.js';
import Command from '../../Command';
import ClientBase from "../../ClientBase";

export default new class Play extends Command {

    constructor() {
        super(
            new SlashCommandBuilder()
                .setName("play")
                .setDescription("Play a song!")
                .addStringOption((option) => option.setName("song").setDescription("The song you want to play").setRequired(true))
                .setDefaultPermission(true)
        )
    }

    public async execute(client: ClientBase, interaction: CommandInteraction) {
        const voiceChannel: VoiceBasedChannel = interaction.guild?.members.cache.get(interaction.member!.user.id)?.voice.channel!;
        const textChannel = interaction.channel!;
        client.getMusicManager().play(voiceChannel, interaction.options.getString("song")!, {textChannel: textChannel})
    }
}