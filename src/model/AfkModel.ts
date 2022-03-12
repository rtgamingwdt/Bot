import {model, Schema} from 'mongoose';

export default model("AFK", new Schema({
    GuildID: String,
    UserID: String,
    Status: String,
    Time: String
}))