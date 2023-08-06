import { createSlice } from "@reduxjs/toolkit";

const checkpoints = [/* Pole 1: */ 626, /* Pole 2: */ 970];

export const movesSlice = createSlice({
  name: "moves",
  initialState: {
    value: 24,
    routeValue: 0,
  },
  reducers: {
    //Player movement
    moveForwards: (state) => {
      state.value += 86;
    },
    moveForwardsMobile: (state) => {
      state.value += 20;
    },
    moveBackwards: (state) => {
      state.value -= 86;
    },
    moveBackwardsMobile: (state) => {
      state.value -= 20;
    },
    //Route movement
    moveForwardsRoute: (state) => {
      state.routeValue -= 50;
    },
    moveForwardsRouteMobile: (state) => {
      state.routeValue -= 116;
    },
    moveBackwardsRoute: (state) => {
      state.routeValue += 50;
    },
    moveBackwardsRouteMobile: (state) => {
      state.routeValue += 116;
    },
    //Checkpoints
    restartFromZero: (state) => {
      state.value = 24;
    },
    restartRouteFromZero: (state) => {
      state.routeValue = 0;
    },
    restartFromPol1: (state) => {
      state.value = 626;
    },
    restartRouteFromPol1: (state) => {
      state.routeValue = -350;
    },
    restartFromPol2: (state) => {
      state.value = 970;
    },
    restartRouteFromPol2: (state) => {
      state.routeValue = -550;
    },
    restartFromPol1Mobile: (state) => {
      state.value = 164;
    },
    restartRouteFromPol1Mobile: (state) => {
      state.routeValue = -812;
    },
    restartFromPol2Mobile: (state) => {
      state.value = 244;
    },
    restartRouteFromPol2Mobile: (state) => {
      state.routeValue = -1276;
    },
  },
});

export const {
  /* Movement */ 
  moveForwards,
  moveBackwards,
  moveForwardsRoute,
  moveBackwardsRoute,
  /* Movement Mobile */
  moveForwardsMobile,
  moveBackwardsMobile,
  moveForwardsRouteMobile,
  moveBackwardsRouteMobile,
  /* Checkpoints */ 
  restartFromPol1,
  restartFromPol2,
  restartFromZero,
  restartRouteFromZero,
  restartRouteFromPol1,
  restartRouteFromPol2,
  /* Checkpoints Mobile */
  restartFromZeroMobile,
  restartRouteFromZeroMobile,
  restartFromPol1Mobile,
  restartRouteFromPol1Mobile,
  restartFromPol2Mobile,
  restartRouteFromPol2Mobile,
} = movesSlice.actions;
export default movesSlice.reducer;

