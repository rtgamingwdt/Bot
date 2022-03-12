import { SlashCommandBuilder } from "@discordjs/builders";

import { BaseGuildTextChannel, CommandInteraction, GuildBasedChannel, GuildTextBasedChannel, MessageEmbed, TextBasedChannel, VoiceBasedChannel } from 'discord.js';
import Command from '../../Command';
import ClientBase from "../../ClientBase";

export default new class Resume extends Command {

    constructor() {
        super(
            new SlashCommandBuilder()
                .setName("resume")
                .setDescription("Resume a song!")
                .setDefaultPermission(true)
        )
    }

    public async execute(client: ClientBase, interaction: CommandInteraction) {
        client.getMusicManager().resume(interaction.guild!.id);
        interaction.channel!.send({embeds: [
            new MessageEmbed()
            .setDescription("Successfully resumed the song!")
            .setColor("BLUE")
        ]})
    }
}