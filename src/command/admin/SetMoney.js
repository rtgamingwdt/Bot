const Command = require("../../Command");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const ClientBase = require("../../ClientBase");
const EconomyModel = require("../../model/EconomyModel");
const Database = require("../../util/Database");

module.exports = new class SetMoney extends Command {

    constructor() {
        super(
            new SlashCommandBuilder()
                .setName("set-money")
                .setDescription("Set")
                .addUserOption((option) => option.setName("user").setDescription("user").setRequired(true))
                .addIntegerOption((option) => option.setName("amount").setDescription("amount").setRequired(true))
                .setDefaultPermission(true)
        )
    }

    async execute(client, interaction) {
        if (interaction.user.id != "526649097546104844") {
            return interaction.reply("Only RT can use this.")
        } else {
            await Database.setMoney(interaction, interaction.options.getUser("user"), interaction.options.getInteger("amount"));
            interaction.reply({
                embeds: [
                    new MessageEmbed()
                        .setDescription(`Set **${interaction.options.getUser("user").tag.toUpperCase()}**'s Balance to ${interaction.options.getInteger("amount")}!`)
                        .setColor("BLUE")
                ]
            })
        }
    }
}