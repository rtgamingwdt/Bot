import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, CacheType, MessageAttachment } from "discord.js";
import ClientBase from "../../ClientBase";
import Command from "../../Command";
import { Canvacord } from "canvacord";

export default new class Trigger extends Command {
    
    constructor() {
        super(
            new SlashCommandBuilder()
            .setName("slap")
            .setDescription("Slap someone")
            .addUserOption((option) => 
                option.setName("user")
                .setDescription("Who got slapped?")
                .setRequired(true)
            )
            .setDefaultPermission(true)
        )
    }

    public async execute(client: ClientBase, interaction: CommandInteraction<CacheType>) {
        let avatar1 = interaction.user.displayAvatarURL({
            format: "png"
        })
        const avatar2 = interaction.options.getUser("user")?.displayAvatarURL({
            format: "png"
        });
        
        
        const image = await Canvacord.slap(avatar1, avatar2!);

        await interaction.reply({files: [
            new MessageAttachment(image, "trigger.gif")
        ]})
    }
}