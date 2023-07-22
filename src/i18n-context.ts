import type { FC, PropsWithChildren } from "react";
import type { I18n } from "val-i18n";

import { createContext, createElement } from "react";

export const I18nContext = /* @__PURE__ */ createContext<I18n | null>(null);

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
}) => createElement(I18nContext.Provider, { value: i18n, children });
