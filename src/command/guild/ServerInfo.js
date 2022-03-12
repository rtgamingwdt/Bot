const Command = require("../../Command");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { CommandInteraction, MessageEmbed } = require("discord.js");
const ClientBase = require("../../ClientBase");

module.exports = new class ServerInfo extends Command {

    constructor() {
        super(
            new SlashCommandBuilder()
            .setName("serverinfo")
            .setDescription("Get info on the server you are currently in!")
            .setDefaultPermission(true)
        )
    }

    async execute(client, interaction) {
        const guild = await client.util.getGuild(interaction.guild?.id);
        interaction.reply({embeds: [
            new MessageEmbed()
            .setTitle(`${guild.name?.toUpperCase()}'s Information`)
            .setColor("RANDOM")
            .setDescription(`**GUILD DESCRIPTION**\n\`${guild.description}\``)
            .addFields([{
                name: "AFK CHANNEL", value: `**<#${guild.afkChannel}>**`
            }, {
                name: "MEMBERS", value: `**${guild.members} members**`
            }, {
                name: "BANS", value: `**${guild.bans}**`
            }, {
                name: "CHANNELS", value: `**${guild.channels}**`
            }, {
                name: "EMOJIS", value: `**${guild.emojis}**`
            }, {
                name: "ID", value: `**${guild.id}**`
            }, {
                name: "INVITES", value: `**${guild.invites}**`
            }, {
                name: "MFA LEVEL", value: `**${guild.mfaLevel}**`
            }, {
                name: "NSFW LEVEL", value: `**${guild.nsfwLevel}**`
            }, {
                name: "OWNER", value: `**${guild.owner}**`
            }, {
                name: "PARTNERED", value: `**${guild.partnered}**`
            }, {
                name: "BOOSTS", value: `**${guild.boosts}**`
            }, {
                name: "BOOST TIER", value: `**${guild.boostTier}**`
            }, {
                name: "ROLES", value: `**${guild.roles}**`
            }, {
                name: "RULES CHANNEL", value: `**${guild.rulesChannel}**`
            }, {
                name: "SCHEDULED EVENTS", value: `**${guild.scheduledEvents}**`
            }, {
                name: "VERIFICATION LEVEL", value: `**${guild.verificationLevel}**`
            }, {
                name: "VERIFIED", value: `**${guild.verified}**`
            }])
            .setThumbnail(guild.icon)
            .setFooter({
                text: `GUILD CREATED AT: ${guild.createdAt.toUpperCase()}`
            })
        ]})
    }
}