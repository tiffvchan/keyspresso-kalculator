// This file contains the translation hook.
// import React from "react";
import { useTranslation } from "react-i18next";
import en from "../translations/en.json";

const translate = (string) => {
  return en[string];
};

// Translation hook
const useTranslate = (string) => {
  return translate(string.trim());
};

export default useTranslate;
