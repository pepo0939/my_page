import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PlayerControl from "./playerControl";
import { play, stop, pause } from "../../redux/actions/general.js";

export default connect(
  state => ({ playerStatus: state.general.playerStatus }),
  dispatch => bindActionCreators({ play, stop, pause }, dispatch)
)(PlayerControl);
