import { useContext } from "react";
import { I18nContext } from "./i18n-context";
import { useVal } from "use-value-enhancer";
import type { I18n, LocaleLang, TFunction } from "val-i18n";

export const useI18n = (): I18n => {
  const i18n = useContext(I18nContext);
  if (!i18n) {
    throw new Error("I18nContext not found");
  }
  return i18n;
};

export const useTranslate = (): TFunction => useVal(useI18n().t$);

export const useLang = (): LocaleLang => useVal(useI18n().lang$);
