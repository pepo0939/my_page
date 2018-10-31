import { connect } from "react-redux";
import Welcome from "./welcome";

export default connect(state => ({ playerStatus: state.general.playerStatus }))(
  Welcome
);
