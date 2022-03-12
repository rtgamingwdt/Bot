import mongoose from "mongoose";
import { connect } from "mongoose";
import ClientBase from "../ClientBase";
import Event from "../Event";

export default new class Ready extends Event {

    constructor() {
        super("ready", true);
    }

    public async execute(client: ClientBase) {
        console.log(`${client.user?.tag}, is online!`);
    }
}