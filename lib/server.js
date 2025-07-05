export function renderToStaticMarkup(
  Component,
  props,
  { default: children = null, ...slotted } = {},
) {
  const { result } = this;

  let html = new HTMLString('<html><meta charset="utf8"><body>HI</body></html>');

  throw new Error('not implemented');

  return { html };
}

export default {
  name: 'astro:cstml',
  renderToStaticMarkup,
};
