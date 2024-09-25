import React from "react";

class CounterClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: props.initialValue,
    };
    this.increaseCounter = this.increaseCounter.bind(this);
  }

  increaseCounter() {
    this.setState((prevState) => ({
      counter: prevState.counter + 1,
    }));
  }

  fetchDataFromAPI = () => {
    fetch("https://dummyjson.com/posts")
      .then((res) => res.json())
      .then(console.log);
  };

  componentDidMount() {
    this.fetchDataFromAPI();
  }

  componentDidUpdate() {
    this.fetchDataFromAPI();
  }

  shouldComponentUpdate(newProps) {
    return newProps.initialValue !== this.props.initialValue;
  }

  render() {
    return (
      <div>
        <h2>Licznik class: {this.state.counter}</h2>
        <button onClick={this.increaseCounter}>Dodaj 1</button>
      </div>
    );
  }
}

export default CounterClass;
