import { createSlice } from "@reduxjs/toolkit";

export const movesNumberSlice = createSlice({
    name: 'movesNumber',
    initialState: {
        value: 4
    },
    reducers: {
        addMove: state => { state.value += 1 },
        subtractMove: state => { state.value -= 1 },
        resetMoves: state => { state.value = 4 }
    }
})

export const { addMove , subtractMove, resetMoves } = movesNumberSlice.actions;
export default movesNumberSlice.reducer;