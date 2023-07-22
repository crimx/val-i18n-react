import type { FC, PropsWithChildren } from "react";
import type { I18n } from "val-i18n";

import { createContext, createElement } from "react";

export const I18nContext = /* @__PURE__ */ createContext<I18n | null>(null);

export type I18nProviderProps = PropsWithChildren<{ i18n: I18n }>;

/**
 * Provides the I18n instance to the rest of the app.
 */
export const I18nProvider: FC<I18nProviderProps> = ({ i18n, children }) =>
  createElement(I18nContext.Provider, { value: i18n, children });
