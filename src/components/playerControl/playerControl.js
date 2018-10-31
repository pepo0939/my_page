import React, { PureComponent } from "react";

const styles = {
  container: {
    position: "fixed",
    bottom: 0,
    right: 0,
    height: 60,
    width: 150
  },
  constrolSet: {
    transition: "all 1s"
  },
  hidden: {
    opacity: 0
  }
};

export default class PlayerControl extends PureComponent {
  state = {
    visible: true
  };

  componentDidMount = () => {
    this.setVisibleTimeout();
  };

  setVisibleTimeout = () => {
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => this.setState({ visible: false }), 2000);
  };

  handlePlayPress = () => {
    this.props.play();
  };

  handlePausePress = () => {
    this.props.pause();
  };

  handleStopPress = () => {
    this.props.stop();
  };

  render() {
    return (
      <div
        style={styles.container}
        onMouseOver={() => {
          this.setState({ visible: true });
        }}
        onMouseLeave={this.setVisibleTimeout}
      >
        <div
          style={{
            ...styles.constrolSet,
            ...(!this.state.visible ? styles.hidden : {})
          }}
        >
          <img
            alt={"play"}
            onClick={this.handlePlayPress}
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAFiSURBVGhD7dk9SsRQFMXxqNhoKVaChQsQxd4NuAHFTkQUwTXYibMIrSxFrCzstHMBaicIdjYifiCi/m8RmOKMM3kzyX0M98CvCe/dcEgIgVdEIpHI0GUGq9hysIEl9J11vOHX2QlGkRR7Eu9Qgz1sIyn2OqmBXs6QlB2ogV6ukZQoUpMoEkVq0miRVxzgue3aoDRapLzZLK6g1qRyKWIZwz6+odZW5VakzDIeodZX4V7EMgX7xVB7epVFEcsIdvEBtbebbIqUmcct1P7/ZFfEMoFjqBmdZFnEYq/aPdQcJdsiK/iCmqNkV2QcLfxAzegkqyJzuIHa2002RdbwArWvF+5FJnEEtb4K1yILuINaW5VLEfu07uETal2KRos8YBHnbdcGpdEidYoiUaQmUWRoimxCDfRyiaTYSZEa6MX+mJNjJ0VqaNOeMI3k2HGXnRSdwh5t0y5wiL5KRCKRSKSmFMUfaI+iASkSqzcAAAAASUVORK5CYII="
          />
          <img
            alt={"pause"}
            onClick={this.handlePausePress}
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEpSURBVGhD7dmhS4NBHMbxF4Nl2WQ2mJeM5vkHCIJBhsxiNFiWNZmMNuMwGgSLed1gkeGfoBZRvz+4F37IhXe33R2O5wufcgcnD7O9jVJKrVyb2MdxBUfoY+EO8I6fym6xhqTsl/hA7OEaRkjK/p1iD9Zyh6ROEHuwlickpSGZaIiGZFJ8yCPGeHFn5hNXuMZXOJtH0SGvWIe1BX93jjYb5O+6KDrk7x/zd3t2EFrG251b9pCBHYQ0JCUNcfk7DQk0RENc/k5DAg3REJe/+1dDpmjrwd8dou0M/q6LokO+cYpt3ISz1jN2sItZOJtH0SE5aYiGZKIhKzNkiNiDtTwgKftSFHuwlkskZ1+KYo+W9oYNJGefu+xL0QT205Z2jwssNEIppVSmmuYXw8OmiE7qzHYAAAAASUVORK5CYII="
          />
          <img
            alt={"stop"}
            onClick={this.handleStopPress}
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACrSURBVGhD7dK9EYFREEbhLyIyfgoQCMjohhJEYqqhIMqgCAQc+b2JvZtwzswT77wz25mZmdl39TBLNEFqAxzxwCvZBUukdELpaJYbRmhaH3eUDmZao2lTlA5lO6BpDglySC2HBDmklkOCHFLLIUEOqeWQIIfUckiQQ2o5JMghtX5myBilQ9m2aN4ZpWNZnligeStcUTra2mfEDmkNscE+0eed5jAzM7M/reveoxVeoBUzn9YAAAAASUVORK5CYII="
          />
        </div>
      </div>
    );
  }
}
