import { configureStore } from "@reduxjs/toolkit";
import movabilityReducer from "./reducers/canMove"
import moveReducer from "./reducers/moveActions"
import numberOfMovesReducer from "./reducers/movesNumber"

export default configureStore({
    reducer: {
        movability: movabilityReducer,
        moves: moveReducer,
        numberOfMoves: numberOfMovesReducer
    },
})