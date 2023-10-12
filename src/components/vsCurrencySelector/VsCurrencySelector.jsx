import React from "react";
import { useVsCurrency } from "../../contexts/VsCurrencyContext";
import './currency-selector.css';

const VsCurrencySelector = () => {
  // VsCurrency context
  const { selectedVsCurrency, setSelectedVsCurrency } = useVsCurrency();

  const handleChange = ({ target }) => {
    setSelectedVsCurrency(target.value);
  };

  return (
    <>
      <span className="currency-selector-container">
        <select
          id="currency-selector"
          value={selectedVsCurrency}
          onChange={handleChange}
        >
          <option value="usd">USD</option>
          <option value="eur">Eur</option>
          <option value="btc">BTC</option>
        </select>
      </span>
    </>
  );
};

export default VsCurrencySelector;
