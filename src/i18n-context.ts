import type { PropsWithChildren } from "react";
import type { I18n } from "val-i18n";

import { createContext, createElement } from "react";

export const I18nContext = /* @__PURE__ */ createContext<I18n | null>(null);

export type I18nProviderProps = PropsWithChildren<{ i18n: I18n }>;

export const I18nProvider = ({ i18n, children }: I18nProviderProps) =>
  createElement(I18nContext.Provider, { value: i18n, children });
