import React, { Component } from "react";

const getQuote = () => {
  return 30 + Math.random() * 10;
};

class App extends Component {
  state = {
    price: getQuote()
  };

  componentDidMount() {
    this.inverval = setInterval(this.fetch, 2000);
  }

  fetch = async () => {
    this.setState({ price: getQuote() });
  };

  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <h1>Stock Price</h1>
        <PriceDisplay price={this.state.price} />
      </div>
    );
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }
}

class PriceDisplay extends React.Component {
  state = { 
    direction: null,
    price: this.props.price
  };

  static getDerivedStateFromProps(props, state) {
    if (props.price > state.price) {
      return { 
        direction: "up", 
        price: props.price 
      };
    } else if (props.price < state.price) {
      return { 
        direction: "down",
        price: props.price 
      };
    } 
  }

  render() {
    const { direction } = this.state;
    return (
      <div
        style={{
          display: "inline-block",
          boxShadow: "inset 0 0 10px #000000",
          borderRadius: 10,
          fontSize: 50,
          background: "#454545",
          width: 300,
          padding: 20,
          color:
            direction === "down"
              ? "red"
              : direction === "up" ? "lawngreen" : "#ccc"
        }}
      >
        <span>
          {direction === "up" && "▲"}
          {direction === "down" && "▼"}
        </span>
        <span style={{ fontFamily: "Digital" }}>
          {this.props.price.toFixed(2)}
        </span>
      </div>
    );
  }
}

export default App;