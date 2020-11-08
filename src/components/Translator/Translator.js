import React, {useState} from "react";
import "./Translator.scss";

import { translate, stringSplitter } from "../../utils/";

// Splits the string arr further by qty, and reattaches.
const splitAndTranslate = (arr, cb) => {
  return arr
    .map((item) => {
      let trimmed = item.trim();
      let qty = trimmed.substr(0, trimmed.indexOf(" "));
      let product = trimmed.substr(trimmed.indexOf(" ") + 1)
      let productTranslated = translate(product);
      
      if(productTranslated === product) {
        cb(`Translation for '${product}' was not found`)
      }
      
      let tempArr = [productTranslated === product ? product : productTranslated, qty];
      return tempArr.join(" x ");
    })
    .join("; ");
};

const Translator = () => {
  const [returnValue, updateReturnValue] = useState("");
  const [error, setError] = useState(false)
  const errorCallback = (value) => {
    setError(value)
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    // Split the string by ';'
    let splitValues = stringSplitter(e.target.input.value, ";");
    // Filter out empty results.
    splitValues = splitValues.filter(
      (text) => !text == "" && !text.includes("Route")
    );

    return updateReturnValue(splitAndTranslate(splitValues, errorCallback));
  };

  return (
    <>
      <form className="Translator__form" onSubmit={handleSubmit}>
        <textarea
          className="Translator__input"
          // onChange={handleChange}
          name="input"
        ></textarea>
        <button className="Translator__button">Enter</button>
      </form>
      <div>{returnValue}</div>
      <div>{error}</div>
    </>
  );
};

export default Translator;
