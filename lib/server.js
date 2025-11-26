import { renderJSX } from 'astro/runtime/server/index.js';
import { jsx } from 'astro/jsx-runtime';

export async function check() {
  return true;
}

export async function renderToStaticMarkup(
  Component,
  props = {},
  { default: children = null, ...slotted } = {},
) {
  const slots = {};
  for (const [key, value] of Object.entries(slotted)) {
    const name = slotName(key);
    slots[name] = value;
  }

  const { result } = this;

  const html = await renderJSX(result, jsx(Component, { ...props, ...slots, children }));
  return { html };
}

const renderer = {
  name: 'astro:jsx',
  check,
  renderToStaticMarkup,
};

export default renderer;
