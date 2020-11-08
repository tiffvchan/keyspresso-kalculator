import React from "react";
import "./Translator.scss";

import { useTranslate } from "../../hooks/";

const testString = "Lube application brush;";
const testString2 =
  "1 Lube application brush; 1 Cherry Clip-In Stabilizers (PCB) - 4x2u + 1x7u+ 1x6.25u; 4 Durock Stabilizers - 4x 2u. 1x 7u.; 1 Route Package Protection - ROUTEINS10";

const stringSplitter = (str, separator) => {
  const arrOfString = str.split(separator);
  return arrOfString;
};

const Translator = () => {
  const [enteredValue, updateValue] = React.useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("yolo", enteredValue);

    const splitValues = stringSplitter(testString, ";");

    splitValues.map((item) => {
      console.log("item", useTranslate(item));
    });
  };

  const handleChange = (e) => {
    const { value } = e.target;
    updateValue(value);
  };

  return (
    <>
      <form className="Translator__form" onSubmit={handleSubmit}>
        {/* <label>Items Input</label> */}
        <textarea className="Translator__input" onChange={handleChange}>
          {enteredValue}
        </textarea>
        <button className="Translator__button">Enter</button>
      </form>
      <div>test translation: 6MIX Lube</div>
    </>
  );
};

export default Translator;
