import ClientBase from "./ClientBase";

export default class Event {
    name: string;
    once: boolean;

    constructor(name: string, once: boolean) {
        this.name = name;
        this.once = once;
    }

    public getName() {
        return this.name;
    }

    public isOnce() {
        return this.once;
    }

    public async execute(...args: any[]) {
        console.error(`Missing "execute" method in event: ${this.name}`);
    }
}