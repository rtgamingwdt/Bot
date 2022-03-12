import Command from "../../Command";
import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, MessageEmbed } from "discord.js";
import ClientBase from "../../ClientBase";
import EconomyModel from "../../model/EconomyModel";

export default new class Start extends Command {

    constructor() {
        super(
            new SlashCommandBuilder()
            .setName("restart")
            .setDescription("Want to restart your economy account?")
            .setDefaultPermission(true)
        )
    }

    public async execute(client: ClientBase, interaction: CommandInteraction) {
        const economyModel = await EconomyModel.findOne({
            UserID: interaction.user!.id
        });

        if(economyModel) { 
            EconomyModel.findOneAndUpdate({
                UserID: interaction.user!.id
            }, {
                Balance: 0
            }, {
                new: true,
                upsert: true
            }).then(() => {
                interaction.reply({embeds: [
                    new MessageEmbed()
                    .setTitle("ACCOUNT RESET")
                    .setDescription("Your economy account has been reset! You now have `0` coins!")
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
                .setTitle("RESTART FAILED")
                .setDescription("**Error:** You have not even started yet! You can start using economy commands by using the `start` command!")
                .setColor("RED")
            ]})
        }
    }
}