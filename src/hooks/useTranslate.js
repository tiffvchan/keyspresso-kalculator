// This file contains the translation hook.
import React from "react";
import { useTranslation } from "react-i18next";

// Translation hook
const useTranslate = (string) => {
  const { t, i18n } = useTranslation();
  return t(string);
};

export default useTranslate;
