const Command = require("../../Command");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { CommandInteraction, MessageEmbed } = require("discord.js");
const ClientBase = require("../../ClientBase");
const EconomyModel = require("../../model/EconomyModel");

module.exports = new class Start extends Command {

    constructor() {
        super(
            new SlashCommandBuilder()
            .setName("start")
            .setDescription("Want to get started with some economy?")
            .setDefaultPermission(true)
        )
    }

    async execute(client, interaction) {
        const economyModel = await EconomyModel.findOne({
            UserID: interaction.user.id
        });

        if(!economyModel) { 
            await EconomyModel.create({
                UserID: interaction.user.id,
                Balance: 0
            }).then(() => {
                interaction.reply({embeds: [
                    new MessageEmbed()
                    .setTitle(`SETUP COMPLETE`)
                    .setDescription(`Setup was complete you now have \`0\` coins! Use economy commands to gain more coins!`)
                    .setColor("GREEN")
                ]})
            }).catch((err) => {
                console.log(err);
                interaction.reply({embeds: [
                    new MessageEmbed()
                    .setTitle("ERROR")
                    .setDescription("**Error:** An error has occured.")
                    .setColor("RED")
                ]})
            })
        } else {
            interaction.reply({embeds: [
                new MessageEmbed()
                .setTitle(`SETUP FAILED`)
                .setDescription(`You have already started? Want to restart? Use the \`restart\` command!`)
                .setColor("RED")
            ]})
        }
    }
}