import { V as noop, W as escape_html, S as pop, Q as push } from "../../chunks/index.js";
import "../../chunks/exports.js";
import "vite-plugin-node-polyfills/shims/buffer";
import { w as writable } from "../../chunks/index2.js";
const SNAPSHOT_KEY = "sveltekit:snapshot";
const SCROLL_KEY = "sveltekit:scroll";
function notifiable_store(value) {
  const store = writable(value);
  let ready = true;
  function notify() {
    ready = true;
    store.update((val) => val);
  }
  function set(new_value) {
    ready = false;
    store.set(new_value);
  }
  function subscribe(run) {
    let old_value;
    return store.subscribe((new_value) => {
      if (old_value === void 0 || ready && new_value !== old_value) {
        run(old_value = new_value);
      }
    });
  }
  return { notify, set, subscribe };
}
function create_updated_store() {
  const { set, subscribe } = writable(false);
  {
    return {
      subscribe,
      // eslint-disable-next-line @typescript-eslint/require-await
      check: async () => false
    };
  }
}
let page$1;
let updated;
const is_legacy = noop.toString().includes("$$") || /function \w+\(\) \{\}/.test(noop.toString());
if (is_legacy) {
  page$1 = {
    data: {},
    form: null,
    error: null,
    params: {},
    route: { id: null },
    state: {},
    status: -1,
    url: new URL("https://example.com")
  };
  updated = { current: false };
} else {
  page$1 = new class Page {
    data = {};
    form = null;
    error = null;
    params = {};
    route = { id: null };
    state = {};
    status = -1;
    url = new URL("https://example.com");
  }();
  updated = new class Updated {
    current = false;
  }();
}
function get(key, parse = JSON.parse) {
  try {
    return parse(sessionStorage[key]);
  } catch {
  }
}
get(SCROLL_KEY) ?? {};
get(SNAPSHOT_KEY) ?? {};
const stores = {
  url: /* @__PURE__ */ notifiable_store({}),
  page: /* @__PURE__ */ notifiable_store({}),
  navigating: /* @__PURE__ */ writable(
    /** @type {import('@sveltejs/kit').Navigation | null} */
    null
  ),
  updated: /* @__PURE__ */ create_updated_store()
};
const page = {
  get data() {
    return page$1.data;
  },
  get error() {
    return page$1.error;
  },
  get form() {
    return page$1.form;
  },
  get params() {
    return page$1.params;
  },
  get route() {
    return page$1.route;
  },
  get state() {
    return page$1.state;
  },
  get status() {
    return page$1.status;
  },
  get url() {
    return page$1.url;
  }
};
({
  get current() {
    return updated.current;
  },
  check: stores.updated.check
});
function Error$1($$payload, $$props) {
  push();
  $$payload.out += `<h1>${escape_html(page.status)}</h1> <p>${escape_html(page.error?.message)}</p>`;
  pop();
}
export {
  Error$1 as default
};
