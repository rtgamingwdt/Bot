const {model, Schema} = require('mongoose');

module.exports = model("Economy", new Schema({
    UserID: String,
    Balance: Number,
    Inventory: Array
}))