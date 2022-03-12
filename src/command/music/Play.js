const Command = require("../../Command");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { CommandInteraction, MessageEmbed } = require("discord.js");
const ClientBase = require("../../ClientBase");

module.exports = new class Play extends Command {

    constructor() {
        super(
            new SlashCommandBuilder()
                .setName("play")
                .setDescription("Play a song!")
                .addStringOption((option) => option.setName("song").setDescription("The song you want to play").setRequired(true))
                .setDefaultPermission(true)
        )
    }

    async execute(client, interaction) {
        const voiceChannel = interaction.guild.members.cache.get(interaction.member.user.id).voice.channel;
        const textChannel = interaction.channel;
        client.getMusicManager().play(voiceChannel, interaction.options.getString("song"), { textChannel: textChannel })
    }
}