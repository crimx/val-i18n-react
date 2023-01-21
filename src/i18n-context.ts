import { createContext } from "react";
import type { I18n } from "val-i18n";

export const I18nContext = /* @__PURE__ */ createContext<I18n | null>(null);
