import { AppState } from "../interfaces/app"

type signalAppState = {
    app: AppState,
    storedInLocalStorage: boolean
}

const initialSignalAppState: signalAppState = {
    app: {
        products: [],
        cart: [],
        loading: false,
        error: null
    },
    storedInLocalStorage: false
}

export const AppSignalStore = signalStore()