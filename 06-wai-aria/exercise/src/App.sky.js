/*

Follow the WAI ARIA Radio Group example at:
https://www.w3.org/TR/wai-aria-practices-1.1/examples/radio/radio-1/radio-1.html

- Turn the span into a button to get keyboard and focus events
- Use tabIndex to allow only the active button to be tabbable
- Use left/right arrows to select the next/previous radio button
  - Tip: you can figure out the next value with React.Children.forEach(fn),
    or React.Children.toArray(children).reduce(fn)
- Move the focus in cDU to the newly selected item
  - Tip: do it in RadioOption not RadioGroup
  - Tip: you'll need a ref
- Add the aria attributes
  - radiogroup
  - radio
  - aria-checked
  - aria-label on the icons

*/
import React, { Component } from "react";
import FaPlay from "react-icons/lib/fa/play";
import FaPause from "react-icons/lib/fa/pause";
import FaForward from "react-icons/lib/fa/forward";
import FaBackward from "react-icons/lib/fa/backward";

class RadioGroup extends Component {
  state = {
    value: this.props.defaultValue
  };

  handleKeyDown = event => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      this.setState({ value: this.findNextValue() })
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      this.setState({ value: this.findPreviousValue() })
    }
  }

  findNextValue = () => {
    let childArray = React.Children.toArray(this.props.children);
    let currentIndex = childArray.findIndex(child => child.props.value === this.state.value);
    let nextIndex;
    if (currentIndex === React.Children.count(this.props.children) - 1) {
      nextIndex = 0
    } else {
      nextIndex = currentIndex + 1;
    }
    return childArray[nextIndex].props.value;
  };
  
  findPreviousValue = () => {
    let childArray = React.Children.toArray(this.props.children);
    let currentIndex = childArray.findIndex(child => child.props.value === this.state.value);
    let nextIndex;
    if (currentIndex === 0) {
      nextIndex = React.Children.count(this.props.children) - 1;
    } else {
      nextIndex = currentIndex - 1;
    }
    return childArray[nextIndex].props.value;
  }

  render() {
    const children = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        isActive: child.props.value === this.state.value,
        onSelect: () => this.setState({ value: child.props.value })
      });
    });
    return (
      <fieldset className="radio-group" onKeyDown={this.handleKeyDown}>
        <legend>{this.props.legend}</legend>
        {children}
      </fieldset>
    );
  }
}

class RadioButton extends Component {
  buttonRef = React.createRef();

  componentDidMount() {
    if (this.props.isActive) {
      this.buttonRef.current.focus();
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.isActive && this.props.isActive) {
      this.buttonRef.current.focus();
    }
  }

  render() {
    const { isActive, onSelect } = this.props;
    const className = "radio-button " + (isActive ? "active" : "");
    return (
      <button 
        ref={this.buttonRef} 
        className={className} 
        onClick={onSelect} 
        role="radio" 
        tabIndex={isActive ? 0 : -1} 
        aria-checked={isActive}
      >
        {this.props.children}
      </button>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <RadioGroup defaultValue="pause" legend="Radio Group" role="radiogroup">
          <RadioButton value="back">
            <FaBackward aria-label="Back" />
          </RadioButton>
          <RadioButton value="play">
            <FaPlay aria-label="Play" />
          </RadioButton>
          <RadioButton value="pause">
            <FaPause aria-label="Play" />
          </RadioButton>
          <RadioButton value="forward">
            <FaForward aria-label="Forward" />
          </RadioButton>
        </RadioGroup>
      </div>
    );
  }
}

export default App;
