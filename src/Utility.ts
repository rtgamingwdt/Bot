import { CategoryChannel } from "discord.js";
import ClientBase from "./ClientBase"

export default class Utility {
    client: ClientBase

    constructor(options = new ClientBase()) {
        this.client = options;
    }

    public async getGuild(id : string | undefined) {

        const guild = this.client.guilds.cache.get(`${id}`);

        const name = guild?.name;
        
        let afkChannel;
        
        const icon = `https://cdn.discordapp.com/icons/${guild?.id}/${guild?.icon}.png`
        
        let members;
        
        let bans = await guild?.bans.fetch().then(banned => {
            return `${banned.size}`;
        });

        let channels;

        let channelCount = 0;

        let createdAt = `${guild?.createdAt}`;

        let description = `${guild?.description}`

        let emojis = await guild?.emojis.fetch().then(emoji => {
            return `${emoji.size}`;
        })

        let invites = await guild?.invites.fetch().then(invite => {
            return `${invite.size}`;
        })

        let mfaLevel = guild?.mfaLevel;

        let nsfwLevel = guild?.nsfwLevel;

        let owner = `<@${guild?.ownerId}>`

        let partnered;

        let boosts = `${guild?.premiumSubscriptionCount}`;

        let boostTier = `${guild?.premiumTier}`;

        let roles = await guild?.roles.fetch().then(role => {
            return `${role.size}`;
        })

        let rulesChannel = `<#${guild?.rulesChannel?.id}>`

        let scheduledEvents = await guild?.scheduledEvents.fetch().then(event => {
            return `${event.size}`;
        })

        let verificationLevel = guild?.verificationLevel;

        let verified;

        if(guild?.verified) {
            verified = "Server is verified!"
        } else {
            verified = "`Server is not verified!`"
        }

        if(scheduledEvents != undefined && parseInt(scheduledEvents) > 0) {
            scheduledEvents = scheduledEvents;
        } else {
            scheduledEvents = "`There are no scheduled events for this server`";
        }

        if(!rulesChannel) {
            rulesChannel = "`This server has no rules channel`"
        } else {
            rulesChannel = rulesChannel;
        }

        if(roles != undefined && parseInt(roles) > 0) {
            roles = roles
        } else {
            roles = "`This server does not have any roles`"
        }

        if((boosts != null || boosts != undefined) && parseInt(boosts) > 0) {
            boosts = boosts;
        } else {
            boosts = "`This server has no boosts`"
        }

        if(guild?.partnered) {
            partnered = "This server has a partner";
        } else {
            partnered = "`This server does not have a partner`";
        }

        if(invites != undefined && parseInt(await invites) > 0) {
            invites = invites
        } else {
            invites = "`No invites were found in this server`";
        }

        if(emojis != undefined && parseInt(await emojis) > 0) {
            emojis = emojis;
        } else {
            emojis = "`No emojis were found in this server`";
        }

        if(guild?.description == null) {
            description = "`No description available`"
        } else {
            description = description;
        }

        if(createdAt == null) {
            createdAt = "`Could not find any date`";
        } else {
            createdAt = createdAt;
        }

        guild?.channels.cache.map(channel => {
            if(channel.isText() || channel.isVoice()) {
                channelCount++
            }
        })

        try {
            channels = Math.max(channelCount);
        } catch(exception) {
            channels = "`Somehow I could not find any channels?`"
        }
        if(!guild?.afkChannel) {
            afkChannel = "`No AFK Channel in this server!`"
        } else {
            afkChannel = guild.afkChannel.id
        }

        if(guild?.memberCount == 0) {
            members = "`How are there even 0 members in this guild?`"
        } else if(guild?.memberCount == null) {
            members = "`There was an error while fetching the member count!`"
        } else if(guild.memberCount > 0 || guild.memberCount != null) {
            members = guild.memberCount;
        }

        if(bans != undefined && await parseInt(await bans) > 0) {
            bans = bans
        } else {
            bans = "`There are no banned users`";
        }

        return {
            afkChannel: afkChannel,
            name: guild?.name,
            icon: icon,
            members: members,
            bans: bans,
            channels: channels,
            createdAt: createdAt,
            description: description,
            emojis: emojis,
            id: id,
            invites: invites,
            mfaLevel: mfaLevel,
            nsfwLevel: nsfwLevel,
            owner: owner,
            partnered: partnered,
            boosts: boosts,
            boostTier: boostTier,
            roles: roles,
            rulesChannel: rulesChannel,
            scheduledEvents: scheduledEvents,
            verificationLevel: verificationLevel,
            verified: verified
        }
    }

    get8Ball() {
        let list = [
            "🟢 It is certain!",
            "🟢 It is decidedly so!",
            "🟢 Without a doubt!",
            "🟢 Yes - definetly!",
            "🟢 As I see it, yes!",
            "🟢 Most likely!",
            "🟢 Outlook good!",
            "🟢 Yes!",
            "🟢 Signs point to yes!",
            "🟡 Reply hazy, try again",
            "🟡 Ask again later",
            "🟡 Better not tell you now",
            "🟡 Cannot predict now",
            "🟡 Concentrate and ask again",
            "🔴 Don't count on it.",
            "🔴 My reply is no.",
            "🔴 My sources say no.",
            "🔴 Outlook not so good.",
            "🔴 Very doubtful."
        ]

        return list[Math.floor(Math.random() * 18)];
    }
}