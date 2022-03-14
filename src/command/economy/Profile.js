const Command = require("../../Command");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { CommandInteraction, MessageEmbed } = require("discord.js");
const ClientBase = require("../../ClientBase");
const EconomyModel = require("../../model/EconomyModel");

module.exports = new class Profile extends Command {

    constructor() {
        super(
            new SlashCommandBuilder()
                .setName("profile")
                .setDescription("Want to see another users profile?")
                .addUserOption((option) => option.setName("user").setDescription("The user you want to get information on.").setRequired(false))
                .setDefaultPermission(true)
        )
    }

    async execute(client, interaction) {
        let user;
        let ephemeral;

        const embed = new MessageEmbed();

        if (!interaction.options.getUser("user")) {
            user = interaction.user;
        } else {
            user = interaction.options.getUser("user");
        }

        const economyModel = await EconomyModel.findOne({
            UserID: user.id
        });

        if (!economyModel) {
            embed.setTitle(`${user.tag.toUpperCase()}'s Profile`);
            embed.setDescription("This user has no data. They can get started by using the `start` command!");
            embed.setColor("RED");
            ephemeral = true;
        } else {
            embed.setTitle(`${user.tag.toUpperCase()}'s Profile`);
            embed.setDescription(`**Balance:** ${economyModel.Balance} Coins`);
            embed.setColor("GREEN")
        }

        interaction.reply({
            embeds: [
                embed
            ],
            ephemeral: ephemeral
        })
    }
}