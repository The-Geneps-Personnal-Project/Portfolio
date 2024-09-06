import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "../locales/en/translation.json";
import translationFR from "../locales/fr/translation.json";

const resources = {
    en: {
        translation: translationEN,
    },
    fr: {
        translation: translationFR,
    },
};

const userLanguage = navigator.language.startsWith('fr') ? 'fr' : 'en';

i18n.use(initReactI18next).init({
    resources,
    lng: userLanguage,
    fallbackLng: "en",
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
