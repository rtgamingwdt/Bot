const { Client, Collection, Intents } = require("discord.js");
const { config } = require("dotenv");
const { readdirSync } = require("fs");
const Utility = require("./Utility");
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const DisTube = require('distube').default;
const { connect } = require('mongoose');

module.exports = class ClientBase extends Client {

    constructor(options = {}) {
        super({
            intents: [
                Intents.FLAGS.GUILDS,
                Intents.FLAGS.GUILD_MESSAGES,
                Intents.FLAGS.GUILD_BANS,
                Intents.FLAGS.GUILD_MEMBERS,
                Intents.FLAGS.GUILD_VOICE_STATES,
                Intents.FLAGS.GUILD_INTEGRATIONS
            ]
        })

        config();
        this.config = process.env;
        this.commands = [];
        this.commandMap = new Collection();
        this.distube = new DisTube(this);
        this.util = new Utility(this);
    }

    async build() {
        // await scdl.connect();
        this.login(this.config.TOKEN);
        this.connectDB();
        this.handleEvents();
        this.handleCommands();
    }

    async connectDB() {
        if(this.config.DATABASE) {
            await connect(this.config.DATABASE).then(() => {
                console.log("CONNECTED TO DATABASE!")
            }).catch((err) => {
                console.log(err);
            })
        } else {
            console.log("DATABASE NOT FOUND!");
        }
    }

    async handleEvents() {
        const files = readdirSync("src/event");

        for (const file of files) {
            const event = require(`./event/${file}`);

            if (event.isOnce()) {
                this.once(event.getName(), event.execute.bind(null, this));
            } else {
                this.on(event.getName(), event.execute.bind(null, this));
            }
        }

        const status = (queue) =>
            `Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.join(', ') || 'Off'}\` | Loop: \`${queue.repeatMode ? (queue.repeatMode === 2 ? 'All Queue' : 'This Song') : 'Off'
            }\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``
        this.distube
            .on('playSong', (queue, song) =>
                queue.textChannel.send(
                    `Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user
                    }\n${status(queue)}`
                )
            )
            .on('addSong', (queue, song) =>
                queue.textChannel.send(
                    `Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`
                )
            )
            .on('addList', (queue, playlist) =>
                queue.textChannel.send(
                    `Added \`${playlist.name}\` playlist (${playlist.songs.length
                    } songs) to queue\n${status(queue)}`
                )
            )
            .on('error', (channel, e) => {
                channel.send(`An error encountered: ${e.toString().slice(0, 1974)}`)
                console.error(e)
            })
            .on('empty', queue => queue.textChannel.send('Voice channel is empty! Leaving the channel...'))
            .on('searchNoResult', (message, query) =>
                message.channel.send(`No result found for \`${query}\`!`)
            )
            .on('finish', queue => queue.textChannel.send('Finished!'))
    }

    async handleCommands() {
        const folders = readdirSync("src/command");

        for (const folder of folders) {
            const files = readdirSync(`src/command/${folder}`);

            for (const file of files) {
                const command = require(`./command/${folder}/${file}`);

                this.commandMap.set(command.get.name, command);
                this.commands.push(command.get.toJSON());
            }
        }

        const rest = new REST({ version: '9' }).setToken(this.config.TOKEN);

        (async () => {
            try {
                console.log('Started refreshing application (/) commands.');

                await rest.put(                     //CLIENT ID             //GUILD ID
                    Routes.applicationGuildCommands("941785047692898354", "948135520955932702"),
                    { body: this.commands },
                );

                console.log('Successfully reloaded application (/) commands.');
            } catch (error) {
                console.error(error);
            }
        })();
    }

    async getConfig() {
        return this.config;
    }

    async getCommand(command) {
        return this.commandMap.get(command);
    }

    getMusicManager() {
        return this.distube;
    }
}