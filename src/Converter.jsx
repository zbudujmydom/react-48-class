import { useState } from "react";

const Converter = () => {
  const [result, setResult] = useState(null);
  const [showError, setShowError] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowError(false);
    setIsFetching(true);

    const amount = parseFloat(event.target.amount.value);
    const currency = "EUR";

    fetch(`https://api.nbp.pl/api/exchangerates/rates/a/${currency}`)
      .then((response) => {
        if (!response.ok) {
          return Promise.reject();
        }
        return response.json();
      })
      .then((data) => {
        const rate = data?.rates?.[0]?.mid;
        if (!rate) {
          return Promise.reject();
        }
        const outcome = amount * rate;
        setResult(outcome.toFixed(2));
      })
      .catch(() => {
        setShowError(true);
      })
      .finally(() => {
        setIsFetching(false);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="amount"
          name="amount"
          min="0.01"
          step="0.01"
          required
        />
        <button type="submit" disabled={isFetching}>
          {isFetching ? "trwa przeliczanie..." : "Przelicz EUR na zł"}
        </button>
      </form>
      {!showError && result > 0 ? <h1>Wynik: {result} PLN</h1> : null}
      {showError ? <p>Error, try again later.</p> : null}
    </div>
  );
};

export default Converter;
