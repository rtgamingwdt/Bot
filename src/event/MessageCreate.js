const { Message, MessageEmbed } = require("discord.js");
const ClientBase = require("../ClientBase");
const Event = require("../Event");
const AfkModel = require("../model/AfkModel");

module.exports = new class MessageCreate extends Event {

    constructor() {
        super("messageCreate", false);
    }

    async execute(client, message) {
        if(message.channel.type == "DM") return;
        if(message.author.bot) return;

        if(await AfkModel.findOne({
            GuildID: message.guild?.id,
            UserID: message.author.id
        })) {
            AfkModel.deleteOne({
                GuildID: message.guild.id,
                UserID: message.author.id
            }).then(() => {
                message.channel.send({embeds: [
                    new MessageEmbed()
                    .setDescription(`Welcome back, **${message.author.tag}**, I have removed your afk!`)
                    .setColor("GREEN")
                ]})
            }).catch((err) => {
                console.log(err);
                message.channel.send({embeds: [
                    new MessageEmbed()
                    .setDescription("**Error:** An error has occured.")
                    .setColor("RED")
                ]})
            })
        }
    }
}