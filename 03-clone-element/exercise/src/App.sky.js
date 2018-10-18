import React, { Component } from "react";
import FaPlay from "react-icons/lib/fa/play";
import FaPause from "react-icons/lib/fa/pause";
import FaForward from "react-icons/lib/fa/forward";
import FaBackward from "react-icons/lib/fa/backward";

class RadioGroup extends Component {
  state = {
    value: null
  }
  render() {
    return (
      <fieldset className="radio-group">
        <legend>{this.props.legend}</legend>
        {React.Children.map(
          this.props.children, 
          child => React.cloneElement(child, {
            isActive: this.state.value === child.props.value,
            setValue: () => this.setState({ value: child.props.value })
          })
        )}
      </fieldset>
    );
  }
}

class RadioButton extends Component {
  render() {
    const isActive = this.props.isActive; 
    const className = "radio-button " + (isActive ? "active" : "");
    return <button onClick={this.props.setValue} className={className}>{this.props.children}</button>;
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <RadioGroup legend="Radio Group">
          <RadioButton value="back">
            <FaBackward />
          </RadioButton>
          <RadioButton value="play">
            <FaPlay />
          </RadioButton>
          <RadioButton value="pause">
            <FaPause />
          </RadioButton>
          <RadioButton value="forward">
            <FaForward />
          </RadioButton>
        </RadioGroup>
      </div>
    );
  }
}

export default App;
