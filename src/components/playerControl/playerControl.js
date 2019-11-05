import React, { useEffect, useState } from "react";
import PLAYER_CONTROL_STATUS from "../../helpers/playerControlStatus";

const styles = {
  container: {
    position: "fixed",
    bottom: 0,
    right: 0,
    height: 60,
    width: 100
  },
  constrolSet: {
    transition: "all 1s"
  },
  hidden: {
    opacity: 0
  },
  button: {
    height: 50
  }
};
let timeout;
function PlayerControl(props) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisibleTimeout();
  }, []);

  const setVisibleTimeout = () => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => setVisible(false), 2000);
  };

  const handlePlayPress = () => {
    props.play();
  };

  const handlePausePress = () => {
    props.pause();
  };

  const handleStopPress = () => {
    props.stop();
  };

  return (
    <div
      style={styles.container}
      onMouseOver={() => {
        setVisible(true);
      }}
      onMouseLeave={setVisibleTimeout}
    >
      <div
        style={{
          ...styles.constrolSet,
          ...(!visible ? styles.hidden : {})
        }}
      >
        {props.playerStatus !== PLAYER_CONTROL_STATUS.PLAYING ? (
          <svg
            alt={"play"}
            onClick={handlePlayPress}
            style={styles.button}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 30 30"
          >
            {" "}
            <path d="M15,3C8.373,3,3,8.373,3,15c0,6.627,5.373,12,12,12s12-5.373,12-12C27,8.373,21.627,3,15,3z M20.304,15.402l-7.608,4.392 C12.313,20.015,12,19.834,12,19.392v-8.785c0-0.442,0.313-0.623,0.696-0.402l7.608,4.392C20.687,14.819,20.687,15.181,20.304,15.402 z" />
          </svg>
        ) : (
          <svg
            alt={"pause"}
            onClick={handlePausePress}
            style={styles.button}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 30 30"
          >
            {" "}
            <path d="M15,3C8.373,3,3,8.373,3,15c0,6.627,5.373,12,12,12s12-5.373,12-12C27,8.373,21.627,3,15,3z M14,19c0,0.552-0.448,1-1,1 s-1-0.448-1-1v-8c0-0.552,0.448-1,1-1s1,0.448,1,1V19z M18,19c0,0.552-0.448,1-1,1s-1-0.448-1-1v-8c0-0.552,0.448-1,1-1s1,0.448,1,1 V19z" />
          </svg>
        )}

        <svg
          alt={"stop"}
          onClick={handleStopPress}
          style={styles.button}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 30 30"
        >
          {" "}
          <path d="M15,3C8.373,3,3,8.373,3,15c0,6.627,5.373,12,12,12s12-5.373,12-12C27,8.373,21.627,3,15,3z M20,19c0,0.552-0.448,1-1,1h-8 c-0.552,0-1-0.448-1-1v-8c0-0.552,0.448-1,1-1h8c0.552,0,1,0.448,1,1V19z" />
        </svg>
      </div>
    </div>
  );
}

export default PlayerControl;
