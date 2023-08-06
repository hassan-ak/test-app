# Middleware (Execution Order)

Middleware will be invoked for every route in your project. The following is the execution order:

1. `headers` from `next.config.js`
   - In your `next.config.js` file, you can define `headers` to customize the HTTP headers of your responses. These headers are applied to every request that matches the configuration. For example, you can set caching headers, security-related headers, or any other custom headers you need for your application.
2. `redirects` from `next.config.js`
   - in `next.config.js`, you can define `redirects` to configure URL redirections. This allows you to specify specific URL paths and their corresponding redirect destinations. When a request matches a configured redirect, Next.js will automatically redirect the client to the specified destination URL.
3. Middleware (`rewrites`, `redirects`, etc.)
   - After processing the headers and redirects from the `next.config.js`, Next.js will execute your custom middleware functions. These middleware functions can perform various tasks, including URL rewrites, additional redirects, authentication, logging, and any other custom logic you need to execute before the request reaches the actual route handler.
4. `beforeFiles` (`rewrites`) from `next.config.js`
   - The `beforeFiles` configuration in `next.config.js` allows you to define URL rewrites that apply before handling the filesystem routes. You can use this to modify incoming request URLs before they are processed by the filesystem routes.
5. Filesystem routes `(public/`, `_next/static/`, `pages/`, `app/`, etc.)
   - Next.js will process the filesystem routes, including the `public/` directory for static assets, the `_next/static/` directory for Next.js build outputs, the `pages/` directory for your Next.js pages, and any custom server entry points in the `app/` directory.
6. afterFiles (rewrites) from next.config.js
   - The `afterFiles` configuration in `next.config.js` allows you to define URL rewrites that apply after handling the filesystem routes. You can use this to modify outgoing response URLs or handle certain requests differently based on their processed filesystem routes.
7. Dynamic Routes (`/blog/[slug]`)
   - Next.js will handle dynamic routes based on the defined patterns, such as `[slug]`, which matches dynamic segments in the URL. Dynamic routes allow you to create flexible pages that can handle various parameter values.
8. `fallback` (`rewrites`) from `next.config.js`
   - the `fallback` configuration in `next.config.js` allows you to define URL rewrites that apply after handling dynamic routes. This provides an additional opportunity to modify or handle certain requests differently based on their dynamic route processing.
