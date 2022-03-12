import Command from "../../Command";
import { SlashCommandBuilder } from "@discordjs/builders";
import ClientBase from "../../ClientBase";
import { CommandInteraction, MessageEmbed } from "discord.js";
import EconomyModel from "../../model/EconomyModel";

export default new class Balance extends Command {

    constructor() {
        super(
            new SlashCommandBuilder()
            .setName("balance")
            .setDescription("Check the balance of a user!")
            .addUserOption((option) => option.setName("user").setDescription("The user you want to check the balance of").setRequired(true))
            .setDefaultPermission(true)
        )
    }

    public async execute(client: ClientBase, interaction: CommandInteraction) {
        const economyModel = await EconomyModel.findOne({
            UserID: interaction.options.getUser("user")!.id
        });

        if(economyModel) { 
            interaction.reply({embeds: [
                new MessageEmbed()
                .setTitle(`${interaction.options.getUser("user")!.tag}'s Balance`)
                .setDescription(`**Balance:** ${economyModel.Balance} coins`)
                .setColor("GREEN")
            ]})
        } else {
            interaction.reply({embeds: [
                new MessageEmbed()
                .setTitle(`${interaction.options.getUser("user")!.tag}'s Balance`)
                .setDescription(`They don't have anything yet. They can get started by using the \`start\` command!`)
                .setColor("RED")
            ]})
        }
    }
}