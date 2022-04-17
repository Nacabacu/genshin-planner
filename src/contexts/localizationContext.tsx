import en_US from '@localization/en-US.json';
import ja_JP from '@localization/ja-JP.json';
import th_TH from '@localization/th-TH.json';
import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const LOCALE_KEY = 'locale';

export const enum Locale {
  English = 'en-US',
  Japanese = 'ja-JP',
  Thai = 'th-TH',
}
export type LanguageDefinition = typeof en_US;

type LanguageDictionary = Record<Locale, LanguageDefinition>;

interface Localization {
  locale: Locale;
  setLocale: (newValue: Locale) => void;
  resources: LanguageDefinition;
}

export const supportedResources: LanguageDictionary = {
  [Locale.English]: en_US,
  [Locale.Japanese]: ja_JP,
  [Locale.Thai]: th_TH,
};

const defaultLanguage: Locale = Locale.English;
const LocalizationContext = createContext<Localization | null>(null);

function LocalizationProvider({ children }: PropsWithChildren<{}>) {
  const [locale, setLocale] = useLocalStorage<Locale>(LOCALE_KEY, defaultLanguage);
  const [resources, setResources] = useState(supportedResources[defaultLanguage]);

  useEffect(() => {
    setResources(supportedResources[locale]);
  }, [locale]);

  const value = useMemo(
    () => ({
      locale,
      resources,
      setLocale,
    }),
    [locale, resources, setLocale],
  );

  return <LocalizationContext.Provider value={value}>{children}</LocalizationContext.Provider>;
}

export const useLocalizationContext = () => useContext(LocalizationContext) as Localization;
export default LocalizationProvider;
