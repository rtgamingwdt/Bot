const Command = require("../../Command");
const { SlashCommandBuilder } = require("@discordjs/builders");
const ClientBase = require("../../ClientBase");
const { CommandInteraction, MessageEmbed } = require("discord.js");
const EconomyModel = require("../../model/EconomyModel");

module.exports = new class Balance extends Command {

    constructor() {
        super(
            new SlashCommandBuilder()
            .setName("balance")
            .setDescription("Check the balance of a user!")
            .addUserOption((option) => option.setName("user").setDescription("The user you want to check the balance of").setRequired(true))
            .setDefaultPermission(true)
        )
    }

    async execute(client, interaction) {
        const economyModel = await EconomyModel.findOne({
            UserID: interaction.options.getUser("user").id
        });

        if(economyModel) { 
            interaction.reply({embeds: [
                new MessageEmbed()
                .setTitle(`${interaction.options.getUser("user").tag}'s Balance`)
                .setDescription(`**Balance:** ${economyModel.Balance} coins`)
                .setColor("GREEN")
            ]})
        } else {
            interaction.reply({embeds: [
                new MessageEmbed()
                .setTitle(`${interaction.options.getUser("user").tag}'s Balance`)
                .setDescription(`They don't have anything yet. They can get started by using the \`start\` command!`)
                .setColor("RED")
            ]})
        }
    }
}