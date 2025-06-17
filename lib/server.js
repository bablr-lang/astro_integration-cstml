export function renderToStaticMarkup (
  Component,
  props,
  { default: children = null, ...slotted } = {},
) {
  const { result } = this;

  let html = '';

  console.log(result);
  debugger;

  return { html };
}

export default {
  name: 'astro:cstml',
  renderToStaticMarkup, 
};