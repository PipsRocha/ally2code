import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.C6waO09Y.js","_app/immutable/chunks/disclose-version.x_RuEKz0.js","_app/immutable/chunks/index-client.CSA-ezjU.js","_app/immutable/chunks/legacy.B6uQwCwU.js","_app/immutable/chunks/slot.DY60tyFc.js"];
export const stylesheets = ["_app/immutable/assets/0.Cnw2AYHo.css"];
export const fonts = [];
