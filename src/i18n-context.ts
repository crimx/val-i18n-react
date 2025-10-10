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

interface UseI18nCtx {
  (): Ctx;
  (optional?: false): Ctx;
  (optional?: boolean): Ctx | null;
}

const useI18nCtx: UseI18nCtx = (optional => {
  const ctx = useContext(I18nContext);
  if (!ctx && !optional) {
    throw new Error("I18nProvider not found");
  }
  return ctx;
}) as UseI18nCtx;

export interface UseTranslate {
  (): TFunction;
  (optional?: false): TFunction;
  (optional?: boolean): TFunction | undefined;
}

/**
 * @returns A {@link TFunction} that translates the key from the nearest {@link I18nProvider} and fallbacks outwards.
 * If no {@link I18nProvider} found, throws an error unless `optional` is true.
 */
export const useTranslate: UseTranslate = (optional =>
  useI18nCtx(optional)?.t) as UseTranslate;

export interface UseI18n {
  (): I18n;
  (optional?: false): I18n;
  (optional?: boolean): I18n | undefined;
}

/**
 * @returns The {@link I18n} instance from the nearest {@link I18nProvider}.
 * If no {@link I18nProvider} found, throws an error unless `optional` is true.
 */
export const useI18n: UseI18n = (optional =>
  useI18nCtx(optional)?.i18n) as UseI18n;

export interface UseLang {
  (): LocaleLang;
  (optional?: false): LocaleLang;
  (optional?: boolean): LocaleLang | undefined;
}

/**
 * @returns The {@link LocaleLang} from the nearest {@link I18nProvider}.
 * If no {@link I18nProvider} found, throws an error unless `optional` is true.
 */
export const useLang: UseLang = (optional =>
  useVal(useI18n(optional)?.lang$)) as UseLang;
