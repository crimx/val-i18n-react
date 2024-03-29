import type { PropsWithChildren } from "react";
import type { Locales } from "val-i18n";

import { describe, expect, it } from "@jest/globals";
import { act, renderHook } from "@testing-library/react";
import React from "react";
import { I18n } from "val-i18n";
import {
  I18nContext,
  I18nProvider,
  useI18n,
  useLang,
  useTranslate,
} from "../src/main";

describe("useI18n", () => {
  it("should get i18n instance", () => {
    const locales: Locales = { en: { fruit: "apple" } };
    const i18n = new I18n("en", locales);
    const wrapper: React.FC<PropsWithChildren> = ({ children }) => (
      <I18nProvider i18n={i18n}>{children}</I18nProvider>
    );
    const { result } = renderHook(() => useI18n(), { wrapper });

    expect(result.current).toBe(i18n);
  });

  it("should throw error if no i18n context", () => {
    const { result } = renderHook(() => {
      try {
        return useI18n();
      } catch (e) {
        return e;
      }
    });
    expect(result.current).toBeInstanceOf(Error);
  });
});

describe("useTranslate", () => {
  it("should get t function", () => {
    const locales: Locales = { en: { apple: "apple" } };
    const i18n = new I18n("en", locales);
    const wrapper: React.FC<PropsWithChildren> = ({ children }) => (
      <I18nContext.Provider value={i18n}>{children}</I18nContext.Provider>
    );
    const { result } = renderHook(() => useTranslate(), { wrapper });

    const t = result.current;
    expect(t).toBe(i18n.t);
    expect(t("apple")).toBe("apple");
  });

  it("should update t function", async () => {
    const locales: Locales = { en: { apple: "apple" }, zh: { apple: "苹果" } };
    const i18n = new I18n("en", locales);
    const wrapper: React.FC<PropsWithChildren> = ({ children }) => (
      <I18nContext.Provider value={i18n}>{children}</I18nContext.Provider>
    );
    const { result } = renderHook(() => useTranslate(), { wrapper });

    const t = result.current;
    expect(t).toBe(i18n.t);
    expect(t("apple")).toBe("apple");

    await act(async () => i18n.switchLang("zh"));

    expect(result.current).toBe(i18n.t);
    expect(result.current).not.toBe(t);
    expect(result.current("apple")).toBe("苹果");
  });
});

describe("useLang", () => {
  it("should get lang", () => {
    const locales: Locales = { en: { apple: "apple" } };
    const i18n = new I18n("en", locales);
    const wrapper: React.FC<PropsWithChildren> = ({ children }) => (
      <I18nContext.Provider value={i18n}>{children}</I18nContext.Provider>
    );
    const { result } = renderHook(() => useLang(), { wrapper });

    expect(result.current).toBe(i18n.lang);
  });

  it("should update lang", async () => {
    const locales: Locales = { en: { apple: "apple" }, zh: { apple: "苹果" } };
    const i18n = new I18n("en", locales);
    const wrapper: React.FC<PropsWithChildren> = ({ children }) => (
      <I18nContext.Provider value={i18n}>{children}</I18nContext.Provider>
    );
    const { result } = renderHook(() => useLang(), { wrapper });

    expect(result.current).toBe("en");

    await act(async () => i18n.switchLang("zh"));

    expect(result.current).toBe("zh");
  });
});
