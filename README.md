# [val-i18n-react](https://github.com/crimx/val-i18n-react)

<p align="center">
  <img width="200" src="https://raw.githubusercontent.com/crimx/val-i18n/main/assets/val-i18n.svg">
</p>

[![Build Status](https://github.com/crimx/val-i18n-react/actions/workflows/build.yml/badge.svg)](https://github.com/crimx/val-i18n-react/actions/workflows/build.yml)
[![npm-version](https://img.shields.io/npm/v/val-i18n-react.svg)](https://www.npmjs.com/package/val-i18n-react)
[![Coverage Status](https://img.shields.io/coveralls/github/crimx/val-i18n-react/master)](https://coveralls.io/github/crimx/val-i18n-react?branch=master)
[![minified-size](https://img.shields.io/bundlephobia/minzip/val-i18n-react)](https://bundlephobia.com/package/val-i18n-react)

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?maxAge=2592000)](http://commitizen.github.io/cz-cli/)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-brightgreen.svg?maxAge=2592000)](https://conventionalcommits.org)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

React goodies for [val-i18n](https://github.com/crimx/val-i18n).

## Install

```bash
npm add val-i18n-react val-i18n value-enhancer
```

## API

- `I18nProvider` to provide `i18n` context for descendant components.
- `useTranslate` hook to subscribe and get the latest `i18n.t`.
- `useLang` hook to subscribe and get the latest `i18n.lang`.
- `useI18n` hook to subscribe and get the latest `i18n` instance.
- `<Trans>` component to insert React elements into translation template messages.

## Usage

See live example on [CodeSandbox](https://codesandbox.io/s/val-i18n-react-o887n0).

```jsx
import { I18n } from "val-i18n";
import { I18nProvider, useTranslate } from "val-i18n-react";

const i18n = new I18n("en", { en: { fruit: "apple" } });

const MyComponent = () => {
  const t = useTranslate();
  return <div>{t("fruit")}</div>;
};

const App = () => {
  return (
    <I18nProvider i18n={i18n}>
      <MyComponent />
    </I18nProvider>
  );
};
```

### Cascading I18nProvider

You can nest multiple `<I18nProvider>`s to create cascading i18n contexts.

```tsx
import { I18n } from "val-i18n";
import { I18nProvider, useTranslate } from "val-i18n-react";

const baseI18n = new I18n("en", { en: { confirm: "Confirm" } });
const loginI18n = new I18n("en", { en: { login: "Login" } });

const MyComponent = () => {
  const t = useTranslate();
  return (
    <div>
      <button>{t("confirm")}</button>
      <button>{t("login")}</button>
    </div>
  );
};

const App = () => {
  return (
    <I18nProvider i18n={baseI18n}>
      <I18nProvider i18n={loginI18n}>
        <MyComponent />
      </I18nProvider>
    </I18nProvider>
  );
};
```

### Trans Component

To insert React elements into the translation message:

```jsx
import { Trans, useTranslate } from "val-i18n-react";
import { I18n, I18nProvider } from "val-i18n";

const locales = {
  en: {
    author: "CRIMX",
    fruit: "apple",
    eat: "{{name}} eats {{fruit}}.",
  },
};

const i18n = new I18n("en", locales);

const MyComponent = () => {
  const t = useTranslate();

  return (
    <Trans message={t("eat")}>
      <strong data-t-slot="name">{t("author")}</strong>
      <i style={{ color: "red" }} data-t-slot="fruit">
        {t("fruit")}
      </i>
    </Trans>
  );
};

const App = () => {
  return (
    <I18nProvider i18n={i18n}>
      <MyComponent />
    </I18nProvider>
  );
};
```

↓Outputs:

```jsx
<>
  <strong data-t-slot="name">CRIMX</strong> eats <i style={{ color: "red" }} data-t-slot="fruit">apple</i>.
<>
```

`data-t-slot` can be ignored if there is only one placeholder.

```jsx
<Trans message="a{{b}}c">
  <h1>B</h1>
</Trans>
```

↓Outputs:

```jsx
<>
  a<h1>B</h1>c
</>
```
