import React from "react";
import "./Translator.scss";

import { translate, stringSplitter } from "../../utils/";

// Splits the string arr further by qty, and reattaches.
const splitAndTranslate = (arr) => {
  return arr
    .map((item) => {
      let trimmed = item.trim();
      let qty = trimmed.substr(0, trimmed.indexOf(" "));
      let itemString = translate(trimmed.substr(trimmed.indexOf(" ") + 1));
      let tempArr = [itemString, qty];
      return tempArr.join(" x ");
    })
    .join("; ");
};

const Translator = () => {
  const [returnValue, updateReturnValue] = React.useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    // Split the string by ';'
    let splitValues = stringSplitter(e.target.input.value, ";");
    // Filter out empty results.
    splitValues = splitValues.filter(
      (text) => !text == "" && !text.includes("Route")
    );

    return updateReturnValue(splitAndTranslate(splitValues));
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
    </>
  );
};

export default Translator;
