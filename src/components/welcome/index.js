import { connect } from "react-redux";
import Welcome from "./welcome2";

export default connect((state) => ({
  playerStatus: state.general.playerStatus
}))(Welcome);
