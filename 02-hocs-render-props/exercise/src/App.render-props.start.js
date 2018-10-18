import React from "react";
import PropTypes from "prop-types";
import createMediaListener from "./lib/createMediaListener";
import { Galaxy, Trees, Earth } from "./lib/screens";
import { CSSTransition } from "react-transition-group";

class MediaListener extends React.Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    queries: PropTypes.object
  };

  media = createMediaListener(this.props.queries);

  state = { 
    media: this.media.getState() 
  }
  
  componentDidMount() {
    this.media.listen(media => this.setState({ media }));
  }
  
  componentWillUnmount() {
    this.media.dispose();
  }

  render() {
    return this.props.children(this.state);
  }
}

class App extends React.Component {
  render() {
    return (
      <MediaListener queries={{
        big: "(min-width : 1000px)",
        tiny: "(max-width: 600px)"
      }}>
        {({ media }) => (
          <CSSTransition classNames="fade" timeout={300}>
            {media.big ? (
              <Galaxy key="galaxy" />
            ) : media.tiny ? (
              <Trees key="trees" />
            ) : (
              <Earth key="earth" />
            )}
          </CSSTransition>
        )}
      </MediaListener>
    );
  }
}

export default App;
