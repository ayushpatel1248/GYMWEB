if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,a)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let c={};const o=e=>i(e,t),r={module:{uri:t},exports:c,require:o};s[t]=Promise.all(n.map((e=>r[e]||o(e)))).then((e=>(a(...e),c)))}}define(["./workbox-c2c0676f"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/AWiPmbkWwNquopwvCAJqK/_buildManifest.js",revision:"da27be3aedc8535ec0808063f90cd618"},{url:"/_next/static/AWiPmbkWwNquopwvCAJqK/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/110-5dea9d97d9415560.js",revision:"AWiPmbkWwNquopwvCAJqK"},{url:"/_next/static/chunks/150-fa3fceaf934874a1.js",revision:"AWiPmbkWwNquopwvCAJqK"},{url:"/_next/static/chunks/176-b5a5d89e4fa47db1.js",revision:"AWiPmbkWwNquopwvCAJqK"},{url:"/_next/static/chunks/382-be0c1c635c3d8ea9.js",revision:"AWiPmbkWwNquopwvCAJqK"},{url:"/_next/static/chunks/414-293f66b2f765eb3e.js",revision:"AWiPmbkWwNquopwvCAJqK"},{url:"/_next/static/chunks/447-d5ebf9ee9b69df6a.js",revision:"AWiPmbkWwNquopwvCAJqK"},{url:"/_next/static/chunks/470-a62583393ed2041c.js",revision:"AWiPmbkWwNquopwvCAJqK"},{url:"/_next/static/chunks/476-bdf3980032cdf9f8.js",revision:"AWiPmbkWwNquopwvCAJqK"},{url:"/_next/static/chunks/4bd1b696-45da12f3de2ad218.js",revision:"AWiPmbkWwNquopwvCAJqK"},{url:"/_next/static/chunks/735.0efee747fa2d58e7.js",revision:"0efee747fa2d58e7"},{url:"/_next/static/chunks/830-190065b28eff3215.js",revision:"AWiPmbkWwNquopwvCAJqK"},{url:"/_next/static/chunks/965-9aa0f0534d8128d6.js",revision:"AWiPmbkWwNquopwvCAJqK"},{url:"/_next/static/chunks/97-da5a4fdc6f33c668.js",revision:"AWiPmbkWwNquopwvCAJqK"},{url:"/_next/static/chunks/ad2866b8-af026b2225f375a8.js",revision:"AWiPmbkWwNquopwvCAJqK"},{url:"/_next/static/chunks/app/AddPerson/page-296cf7b1ebf2e055.js",revision:"AWiPmbkWwNquopwvCAJqK"},{url:"/_next/static/chunks/app/LandingPage/page-d16d89af4a681a4a.js",revision:"AWiPmbkWwNquopwvCAJqK"},{url:"/_next/static/chunks/app/_not-found/page-ece8fffa741354eb.js",revision:"AWiPmbkWwNquopwvCAJqK"},{url:"/_next/static/chunks/app/aboutPerson/page-8c0ec8a34e94df13.js",revision:"AWiPmbkWwNquopwvCAJqK"},{url:"/_next/static/chunks/app/dashboard/page-5b5ec97f92ca4e26.js",revision:"AWiPmbkWwNquopwvCAJqK"},{url:"/_next/static/chunks/app/editpersoninfo/page-3dc47954ffaa0e82.js",revision:"AWiPmbkWwNquopwvCAJqK"},{url:"/_next/static/chunks/app/layout-07c124781bf672f1.js",revision:"AWiPmbkWwNquopwvCAJqK"},{url:"/_next/static/chunks/app/login/page-b16c23c5c9beeb25.js",revision:"AWiPmbkWwNquopwvCAJqK"},{url:"/_next/static/chunks/app/notification/page-8ba695f9f7b023de.js",revision:"AWiPmbkWwNquopwvCAJqK"},{url:"/_next/static/chunks/app/notpaid/page-5432010f89a2730b.js",revision:"AWiPmbkWwNquopwvCAJqK"},{url:"/_next/static/chunks/app/page-d96dc784ca0af7c4.js",revision:"AWiPmbkWwNquopwvCAJqK"},{url:"/_next/static/chunks/c16f53c3-cc32b9ca102b5b56.js",revision:"AWiPmbkWwNquopwvCAJqK"},{url:"/_next/static/chunks/framework-58f97e80b1d6e3ea.js",revision:"AWiPmbkWwNquopwvCAJqK"},{url:"/_next/static/chunks/main-26b7050494caae68.js",revision:"AWiPmbkWwNquopwvCAJqK"},{url:"/_next/static/chunks/main-app-17b8997564ba3cad.js",revision:"AWiPmbkWwNquopwvCAJqK"},{url:"/_next/static/chunks/pages/_app-abffdcde9d309a0c.js",revision:"AWiPmbkWwNquopwvCAJqK"},{url:"/_next/static/chunks/pages/_error-94b8133dd8229633.js",revision:"AWiPmbkWwNquopwvCAJqK"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-01154dd22c710dff.js",revision:"AWiPmbkWwNquopwvCAJqK"},{url:"/_next/static/css/b232aad4588709cb.css",revision:"b232aad4588709cb"},{url:"/_next/static/css/cda391f7bcc5db85.css",revision:"cda391f7bcc5db85"},{url:"/_next/static/css/ed527499821921bd.css",revision:"ed527499821921bd"},{url:"/_next/static/media/4473ecc91f70f139-s.p.woff",revision:"78e6fc13ea317b55ab0bd6dc4849c110"},{url:"/_next/static/media/463dafcda517f24f-s.p.woff",revision:"cbeb6d2d96eaa268b4b5beb0b46d9632"},{url:"/_next/static/media/gymcirclelogo.60064559.png",revision:"39f72cf449419b904edfc946f30f5ed1"},{url:"/asseet/landingpage/gymcirclelogo.png",revision:"39f72cf449419b904edfc946f30f5ed1"},{url:"/asseet/landingpage/gymlogo.jpeg",revision:"6e1a206f7dd3413d493121bbb902edde"},{url:"/file.svg",revision:"d09f95206c3fa0bb9bd9fefabfd0ea71"},{url:"/icon512_maskable.png",revision:"432e102a334644ed3d9856691f93dc50"},{url:"/icon512_rounded.png",revision:"cd4fae1a3f51eb7e3d7f418e5dae083e"},{url:"/manifest.json",revision:"3e1a009897fa365cac145ae23e1f83e2"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/swe-worker-5c72df51bb1f6ee0.js",revision:"5a47d90db13bb1309b25bdf7b363570e"},{url:"/window.svg",revision:"a2760511c65806022ad20adf74370ff3"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:function(e){return _ref.apply(this,arguments)}}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/\/_next\/static.+\.js$/i,new e.CacheFirst({cacheName:"next-static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4|webm)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:48,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((function(e){var s=e.sameOrigin,i=e.url.pathname;return!(!s||i.startsWith("/api/auth/callback")||!i.startsWith("/api/"))}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((function(e){var s=e.request,i=e.url.pathname,n=e.sameOrigin;return"1"===s.headers.get("RSC")&&"1"===s.headers.get("Next-Router-Prefetch")&&n&&!i.startsWith("/api/")}),new e.NetworkFirst({cacheName:"pages-rsc-prefetch",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((function(e){var s=e.request,i=e.url.pathname,n=e.sameOrigin;return"1"===s.headers.get("RSC")&&n&&!i.startsWith("/api/")}),new e.NetworkFirst({cacheName:"pages-rsc",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((function(e){var s=e.url.pathname;return e.sameOrigin&&!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"pages",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((function(e){return!e.sameOrigin}),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET"),self.__WB_DISABLE_DEV_LOGS=!0}));
