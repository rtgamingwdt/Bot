import Command from "../../Command";
import { SlashCommandBuilder } from "@discordjs/builders";
import ClientBase from "../../ClientBase";
import AfkModel from "../../model/AfkModel";
import { CommandInteraction, MessageEmbed } from "discord.js";

export default new class Afk extends Command {

    constructor() {
        super(
            new SlashCommandBuilder()
            .setName("afk")
            .setDescription("Set an afk status!")
            .addStringOption((option) => option.setName("status").setDescription("Your afk status!").setRequired(true))
            .setDefaultPermission(true)
        )
    }

    public async execute(client: ClientBase, interaction: CommandInteraction) {
        await AfkModel.findOneAndUpdate({
            GuildID: interaction.guild!.id,
            UserID: interaction.user!.id
        }, {
            Status: interaction.options.getString("status"),
            Time: parseInt(`${interaction.createdTimestamp / 1000}`)
        }, {
            new: true,
            upsert: true
        }).then(() => {
            interaction.reply({embeds: [
                new MessageEmbed()
                .setTitle(`You are now AFK!`)
                .setDescription(`**Message:** ${interaction.options.getString("status")}`)
                .setColor("GREEN")
            ]})
        }).catch((err) => {
            console.log(err);
            interaction.reply({embeds: [
                new MessageEmbed()
                .setDescription(`**Error:** An error has occured while trying to set your afk status.`)
                .setColor("RED")
            ]})
        })
    }
}