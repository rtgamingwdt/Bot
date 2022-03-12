const Command = require("../../Command");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { CommandInteraction, MessageEmbed } = require("discord.js");
const ClientBase = require("../../ClientBase");

module.exports = new class Filter extends Command {

    constructor() {
        super(
            new SlashCommandBuilder()
                .setName("filter")
                .setDescription("Add filters")
                .addStringOption((option) => option.setName("filters").setDescription("The filters you want to set").addChoices([["3d", "3d"], ["bassboost", "bassboost"], ["echo", "echo"], ["karaoke", "karaoke"], ["nightcore", "nightcore"], ["vaporwave", "vaporwave"], ["clear", "false"]]).setRequired(true))
                .setDefaultPermission(true)
        )
    }

    async execute(client, interaction) {
        if (interaction.options.getString("3d")) {
            const filter = client.getMusicManager().setFilter(interaction.guild.id, interaction.options.getString("3d"));
            interaction.reply({
                embeds: [
                    new MessageEmbed()
                        .setDescription("Current queue filter: " + (filter.join(", ") || "No Active Filters"))
                        .setColor("BLUE")
                ]
            });
        }

        if (interaction.options.getString("bassboost")) {
            const filter = client.getMusicManager().setFilter(interaction.guild.id, interaction.options.getString("bassboost"));
            interaction.reply({
                embeds: [
                    new MessageEmbed()
                        .setDescription("Current queue filter: " + (filter.join(", ") || "No Active Filters"))
                        .setColor("BLUE")
                ]
            });
        }

        if (interaction.options.getString("echo")) {
            const filter = client.getMusicManager().setFilter(interaction.guild.id, interaction.options.getString("EHCO"));
            interaction.reply({
                embeds: [
                    new MessageEmbed()
                        .setDescription("Current queue filter: " + (filter.join(", ") || "No Active Filters"))
                        .setColor("BLUE")
                ]
            });
        }

        if (interaction.options.getString("karaoke")) {
            const filter = client.getMusicManager().setFilter(interaction.guild.id, interaction.options.getString("karaoke"));
            interaction.reply({
                embeds: [
                    new MessageEmbed()
                        .setDescription("Current queue filter: " + (filter.join(", ") || "No Active Filters"))
                        .setColor("BLUE")
                ]
            });
        }

        if (interaction.options.getString("nightcore")) {
            const filter = client.getMusicManager().setFilter(interaction.guild.id, interaction.options.getString("nightcore"));
            interaction.reply({
                embeds: [
                    new MessageEmbed()
                        .setDescription("Current queue filter: " + (filter.join(", ") || "No Active Filters"))
                        .setColor("BLUE")
                ]
            });
        }

        if (interaction.options.getString("vaporwave")) {
            const filter = client.getMusicManager().setFilter(interaction.guild.id, interaction.options.getString("vaporwave"));
            interaction.reply({
                embeds: [
                    new MessageEmbed()
                        .setDescription("Current queue filter: " + (filter.join(", ") || "No Active Filters"))
                        .setColor("BLUE")
                ]
            });
        }

        if (interaction.options.getString("clear")) {
            const val = false;
            const filter = client.getMusicManager().setFilter(interaction.guild.id, val);
            interaction.reply({
                embeds: [
                    new MessageEmbed()
                        .setDescription("Current queue filter: " + (filter.join(", ") || "No Active Filters"))
                        .setColor("BLUE")
                ]
            });
        }
    }
}