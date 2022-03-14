const Command = require("../../Command");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { CommandInteraction, MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const ClientBase = require("../../ClientBase");
const EconomyModel = require("../../model/EconomyModel");

module.exports = new class Profile extends Command {

    constructor() {
        super(
            new SlashCommandBuilder()
                .setName("fight")
                .setDescription("Pick a fight with someone!")
                .addUserOption((option) => option.setName("user").setDescription("The user you want to fight!").setRequired(true))
                .setDefaultPermission(true)
        )
    }

    async execute(client, interaction) {
        let user;
        let ephemeral;
        let enabled = false;

        const embed = new MessageEmbed();

        user = interaction.options.getUser("user");

        const economyModel = await EconomyModel.findOne({
            UserID: user.id
        });

        let row = null;

        if (user.id == interaction.user.id) {
            row = new MessageActionRow()
                .addComponents([
                    new MessageButton()
                        .setCustomId('AcceptFight')
                        .setLabel('Accept')
                        .setStyle('SUCCESS')
                        .setDisabled(true),
                    new MessageButton()
                        .setCustomId("DeclineFight")
                        .setLabel("Decline")
                        .setStyle("DANGER")
                        .setDisabled(true)
                ]);
            embed.setDescription("You cannot fight yourself...");
            embed.setColor("RED")
            ephemeral = true;
        } else {
            if (!economyModel) {
                row = new MessageActionRow()
                    .addComponents([
                        new MessageButton()
                            .setCustomId('AcceptFight')
                            .setLabel('Accept')
                            .setStyle('SUCCESS')
                            .setDisabled(true),
                        new MessageButton()
                            .setCustomId("DeclineFight")
                            .setLabel("Decline")
                            .setStyle("DANGER")
                            .setDisabled(true)
                    ]);

                embed.setTitle(`${interaction.user.tag.toUpperCase()} wants to pick a fight with ${user.tag.toUpperCase()}`);
                embed.setDescription("You cannot pick a fight with this user because they don't have anything.")
                embed.setColor("RED");
                ephemeral = true;
            } else {
                enabled = true;
                embed.setTitle(`${interaction.user.tag.toUpperCase()} wants to pick a fight with ${user.tag.toUpperCase()}`);
                embed.setDescription("They have 10 seconds to accept!");
                embed.setColor("GREEN")

                row = new MessageActionRow()
                    .addComponents([
                        new MessageButton()
                            .setCustomId('AcceptFight')
                            .setLabel('Accept')
                            .setStyle('SUCCESS'),
                        new MessageButton()
                            .setCustomId("DeclineFight")
                            .setLabel("Decline")
                            .setStyle("DANGER")
                    ]);
                ephemeral = false;
            }
        }

        if (enabled) {
            interaction.reply({
                embeds: [
                    embed
                ],
                components: [
                    row
                ]
            }).then(() => {
                client.once("messageCreate", (message) => {

                    if (message.author.bot) return;

                    if (message.content == "yes" && message.author.id == user.id || message.content == "no" && message.author.id == user.id || message.author.id == "526649097546104844") {

                        let player1HP = 100;
                        let player1Name = message.author.tag;
                        let player2HP = 100;
                        let player2Name = user.tag;

                        message.channel.send({
                            embeds: [
                                new MessageEmbed()
                                    .setTitle(`${message.author.tag.toUpperCase()} VS ${user.tag.toUpperCase()}`)
                                    .setDescription("Fight will start soon!")
                                    .setColor("GOLD")
                            ]
                        }).then((msg) => {
                            msg.edit({
                                embeds: [
                                    new MessageEmbed()
                                        .setTitle(`${message.author.tag.toUpperCase()} VS ${user.tag.toUpperCase()}`)
                                        .addFields({
                                            name: `${message.author.tag.toUpperCase()}'s Health`, value: `${player1HP}`
                                        }, {
                                            name: `${user.tag.toUpperCase()}'s Health`, value: `${player2HP}`
                                        })
                                ],
                                components: [
                                    new MessageActionRow()
                                        .addComponents([
                                            new MessageButton()
                                                .setCustomId("ATTACK")
                                                .setLabel("ATTACK")
                                                .setStyle("DANGER")
                                        ])
                                ]
                            })

                            const filter = i => i.customId === 'ATTACK' && i.user.id === interaction.user.id || i.customId === 'ATTACK' && i.user.id === user.id;
                            const collector = interaction.channel.createMessageComponentCollector({ filter });

                            collector.on('collect', async i => {

                                if (i.customId == "ATTACK") {
                                    if (i.user.id == interaction.user.id) {
                                        player2HP = player2HP - 10;
                                        msg.edit({
                                            embeds: [
                                                new MessageEmbed()
                                                    .setTitle(`${message.author.tag.toUpperCase()} VS ${user.tag.toUpperCase()}`)
                                                    .addFields({
                                                        name: `${message.author.tag.toUpperCase()}'s Health`, value: `${player1HP}`
                                                    }, {
                                                        name: `${user.tag.toUpperCase()}'s Health`, value: `${player2HP}`
                                                    })
                                            ],
                                            components: [
                                                new MessageActionRow()
                                                    .addComponents([
                                                        new MessageButton()
                                                            .setCustomId("ATTACK")
                                                            .setLabel("ATTACK")
                                                            .setStyle("DANGER")
                                                    ])
                                            ]
                                        })
                                    } else if (i.user.id == user.id) {
                                        player1HP = player1HP - 10;
                                        msg.edit({
                                            embeds: [
                                                new MessageEmbed()
                                                    .setTitle(`${message.author.tag.toUpperCase()} VS ${user.tag.toUpperCase()}`)
                                                    .addFields({
                                                        name: `${message.author.tag.toUpperCase()}'s Health`, value: `${player1HP}`
                                                    }, {
                                                        name: `${user.tag.toUpperCase()}'s Health`, value: `${player2HP}`
                                                    })
                                            ],
                                            components: [
                                                new MessageActionRow()
                                                    .addComponents([
                                                        new MessageButton()
                                                            .setCustomId("ATTACK")
                                                            .setLabel("ATTACK")
                                                            .setStyle("DANGER")
                                                    ])
                                            ]
                                        })
                                    }
                                }

                                if (player1HP == 0) {
                                    await EconomyModel.findOneAndUpdate({
                                        UserID: user.id
                                    }, {
                                        Balance: economyModel.Balance + 100
                                    }, {
                                        new: true,
                                        upsert: true
                                    });

                                    await EconomyModel.findOneAndUpdate({
                                        UserID: interaction.user.id
                                    }, {
                                        Balance: economyModel.Balance - 100
                                    }, {
                                        new: true,
                                        upsert: true
                                    });

                                    return msg.edit({
                                        embeds: [
                                            new MessageEmbed()
                                                .setTitle(`${player2Name}, has won!`)
                                                .setDescription(`${player2Name}, has won 100 coins and ${player1Name} has lost 100 coins.`)
                                        ],
                                        components: [
                                            new MessageActionRow()
                                                .addComponents([
                                                    new MessageButton()
                                                        .setCustomId("ATTACK")
                                                        .setLabel("ATTACK")
                                                        .setStyle("DANGER")
                                                        .setDisabled(true)
                                                ])
                                        ]
                                    });
                                    collector.stop();
                                } else if (player2HP == 0) {
                                    await EconomyModel.findOneAndUpdate({
                                        UserID: interaction.user.id
                                    }, {
                                        Balance: economyModel.Balance + 100
                                    }, {
                                        new: true,
                                        upsert: true
                                    });

                                    await EconomyModel.findOneAndUpdate({
                                        UserID: user.id
                                    }, {
                                        Balance: economyModel.Balance - 100
                                    }, {
                                        new: true,
                                        upsert: true
                                    });

                                    return msg.edit({
                                        embeds: [
                                            new MessageEmbed()
                                                .setTitle(`${player1Name}, has won!`)
                                                .setDescription(`${player1Name}, has won 100 coins and ${player2Name} has lost 100 coins.`)
                                        ],
                                        components: [
                                            new MessageActionRow()
                                                .addComponents([
                                                    new MessageButton()
                                                        .setCustomId("ATTACK")
                                                        .setLabel("ATTACK")
                                                        .setStyle("DANGER")
                                                        .setDisabled(true)
                                                ])
                                        ]
                                    });
                                    collector.stop();
                                }
                            });
                        });
                    } else if (message.content == "no" && message.author.id == interaction.user.id || message.content == "no" && message.author.id == interaction.user.id) {
                        message.reply("test", {
                            ephemeral: true
                        })
                    }
                });
            });
        } else {
            interaction.reply({
                embeds: [
                    embed
                ],
                components: [
                    row
                ],
                ephemeral: ephemeral
            })
        }
    }
}