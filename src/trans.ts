import {
  FC,
  PropsWithChildren,
  isValidElement,
  ReactNode,
  useMemo,
  Fragment,
  createElement,
} from "react";

export interface TProps {
  /** Locale translation message */
  message: string;
}

/**
 * Insert React elements to the translation message.
 *
 * @example
 * ```jsx
 * <Trans message="a{{b}}c{{d}}e">
 *   <h1 data-t-slot="b">B</h1>
 *   <p data-t-slot="d">D</p>
 * </Trans>
 * ```
 *  ↓
 * ```jsx
 * <>
 *   a<h1 data-t-slot="b">B</h1>c<p data-t-slot="d">D</p>e
 * <>
 * ```
 *
 * `data-t-slot` can be ignored if there is only one placeholder.
 *
 * @example
 * ```jsx
 * <Trans message="a{{b}}c">
 *   <h1>B</h1>
 * </Trans>
 * ```
 *  ↓
 * ```jsx
 * <>
 *   a<h1>B</h1>c
 * </>
 * ```
 */
export const Trans: FC<PropsWithChildren<TProps>> = ({ message, children }) => {
  if (!message) return null;

  const slices = useMemo(() => {
    const slices: string[] = [];
    const matchArgs = /{{(\S+?)}}/gi;
    let slice: RegExpExecArray | null;
    let pointer = 0;
    while ((slice = matchArgs.exec(message))) {
      slices.push(message.slice(pointer, slice.index), slice[1]);
      pointer = slice.index + slice[0].length;
    }
    slices.push(message.slice(pointer));
    return slices;
  }, [message]);

  const slots: Record<string, ReactNode> = {};
  let hasSlot = false;

  for (const child of Array.isArray(children) ? children : [children]) {
    if (isValidElement(child)) {
      const key = (child.props as any)["data-t-slot"];
      if (key) {
        slots[key] = child;
        hasSlot = true;
      }
    }
  }

  const copy: ReactNode[] = slices.slice();
  if (hasSlot) {
    for (let i = 1; i < copy.length; i += 2) {
      copy[i] = slots[slices[i]] || `{{${slices[i]}}}`;
    }
  } else {
    copy[1] = children;
  }
  return createElement(Fragment, null, copy);
};
