export type ModeState = {
    mode: 'light' | 'dark'
}

export const modeReducer = (state: ModeState, mode: 'light' | 'dark') => {
    switch (mode) {
        default:
            return state;
    }
}
