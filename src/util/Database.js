const { MessageEmbed } = require("discord.js");
const EconomyModel = require("../model/EconomyModel");

module.exports = class Database {

    static async createEconomy(user, amount) {

        if (!amount) amount = 0;

        await EconomyModel.create({
            UserID: user.id,
            Balance: amount,
        });
    }

    static async adminAddMoney() {

    }

    static async addMoney(interaction, user, amount) {
        if (!user) {
            return interaction.reply({
                embeds: [
                    new MessageEmbed()
                        .setTitle("ERROR")
                        .setDescription("A user was not specified.")
                        .setColor("RED")
                ]
            })
        }

        if (!amount) amount = 0;

        if (amount < 0) {
            return interaction.reply({
                embeds: [
                    new MessageEmbed()
                        .setTitle("What are you trying to do?")
                        .setDescription("You can't add less than 0 coins")
                ]
            })
        }

        const economyModel = await EconomyModel.findOne({
            UserID: user.id
        });

        if (!economyModel) {
            interaction.reply({
                embeds: [
                    new MessageEmbed()
                        .setTitle("No Data Found")
                        .setDescription(`No data found for **${interaction.guild.members.cache.get(id).tag}**`)
                ],
                ephemeral: true
            });
        } else {
            await EconomyModel.findOneAndUpdate({
                UserID: user.id
            }, {
                Balance: economyModel.Balance + amount
            }, {
                new: true,
                upsert: true
            })
        }
    }

    static async subtractMoney(interaction, user, amount) {
        if (!user) {
            return interaction.reply({
                embeds: [
                    new MessageEmbed()
                        .setTitle("ERROR")
                        .setDescription("A user was not specified.")
                        .setColor("RED")
                ]
            })
        }

        if (!amount) amount = 0;

        if (amount < 0) {
            return interaction.reply({
                embeds: [
                    new MessageEmbed()
                        .setTitle("What are you trying to do?")
                        .setDescription("You can't take away less than 0 coins")
                ]
            })
        }

        const economyModel = await EconomyModel.findOne({
            UserID: user.id
        });

        if (!economyModel) {
            interaction.reply({
                embeds: [
                    new MessageEmbed()
                        .setTitle("No Data Found")
                        .setDescription(`No data found for **${interaction.guild.members.cache.get(id).tag}**`)
                ],
                ephemeral: true
            });
        } else {
            await EconomyModel.findOneAndUpdate({
                UserID: user.id
            }, {
                Balance: economyModel.Balance - amount
            }, {
                new: true,
                upsert: true
            })
        }
    }

    static async setMoney(interaction, user, amount) {
        if (!user) {
            return interaction.reply({
                embeds: [
                    new MessageEmbed()
                        .setTitle("ERROR")
                        .setDescription("A user was not specified.")
                        .setColor("RED")
                ]
            })
        }

        if (!amount) amount = 0;

        const economyModel = await EconomyModel.findOne({
            UserID: user.id
        });

        if (!economyModel) {
            interaction.reply({
                embeds: [
                    new MessageEmbed()
                        .setTitle("No Data Found")
                        .setDescription(`No data found for **${interaction.guild.members.cache.get(id).tag}**`)
                ],
                ephemeral: true
            });
        } else {
            await EconomyModel.findOneAndUpdate({
                UserID: user.id
            }, {
                Balance: amount
            }, {
                new: true,
                upsert: true
            })
        }
    }
}