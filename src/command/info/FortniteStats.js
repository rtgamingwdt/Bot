const Command = require("../../Command");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const ClientBase = require("../../ClientBase");
const EconomyModel = require("../../model/EconomyModel");
const Database = require("../../util/Database");
const Scraper = require("../../util/Scraper");

module.exports = new class FortniteStats extends Command {

    constructor() {
        super(
            new SlashCommandBuilder()
                .setName("fortnite-stats")
                .setDescription("Get fortnite stats off a player!")
                .addStringOption((option) => option.setName("username").setDescription("The fortnite username").setRequired(true))
                .setDefaultPermission(true)
        )
    }

    async execute(client, interaction) {
        const username = interaction.options.getString("username");
        await Scraper.getFortniteStats(username).then((data) => {
            interaction.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setTitle(`${data.username}'s Fortnite Stats`)
                        .setDescription(`SCORE: ${data.score}\nWINS: ${data.wins}\nWIN PERCENTAGE: ${data.winPercentage}\nKILLS: ${data.kills}`)
                ]
            });
        });
    }
}