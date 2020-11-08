import React from 'react';
import "./Translator.scss";

const Translator = () => {

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('yolo')
    e.target.reset();
  }

  return ( 
    <form className="Translator__form" onSubmit={handleSubmit}>
      {/* <label>Items Input</label> */}
        <textarea className="Translator__input"></textarea>
        <button className="Translator__button">Enter</button>
    </form>
   );
}
 
export default Translator;