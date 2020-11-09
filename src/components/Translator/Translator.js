import React, {useState} from "react";
import "./Translator.scss";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { translate, stringSplitter } from "../../utils/";

// Splits the string arr further by qty, and reattaches.
const splitAndTranslate = (arr, cb) => {
  const errorArr = []

  const translatedProducts = arr
    .map((item) => {
      let trimmed = item.trim();
      let qty = trimmed.substr(0, trimmed.indexOf(" "));
      let product = trimmed.substr(trimmed.indexOf(" ") + 1)
      let productTranslated = translate(product);
      
      // compile error items
      if(productTranslated === product) {
        errorArr.push(product)
      }
      
      let productName = productTranslated === product ? product : productTranslated;

      return [productName, parseInt(qty)]
    })

    // add products together with same translated name
    const productSummary = {}
    translatedProducts.forEach(product => {
      if (!productSummary[product[0]]) {
        productSummary[product[0]] = product[1]
      } else {
        productSummary[product[0]] += product[1]
      }
    })

    cb(errorArr)
    
    // after summing same product skus, create ' x QTY' string for each sku, join into one string with ';' separator
    return Object.entries(productSummary).map(product => {
      return [product[0], [product[1]].toString()].join(" x ")
    }).join("; ")


};

const autoCopyToClipboard = () => {
  var copyTextarea = document.getElementById("output-text");
  copyTextarea.select(); //select the text area
  document.execCommand("copy"); //copy to clipboard
  toast("Copied to Clipboard!")
}

const Translator = () => {
  const [returnValue, updateReturnValue] = useState("");
  const [error, setError] = useState([])
  const errorCallback = (value) => setError(value)
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Split the string by ';'
    let splitValues = stringSplitter(e.target.input.value, ";");
    // Filter out empty results.
    splitValues = splitValues.filter(
      // eslint-disable-next-line
      (text) => !text == "" && !text.includes("Route")
    );

    await updateReturnValue(splitAndTranslate(splitValues, errorCallback));
    autoCopyToClipboard()

  };

  return (
    <>
      <form className="Translator__form" onSubmit={handleSubmit}>
        <textarea
          className="Translator__input"
          name="input"
        ></textarea>
        <button className="Translator__button">Enter</button>
      </form>
      <div>
      <textarea
          id="output-text"
          className="Translator__input"
          name="output"
          value={returnValue}
        ></textarea>
      </div>
      {!!error.length && 
      <div className="Translator__error">
        Translation not found: {error.join(", ")}
      </div>
      }
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default Translator;
