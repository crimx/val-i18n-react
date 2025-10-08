import type { FC, PropsWithChildren } from "react";
import type { I18n, LocaleLang, TFunction, TFunctionArgs } from "val-i18n";

import { createContext, createElement, useContext, useMemo } from "react";
import { useVal } from "use-value-enhancer";

interface Ctx {
  t: TFunction;
  i18n: I18n;
}

const I18nContext = /* @__PURE__ */ createContext<Ctx | null>(null);

export interface I18nProviderProps {
  i18n: I18n;
}

/**
 * Provides the I18n instance to the rest of the app.
 *
 * @example
 * ```tsx
 * <I18nProvider i18n={i18n}>
 *   <App />
 * </I18nProvider>
 */
export const I18nProvider: FC<PropsWithChildren<I18nProviderProps>> = ({
  i18n,
  children,
}) => {
  const currentT = useVal(i18n.t$);
  const depT = useContext(I18nContext)?.t;

  return createElement(I18nContext.Provider, {
    value: useMemo(
      () => ({
        t: depT
          ? (keyPath: string, args?: TFunctionArgs): string => {
              const result = currentT(keyPath, args);
              return result === keyPath ? depT(keyPath, args) : result;
            }
          : currentT,
        i18n,
      }),
      [currentT, depT]
    ),
    children,
  });
};

const useI18nCtx = (): Ctx => {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("I18nProvider not found");
  }
  return ctx;
};

/**
 * @returns A {@link TFunction} that translates the key from the nearest {@link I18nProvider} and fallbacks outwards.  from the nearest {@link I18nProvider}. Throws if no {@link I18nProvider} found.
 */
export const useTranslate = (): TFunction => useI18nCtx().t;

/**
 * @returns The {@link I18n} instance from the nearest {@link I18nProvider}. Throws if not found.
 */
export const useI18n = (): I18n => useI18nCtx().i18n;

/**
 * @returns The {@link LocaleLang} from the nearest {@link I18nProvider}. Throws if not found.
 */
export const useLang = (): LocaleLang => useVal(useI18nCtx().i18n.lang$);
