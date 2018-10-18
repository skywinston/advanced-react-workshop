/*
- Make the Play button work
- Make the Pause button work
- Disable the play button if it's playing
- Disable the pause button if it's not playing
- Make the PlayPause button work
- Make the JumpForward button work
- Make the JumpBack button work
- Make the progress bar work
  - change the width of the inner element to the percentage of the played track
  - add a click handler on the progress bar to jump to the clicked spot

Here is the audio API you'll need to use, `audio` is the <audio/> dom nod
instance, you can access it as `this.audio` in `AudioPlayer`

```js
// play/pause
audio.play()
audio.pause()

// change the current time
audio.currentTime = audio.currentTime + 10
audio.currentTime = audio.currentTime - 30

// know the duration
audio.duration

// values to calculate relative mouse click position
// on the progress bar
event.clientX // left position *from window* of mouse click
const rect = node.getBoundingClientRect()
rect.left // left position *of node from window*
rect.width // width of node
```

Other notes about the `<audio/>` tag:

- You can't know the duration until `onLoadedData`
- `onTimeUpdate` is fired when the currentTime changes
- `onEnded` is called when the track plays through to the end and is no
  longer playing

Good luck!
*/

import React from "react";
import podcast from "./lib/podcast.mp4";
import mario from "./lib/mariobros.mp3";
import FaPause from "react-icons/lib/fa/pause";
import FaPlay from "react-icons/lib/fa/play";
import FaRepeat from "react-icons/lib/fa/repeat";
import FaRotateLeft from "react-icons/lib/fa/rotate-left";

const AudioContext = React.createContext();

class AudioPlayer extends React.Component {
  state = { 
    isPlaying: false,
    play: () => {
      this.setState({ isPlaying: true })
      this.audio.play();
    },
    pause: () => {
      this.setState({ isPlaying: false })
      this.audio.pause();
    },
    jumpForward: (amount = 10) => {
      this.audio.currentTime = this.audio.currentTime + amount;
    },
    jumpBackward: (amount = 10) => {
      this.audio.currentTime = this.audio.currentTime - amount;
    } 
  };

  componentDidMount() {
    const { currentTime } = this.audio;
    this.setState({ currentTime })
  }

  componentDidUpdate(_, prevState) {
    if (!prevState.isPlaying && this.state.isPlaying) {
      this.state.play();
    }
    if (prevState.isPlaying && !this.state.isPlaying) {
      this.state.pause();
    }
    if (prevState.currentTime !== this.state.currentTime) {
      this.audio.currentTime = this.state.currentTime;
    }
  }

  render() {
    return (
      <div className="audio-player">
        <audio
          src={this.props.source}
          onTimeUpdate={null}
          onLoadedData={null}
          onEnded={null}
          ref={n => (this.audio = n)}
        />
        <AudioContext.Provider value={this.state}>
          {this.props.children}
        </AudioContext.Provider>
      </div>
    );
  }
}

class Play extends React.Component {
  render() {
    return (
      <AudioContext.Consumer>
        {({ isPlaying, play }) => (
          <button
            className="icon-button"
            onClick={play}
            disabled={isPlaying}
            title="play"
          >
            <FaPlay />
          </button>
        )}
      </AudioContext.Consumer>
    );
  }
}

class Pause extends React.Component {
  render() {
    return (
      <AudioContext.Consumer>
        {({ isPlaying, pause }) => (
          <button
          className="icon-button"
          onClick={pause}
          disabled={!isPlaying}
          title="pause"
          >
            <FaPause />
          </button>
        )}
      </AudioContext.Consumer>
    );
  }
}

class PlayPause extends React.Component {
  render() {
    return (
      <AudioContext.Consumer>
        {({ isPlaying }) => isPlaying ? <Pause/> : <Play/>}
      </AudioContext.Consumer>
    );
  }
}

class JumpForward extends React.Component {
  render() {
    return (
      <AudioContext.Consumer>
        {({ jumpForward }) => (
          <button
            className="icon-button"
            onClick={jumpForward}
            disabled={null}
            title="Forward 10 Seconds"
          >
            <FaRepeat />
          </button>
        )}
      </AudioContext.Consumer>
    );
  }
}

class JumpBack extends React.Component {
  render() {
    return (
      <AudioContext.Consumer>
        {({ jumpBackward }) => (
          <button
            className="icon-button"
            onClick={jumpBackward}
            disabled={null}
            title="Back 10 Seconds"
          >
            <FaRotateLeft />
          </button>
        )}
      </AudioContext.Consumer>
    );
  }
}

class Progress extends React.Component {
  render() {
    return (
      <div className="progress" onClick={null}>
        <div
          className="progress-bar"
          style={{
            width: "23%"
          }}
        />
      </div>
    );
  }
}

const Exercise = () => (
  <div className="exercise">
    <AudioPlayer source={mario}>
      <Play /> <Pause /> <span className="player-text">Mario Bros. Remix</span>
      <Progress />
    </AudioPlayer>

    <AudioPlayer source={podcast}>
      <PlayPause /> <JumpBack /> <JumpForward />{" "}
      <span className="player-text">Workshop.me Podcast Episode 02</span>
      <Progress />
    </AudioPlayer>
  </div>
);

export default Exercise;
