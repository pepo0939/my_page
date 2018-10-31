import PLAYER_STATUS from "../../helpers/playerControlStatus";

const initialState = {
  playerStatus: PLAYER_STATUS.PLAYING
};

const playerControler = (state = initialState, action) => {
  switch (action.type) {
    case "PLAY":
      return {
        ...state,
        playerStatus: PLAYER_STATUS.PLAYING
      };
    case "STOP":
      return {
        ...state,
        playerStatus: PLAYER_STATUS.STOPED
      };
    case "PAUSE":
      return {
        ...state,
        playerStatus: PLAYER_STATUS.PAUSED
      };
    default:
      return state;
  }
};

export default playerControler;
