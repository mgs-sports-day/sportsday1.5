import EventEmitter from 'events';

// Ticker coordinates regularly-timed API call reloads from a central source, meaning everything is in sync.
// There's only supposed to be one single Ticker for the entire app, which is initialised in App.tsx
export class Ticker {
    private static readonly eventEmitter = new EventEmitter().setMaxListeners(Infinity)
    private static generatorExists: boolean = false
    // must be a multiple of 10
    private static readonly duration = 1 * 60 * 1000
    private readonly interval: number

    constructor() {
        if (Ticker.generatorExists) throw new Error("cannot initialise multiple ticker generators")

        let completion = 0
        this.interval = window.setInterval(() => {
            completion += 10
            if (completion >= Ticker.duration) {
                completion = 0
                Ticker.eventEmitter.emit("refresh")
            }

            Ticker.eventEmitter.emit("completion", completion / Ticker.duration)
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

    static getRefreshInterval() {
        return Ticker.duration
    }
}
