/**
 * This file contains the init for i18n translations
 */
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Translations
import en from "./translations/en.json";

const resources = {
  en: {
    translation: { ...en },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  keySeparator: false,
  interpolation: { excapeValue: false },
});

export default i18n;
