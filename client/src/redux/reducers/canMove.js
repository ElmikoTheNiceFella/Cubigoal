import { createSlice } from "@reduxjs/toolkit";

export const toggleMovability = createSlice({
    name: 'canMove',
    initialState: {
        value: true
    },
    reducers: {
        moveTrue: state => 
            { state.value = true },
        moveFalse: state => 
            { state.value = false }
    }
})

export const { moveTrue, moveFalse } = toggleMovability.actions;
export default toggleMovability.reducer;