import EventEmitter from 'events';

export class Ticker {
    private static readonly eventEmitter = new EventEmitter().setMaxListeners(Infinity)
    private static generatorExists: boolean = false
    private readonly interval: number

    constructor(interval: number) {
        if (Ticker.generatorExists) throw new Error("cannot initialise multiple ticker generators")
        if (interval % 10 !== 0) throw new Error("interval must be multiple of 10")

        let completion = 0
        this.interval = window.setInterval(() => {
            completion += 10
            if (completion >= interval) {
                completion = 0
                Ticker.eventEmitter.emit("refresh")
            }

            Ticker.eventEmitter.emit("completion", completion / interval)
        }, 10)
        Ticker.generatorExists = true
    }

    cancelEmitter() {
        window.clearInterval(this.interval)
        Ticker.generatorExists = false
    }

    static addListener(listener: (...args: any[]) => void) {
        Ticker.eventEmitter.addListener("refresh", listener)
    }

    static removeListener(listener: (...args: any[]) => void) {
        try {
            Ticker.eventEmitter.removeListener("refresh", listener)
        } catch (e) {
            // if doRequest hasn't finished and the listener hasn't actually been created, we can ignore
            // any error resulting from us trying to delete it
        }
    }

    static addCompletionListener(listener: (completed: number) => void) {
        Ticker.eventEmitter.addListener("completion", listener)
    }

    static removeCompletionListener(listener: (completed: number) => void) {
        Ticker.eventEmitter.removeListener("completion", listener)
    }
}
