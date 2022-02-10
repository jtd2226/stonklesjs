import { createElement, cloneElement } from 'react';

export function css([string]) {
  const css_json = `{"${string
    .trim()
    .split('\n')
    .join('')
    .split(';')
    .join('", "')
    .split(': ')
    .join('": "')
    .slice(0, -4)}"}`;

  const obj = JSON.parse(css_json);

  const keyValues = Object.keys(obj).map(key => {
    const camelCased = key.replace(/-[a-z]/g, g => g[1].toUpperCase());
    return { [camelCased]: obj[key] };
  });

  return Object.assign({}, ...keyValues);
}

const factory =
  E =>
  args =>
  (props = {}) => {
    const style = css(Array.isArray(args) ? args : [args(props)]);
    if (typeof E === 'string') {
      return createElement(E, {
        style: { ...style, ...props.style },
        ...props,
      });
    } else {
      const Ele = E();
      return cloneElement(Ele, {
        style: { ...Ele.props.style, ...style, ...props.style },
        ...props,
      });
    }
  };

export const styled = new Proxy(
  function () {
    return { css };
  },
  {
    apply(target, _, args) {
      return factory(...args);
    },
    get(target, key) {
      return target()[key] ?? factory(key);
    },
  }
);

export default styled;
