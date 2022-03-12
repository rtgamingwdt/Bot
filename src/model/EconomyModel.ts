import {model, Schema} from 'mongoose';

export default model("Economy", new Schema({
    UserID: String,
    Balance: Number,
}))