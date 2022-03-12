import Command from "../../Command";
import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, MessageEmbed } from "discord.js";
import ClientBase from "../../ClientBase";
import Constants from "../../Constants";
import EconomyModel from "../../model/EconomyModel";

export default new class Search extends Command {

    constructor() {
        super(
            new SlashCommandBuilder()
                .setName("search")
                .setDescription("Search for some coins")
                .setDefaultPermission(true)
        )
    }

    public async execute(client: ClientBase, interaction: CommandInteraction) {
        const economyModel = await EconomyModel.findOne({
            UserID: interaction.user!.id
        });

        if (economyModel) {
            let response = Constants.ECONOMY_SEARCH_LIST[Math.floor(Math.random() * Constants.ECONOMY_SEARCH_LIST.length)];
            let amount = 0;

            if (response?.includes("<amount>")) {
                amount = Math.floor(Math.random() * (500 - 1 + 1) + 1);
                response = response.replace("<amount>", `${amount}`)
            } else {
                amount = 0;
                response = response;
            }

            await EconomyModel.findOneAndUpdate({
                UserID: interaction.user!.id
            }, {
                Balance: parseInt(economyModel.Balance + amount)
            }, {
                new: true,
                upsert: true
            }).then(() => {
                interaction.reply({
                    embeds: [
                        new MessageEmbed()
                            .setDescription(`${response}`)
                            .setColor("RANDOM")
                    ]
                })
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
                .setDescription(`You can't do anything yet. You can get started by using the \`start\` command!`)
                .setColor("RED")
            ]})
        }
    }
}