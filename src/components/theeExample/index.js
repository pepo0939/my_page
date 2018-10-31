import { connect } from "react-redux";
import ThreeExample from "./threeExample";

export default connect(state => ({ playerStatus: state.general.playerStatus }))(
  ThreeExample
);
