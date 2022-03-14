const Command = require("../../Command");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { CommandInteraction, MessageEmbed } = require("discord.js");
const ClientBase = require("../../ClientBase");
const EconomyModel = require("../../model/EconomyModel");

module.exports = new class Buy extends Command {

    constructor() {
        super(
            new SlashCommandBuilder()
                .setName("buy")
                .setDescription("Want to buy something?")
                .setDefaultPermission(true)
        )
    }

    async execute(client, interaction) {
        const economyModel = await EconomyModel.findOne({
            UserID: interaction.user.id
        });

       interaction.reply("Coming Soon maybe?")
    }
}