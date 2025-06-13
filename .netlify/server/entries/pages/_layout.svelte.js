import { T as slot, S as pop, Q as push } from "../../chunks/index.js";
function _layout($$payload, $$props) {
  push();
  $$payload.out += `<!---->`;
  slot($$payload, $$props, "default", {}, null);
  $$payload.out += `<!---->`;
  pop();
}
export {
  _layout as default
};
