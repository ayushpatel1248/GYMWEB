if(!self.define){let e,s={};const a=(a,n)=>(a=new URL(a+".js",n).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(n,c)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let t={};const r=e=>a(e,i),o={module:{uri:i},exports:t,require:r};s[i]=Promise.all(n.map((e=>o[e]||r(e)))).then((e=>(c(...e),t)))}}define(["./workbox-c2c0676f"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/-a9XGjNqPNcxwOFdKHSRT/_buildManifest.js",revision:"dabe682aa0f693f65943dfee82b75167"},{url:"/_next/static/-a9XGjNqPNcxwOFdKHSRT/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/150-92959448dc693767.js",revision:"-a9XGjNqPNcxwOFdKHSRT"},{url:"/_next/static/chunks/198-441db1cba1a5228c.js",revision:"-a9XGjNqPNcxwOFdKHSRT"},{url:"/_next/static/chunks/296-5488f168d18d8fc3.js",revision:"-a9XGjNqPNcxwOFdKHSRT"},{url:"/_next/static/chunks/417-6e23c3f2f3e47e1a.js",revision:"-a9XGjNqPNcxwOFdKHSRT"},{url:"/_next/static/chunks/447-a17375294c3c13e4.js",revision:"-a9XGjNqPNcxwOFdKHSRT"},{url:"/_next/static/chunks/478-6d4b575ea28f2cce.js",revision:"-a9XGjNqPNcxwOFdKHSRT"},{url:"/_next/static/chunks/498-47ba2dc8e82799b5.js",revision:"-a9XGjNqPNcxwOFdKHSRT"},{url:"/_next/static/chunks/4bd1b696-fa8a7db91fb808a1.js",revision:"-a9XGjNqPNcxwOFdKHSRT"},{url:"/_next/static/chunks/725-ffad363dd052f599.js",revision:"-a9XGjNqPNcxwOFdKHSRT"},{url:"/_next/static/chunks/735.6e9c7e96f28c50e2.js",revision:"6e9c7e96f28c50e2"},{url:"/_next/static/chunks/app/AddPerson/page-fd7f793b68fff9a7.js",revision:"-a9XGjNqPNcxwOFdKHSRT"},{url:"/_next/static/chunks/app/LandingPage/page-772a1ff2efd202aa.js",revision:"-a9XGjNqPNcxwOFdKHSRT"},{url:"/_next/static/chunks/app/_not-found/page-fcb19de8356281f9.js",revision:"-a9XGjNqPNcxwOFdKHSRT"},{url:"/_next/static/chunks/app/aboutPerson/page-c112e1c5ead98288.js",revision:"-a9XGjNqPNcxwOFdKHSRT"},{url:"/_next/static/chunks/app/layout-11b0ebf623adbe13.js",revision:"-a9XGjNqPNcxwOFdKHSRT"},{url:"/_next/static/chunks/app/login/page-49a88e5b0f506067.js",revision:"-a9XGjNqPNcxwOFdKHSRT"},{url:"/_next/static/chunks/app/page-30bd62498dc6fa65.js",revision:"-a9XGjNqPNcxwOFdKHSRT"},{url:"/_next/static/chunks/c16f53c3-d969d78ae7631729.js",revision:"-a9XGjNqPNcxwOFdKHSRT"},{url:"/_next/static/chunks/framework-d29117d969504448.js",revision:"-a9XGjNqPNcxwOFdKHSRT"},{url:"/_next/static/chunks/main-57285d93c6b307c4.js",revision:"-a9XGjNqPNcxwOFdKHSRT"},{url:"/_next/static/chunks/main-app-60b2dd039357fe6d.js",revision:"-a9XGjNqPNcxwOFdKHSRT"},{url:"/_next/static/chunks/pages/_app-d23763e3e6c904ff.js",revision:"-a9XGjNqPNcxwOFdKHSRT"},{url:"/_next/static/chunks/pages/_error-9b7125ad1a1e68fa.js",revision:"-a9XGjNqPNcxwOFdKHSRT"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-8a9caac115cc9c6f.js",revision:"-a9XGjNqPNcxwOFdKHSRT"},{url:"/_next/static/css/281ca23b4e7fb7d6.css",revision:"281ca23b4e7fb7d6"},{url:"/_next/static/css/b232aad4588709cb.css",revision:"b232aad4588709cb"},{url:"/_next/static/media/4473ecc91f70f139-s.p.woff",revision:"78e6fc13ea317b55ab0bd6dc4849c110"},{url:"/_next/static/media/463dafcda517f24f-s.p.woff",revision:"cbeb6d2d96eaa268b4b5beb0b46d9632"},{url:"/file.svg",revision:"d09f95206c3fa0bb9bd9fefabfd0ea71"},{url:"/globe.svg",revision:"2aaafa6a49b6563925fe440891e32717"},{url:"/icon512_maskable.png",revision:"dcb1cf9b42aec55bf5702bd527baed8a"},{url:"/icon512_rounded.png",revision:"cd4fae1a3f51eb7e3d7f418e5dae083e"},{url:"/manifest.json",revision:"63e7ea28c7b7c0a5e2fd8f6d3faedd4b"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/swe-worker-5c72df51bb1f6ee0.js",revision:"5a47d90db13bb1309b25bdf7b363570e"},{url:"/window.svg",revision:"a2760511c65806022ad20adf74370ff3"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:function(e){return _ref.apply(this,arguments)}}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/\/_next\/static.+\.js$/i,new e.CacheFirst({cacheName:"next-static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4|webm)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:48,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((function(e){var s=e.sameOrigin,a=e.url.pathname;return!(!s||a.startsWith("/api/auth/callback")||!a.startsWith("/api/"))}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((function(e){var s=e.request,a=e.url.pathname,n=e.sameOrigin;return"1"===s.headers.get("RSC")&&"1"===s.headers.get("Next-Router-Prefetch")&&n&&!a.startsWith("/api/")}),new e.NetworkFirst({cacheName:"pages-rsc-prefetch",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((function(e){var s=e.request,a=e.url.pathname,n=e.sameOrigin;return"1"===s.headers.get("RSC")&&n&&!a.startsWith("/api/")}),new e.NetworkFirst({cacheName:"pages-rsc",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((function(e){var s=e.url.pathname;return e.sameOrigin&&!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"pages",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((function(e){return!e.sameOrigin}),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET"),self.__WB_DISABLE_DEV_LOGS=!0}));