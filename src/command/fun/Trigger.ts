import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, CacheType, MessageAttachment } from "discord.js";
import ClientBase from "../../ClientBase";
import Command from "../../Command";
import { Canvacord } from "canvacord";

export default new class Trigger extends Command {
    
    constructor() {
        super(
            new SlashCommandBuilder()
            .setName("trigger")
            .setDescription("Trigger someone")
            .addUserOption((option) => 
                option.setName("user")
                .setDescription("Who is triggered?")
                .setRequired(true)
            )
            .setDefaultPermission(true)
        )
    }

    public async execute(client: ClientBase, interaction: CommandInteraction<CacheType>) {
        const avatar = interaction.options.getUser("user");
        const image = await Canvacord.trigger(avatar?.displayAvatarURL({
            format: "png"
        })!);

        await interaction.reply({files: [
            new MessageAttachment(image, "trigger.gif")
        ]})
    }
}