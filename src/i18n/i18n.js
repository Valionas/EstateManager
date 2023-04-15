import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import bgTranslation from './bg.js';
import enTranslation from './en.js';

// Define the translations for each language
const resources = {
  bg: {
    translation: bgTranslation,
  },
  en: {
    translation: enTranslation,
  },
};

// Initialize i18n
i18n.use(initReactI18next).init({
  resources,
  fallbackLng: 'en', // Fallback language
  interpolation: {
    escapeValue: false, // React already safely escapes interpolated values
  },
});

export default i18n;
