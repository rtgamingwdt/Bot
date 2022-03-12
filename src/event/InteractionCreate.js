const { CommandInteraction } = require("discord.js");
const ClientBase = require("../ClientBase");
const Event = require("../Event");

module.exports = new class InteractionCreate extends Event {

    constructor() {
        super("interactionCreate", false);
    }

    async execute(client, interaction) {
        if(!interaction.isCommand) return;
        
        const command = client.commandMap.get(interaction.commandName);

        if(command) {
            command.execute(client, interaction);
        }
    }
}