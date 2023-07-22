import { useContext } from "react";
import { useVal } from "use-value-enhancer";
import { I18nContext } from "./i18n-context";

import type { I18n, LocaleLang, TFunction } from "val-i18n";

/**
 * @returns The {@link I18n} instance from the nearest {@link I18nProvider}. Throws if not found.
 */
export const useI18n = (): I18n => {
  const i18n = useContext(I18nContext);
  if (!i18n) {
    throw new Error("I18nContext not found");
  }
  return i18n;
};

/**
 * @returns The {@link TFunction} from the nearest {@link I18nProvider}. Throws if not found.
 */
export const useTranslate = (): TFunction => useVal(useI18n().t$);

/**
 * @returns The {@link LocaleLang} from the nearest {@link I18nProvider}. Throws if not found.
 */
export const useLang = (): LocaleLang => useVal(useI18n().lang$);
