const Command = require("../../Command");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { CommandInteraction, MessageEmbed } = require("discord.js");
const ClientBase = require("../../ClientBase");
const EconomyModel = require("../../model/EconomyModel");
const Database = require("../../util/Database");

module.exports = new class Test extends Command {

    constructor() {
        super(
            new SlashCommandBuilder()
                .setName("test")
                .setDescription("Test")
                .addIntegerOption((option) => option.setName("amount").setDescription("amount").setRequired(true))
                .setDefaultPermission(true)
        )
    }

    async execute(client, interaction) {
        if(interaction.user.id != "526649097546104844") {
            return interaction.reply("Nice Try");
        } else {
            await Database.subtractMoney(interaction, interaction.user, interaction.options.getInteger("amount"));
        }
    }
}