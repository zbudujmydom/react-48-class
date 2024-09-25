import { useEffect, useState } from "react";

function CounterFunction(props) {
  const [counter, setCounter] = useState(props.initialValue);

  useEffect(() => {
    fetch("https://dummyjson.com/posts")
      .then((res) => res.json())
      .then(console.log);
  }, [props.initialValue]);

  function increaseCounter() {
    setCounter((prevState) => prevState + 1);
  }

  return (
    <div>
      <h2>Licznik function: {counter}</h2>
      <button onClick={increaseCounter}>Dodaj 1</button>
    </div>
  );
}

export default CounterFunction;
