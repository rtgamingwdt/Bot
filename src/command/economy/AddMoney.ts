import Command from "../../Command";
import { SlashCommandBuilder } from "@discordjs/builders";
import ClientBase from "../../ClientBase";
import { CommandInteraction, MessageEmbed } from "discord.js";
import EconomyModel from "../../model/EconomyModel";

export default new class AddMoney extends Command {

    constructor() {
        super(
            new SlashCommandBuilder()
            .setName("addmoney")
            .setDescription("Add money to a user! Only for RT")
            .addUserOption((option) => option.setName("user").setDescription("The user you want to add money to").setRequired(true))
            .addIntegerOption((option) => option.setName("amount").setDescription("The amount of money you want to add").setRequired(true))
            .setDefaultPermission(true)
        )
    }

    public async execute(client: ClientBase, interaction: CommandInteraction) {
        const economyModel = await EconomyModel.findOne({
            UserID: interaction.options.getUser("user")!.id
        });

        if(economyModel) {
            await EconomyModel.findOneAndUpdate({
                UserID: interaction.options.getUser("user")!.id
            }, {
                Balance: parseInt(economyModel.Balance + interaction.options.getInteger("amount"))
            }, {
                new: true,
                upsert: true
            }).then(() => {
                interaction.reply({embeds: [
                    new MessageEmbed()
                    .setDescription(`**Message:** Added ${interaction.options.getInteger("amount")} coins to ${interaction.options.getUser("user")!.tag}'s balance!`)
                    .setColor("GREEN")
                ]})
            }).catch((err) => {
                console.log(err);
                interaction.reply({embeds: [
                    new MessageEmbed()
                    .setDescription(`**Error:** An error has occured while trying to add coins to that users balance.`)
                    .setColor("RED")
                ]})
            })
            // interaction.reply({embeds: [
            //     new MessageEmbed()
            //     .setDescription(`Found economy data for ${interaction.options.getUser("user")!.tag}`)
            //     .setColor("GREEN")
            // ]})
        } else {
            interaction.reply({embeds: [
                new MessageEmbed()
                .setDescription(`Couldn't find any economy data for ${interaction.options.getUser("user")!.tag}`)
                .setColor("RED")
            ]})
        }
    }
}