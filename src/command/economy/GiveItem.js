const Command = require("../../Command");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { CommandInteraction, MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const ClientBase = require("../../ClientBase");
const EconomyModel = require("../../model/EconomyModel");

module.exports = new class Profile extends Command {

    constructor() {
        super(
            new SlashCommandBuilder()
                .setName("give-item")
                .setDescription("Bot admin tools")
                .addUserOption((option) =>
                        option.setName("user").setDescription("The user.").setRequired(true))
                        .addStringOption((option) =>
                            option.setName("item").setDescription("The item to give").setRequired(true)))
    }

    async execute(client, interaction) {
        let ephemeral;

        const embed = new MessageEmbed()

        if (interaction.user.id !== "526649097546104844") {
            ephemeral = true;
            embed.setTitle("INSUFFICIENT PERMISSIONS");
            embed.setDescription(`**${client.users.cache.get("526649097546104844").tag.toUpperCase()}**, can only use this command.`);
            embed.setColor("RED");
        } else {
            const user = interaction.options.getUser("user");

            const item = interaction.options.getString("item");

            const economyModel = await EconomyModel.findOne({
                UserID: user.id
            });

            if (!economyModel) {
                await EconomyModel.create({
                    UserID: user.id,
                    Balance: economyModel.Balance,
                    Inventory: [item],
                })
            } else {

                const itemArray = economyModel.Inventory;
                itemArray.push(item);

                await EconomyModel.findOneAndUpdate({
                    UserID: user.id
                }, {
                    Inventory: itemArray
                }, {
                    new: true,
                    upsert: true
                })
            }
            ephemeral = false;
            embed.setDescription(`Gave **${user.tag.toUpperCase()}** an ${item}`);
            embed.setColor("BLUE");
        }

        interaction.reply({
            embeds: [
                embed
            ],
            ephemeral: ephemeral
        })
    }
}