const Command = require("../../Command");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { CommandInteraction, MessageEmbed } = require("discord.js");
const ClientBase = require("../../ClientBase");
const {Canvacord} = require("canvacord");

module.exports = new class Trigger extends Command {
    
    constructor() {
        super(
            new SlashCommandBuilder()
            .setName("slap")
            .setDescription("Slap someone")
            .addUserOption((option) => 
                option.setName("user")
                .setDescription("Who got slapped?")
                .setRequired(true)
            )
            .setDefaultPermission(true)
        )
    }

    async execute(client, interaction) {
        let avatar1 = interaction.user.displayAvatarURL({
            format: "png"
        })
        const avatar2 = interaction.options.getUser("user")?.displayAvatarURL({
            format: "png"
        });
        
        
        const image = await Canvacord.slap(avatar1, avatar2);

        await interaction.reply({files: [
            new MessageAttachment(image, "trigger.gif")
        ]})
    }
}