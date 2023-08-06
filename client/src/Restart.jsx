import { useSelector, useDispatch } from "react-redux";
import { restartFromPol1, restartFromPol2, restartFromZero } from "./redux/reducers/moveActions"
import { resetMoves } from "./redux/reducers/movesNumber"
import { moveTrue, moveFalse } from './redux/reducers/canMove'

export const Restart = () => {

    const moves = useSelector((state) => state.moves.value)

    const dispatch = useDispatch();

    const handleCheckpoint = () => {
      dispatch(moveTrue())
      if ( moves < 65 ) {
        dispatch(restartFromZero());
        dispatch(resetMoves());
      }
      if ( moves > 65 && moves < 130 ) {
        dispatch(restartFromPol1());
        dispatch(resetMoves());
      } else if ( moves > 130 ) {
        dispatch(restartFromPol2());
        dispatch(resetMoves());
      }
    }

    return (
      <>
        <h1>No More Moves</h1>
        <button onClick={() => {
          location.reload()
        }}>Leave</button>
        <button onClick={handleCheckpoint}>
          Restart From Latest Checkpoint
        </button>
      </>
    );
  }