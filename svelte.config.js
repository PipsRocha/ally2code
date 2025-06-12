import adapter from '@sveltejs/adapter-static';

export default {
  kit: {
    adapter: adapter({
      fallback: 'index.html', // Important for SPAs with dynamic routes
      strict: false           // Avoid build errors for dynamic routes
    }),
    prerender: {
      entries: []             // Skip prerendering any route
    }
  }
};
