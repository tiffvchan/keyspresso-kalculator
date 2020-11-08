// This file contains the translation hook.
// import React from "react";
import en from "../translations/en.json";

const translate = (string) => {
  return en[string.trim()];
};

export default translate;
