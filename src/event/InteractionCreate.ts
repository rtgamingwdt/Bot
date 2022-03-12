import { CommandInteraction } from "discord.js";
import ClientBase from "../ClientBase";
import Event from "../Event"

export default new class InteractionCreate extends Event {

    constructor() {
        super("interactionCreate", false);
    }

    public async execute(client: ClientBase, interaction: CommandInteraction) {
        if(!interaction.isCommand) return;
        
        const command = client.commandMap.get(interaction.commandName);

        if(command) {
            command.execute(client, interaction);
        }
    }
}