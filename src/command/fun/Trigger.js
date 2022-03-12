const Command = require("../../Command");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { CommandInteraction, MessageEmbed } = require("discord.js");
const ClientBase = require("../../ClientBase");
const {Canvacord} = require("canvacord");

module.exports = new class Trigger extends Command {
    
    constructor() {
        super(
            new SlashCommandBuilder()
            .setName("trigger")
            .setDescription("Trigger someone")
            .addUserOption((option) => 
                option.setName("user")
                .setDescription("Who is triggered?")
                .setRequired(true)
            )
            .setDefaultPermission(true)
        )
    }

    async execute(client, interaction) {
        const avatar = interaction.options.getUser("user");
        const image = await Canvacord.trigger(avatar?.displayAvatarURL({
            format: "png"
        }));

        await interaction.reply({files: [
            new MessageAttachment(image, "trigger.gif")
        ]})
    }
}