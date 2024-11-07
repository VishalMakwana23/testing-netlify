import i18n from "i18next";
import { initReactI18next } from "react-i18next";


// Importing translation files

import translationEN from './locales/english/Translate.json'
import translationDE from "./locales/germany/Translate.json";
import translationAR from "./locales/arabic/Translate.json";
import translationFR from "./locales/french/Translate.json";
import translationES from "./locales/Spanish/Translate.json";


//Creating object with the variables of imported translation files
const resources = {
  en: {
    translation: translationEN,
  },
  de: {
    translation: translationDE,
  },
  ar: {
    translation: translationAR,
  },
  fr: {
    translation: translationFR,
  },
  es: {
    translation: translationES,
  },
};
let lang = localStorage.getItem('Language');

//i18N Initialization

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: lang === undefined ? "en" : lang, //default language
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;