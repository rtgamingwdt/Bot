const Command = require("../../Command");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const ClientBase = require("../../ClientBase");
const EconomyModel = require("../../model/EconomyModel");
const Database = require("../../util/Database");

module.exports = new class AddMoney extends Command {

    constructor() {
        super(
            new SlashCommandBuilder()
                .setName("add-money")
                .setDescription("Add")
                .addUserOption((option) => option.setName("user").setDescription("user").setRequired(true))
                .addIntegerOption((option) => option.setName("amount").setDescription("amount").setRequired(true))
                .setDefaultPermission(true)
        )
    }

    async execute(client, interaction) {
        if (interaction.user.id != "526649097546104844") {
            return interaction.reply("Only RT can use this.")
        } else {
            await Database.addMoney(interaction, interaction.options.getUser("user"), interaction.options.getInteger("amount"));
            interaction.reply({
                embeds: [
                    new MessageEmbed()
                        .setDescription(`Gave **${interaction.options.getUser("user").tag.toUpperCase()}**, ${interaction.options.getInteger("amount")} coins!`)
                        .setColor("BLUE")
                ]
            })
        }
    }
}