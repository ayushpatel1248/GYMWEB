if(!self.define){let e,s={};const n=(n,a)=>(n=new URL(n+".js",a).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(a,i)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let c={};const o=e=>n(e,t),r={module:{uri:t},exports:c,require:o};s[t]=Promise.all(a.map((e=>r[e]||o(e)))).then((e=>(i(...e),c)))}}define(["./workbox-c2c0676f"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/b8sGVerbdz_oHlnIzJoXE/_buildManifest.js",revision:"d4d33bc01e62d48fc56668f903196478"},{url:"/_next/static/b8sGVerbdz_oHlnIzJoXE/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/150-840249dcf10fe9ee.js",revision:"b8sGVerbdz_oHlnIzJoXE"},{url:"/_next/static/chunks/176-0e07a306410c06b9.js",revision:"b8sGVerbdz_oHlnIzJoXE"},{url:"/_next/static/chunks/412-34602fa0c669413c.js",revision:"b8sGVerbdz_oHlnIzJoXE"},{url:"/_next/static/chunks/447-b3169b78d528d443.js",revision:"b8sGVerbdz_oHlnIzJoXE"},{url:"/_next/static/chunks/476-a497563b5671a33f.js",revision:"b8sGVerbdz_oHlnIzJoXE"},{url:"/_next/static/chunks/4bd1b696-699fd2ab225a549b.js",revision:"b8sGVerbdz_oHlnIzJoXE"},{url:"/_next/static/chunks/620-1339055a86fb1955.js",revision:"b8sGVerbdz_oHlnIzJoXE"},{url:"/_next/static/chunks/735.0efee747fa2d58e7.js",revision:"0efee747fa2d58e7"},{url:"/_next/static/chunks/756-d07191a6375ab11a.js",revision:"b8sGVerbdz_oHlnIzJoXE"},{url:"/_next/static/chunks/970-dcb12f37e4183c91.js",revision:"b8sGVerbdz_oHlnIzJoXE"},{url:"/_next/static/chunks/975-cefc8dde73896c1f.js",revision:"b8sGVerbdz_oHlnIzJoXE"},{url:"/_next/static/chunks/ad2866b8-af026b2225f375a8.js",revision:"b8sGVerbdz_oHlnIzJoXE"},{url:"/_next/static/chunks/app/AddPerson/page-e26a20cef6844361.js",revision:"b8sGVerbdz_oHlnIzJoXE"},{url:"/_next/static/chunks/app/LandingPage/page-de8a479fda2013b8.js",revision:"b8sGVerbdz_oHlnIzJoXE"},{url:"/_next/static/chunks/app/_not-found/page-de3ce620bfba9bcb.js",revision:"b8sGVerbdz_oHlnIzJoXE"},{url:"/_next/static/chunks/app/aboutPerson/page-4481d81f0cd04277.js",revision:"b8sGVerbdz_oHlnIzJoXE"},{url:"/_next/static/chunks/app/dashboard/page-6888dcdd0c071316.js",revision:"b8sGVerbdz_oHlnIzJoXE"},{url:"/_next/static/chunks/app/editpersoninfo/page-e11d8a9ba5518607.js",revision:"b8sGVerbdz_oHlnIzJoXE"},{url:"/_next/static/chunks/app/layout-03ce03003a5a3503.js",revision:"b8sGVerbdz_oHlnIzJoXE"},{url:"/_next/static/chunks/app/login/page-d9f6167a619b82d3.js",revision:"b8sGVerbdz_oHlnIzJoXE"},{url:"/_next/static/chunks/app/notpaid/page-d9206f2e9fe4c688.js",revision:"b8sGVerbdz_oHlnIzJoXE"},{url:"/_next/static/chunks/app/page-675c51ab2724b4ef.js",revision:"b8sGVerbdz_oHlnIzJoXE"},{url:"/_next/static/chunks/c16f53c3-dff2aa4787aab236.js",revision:"b8sGVerbdz_oHlnIzJoXE"},{url:"/_next/static/chunks/framework-58f97e80b1d6e3ea.js",revision:"b8sGVerbdz_oHlnIzJoXE"},{url:"/_next/static/chunks/main-1e3cddcad4c0ff07.js",revision:"b8sGVerbdz_oHlnIzJoXE"},{url:"/_next/static/chunks/main-app-f84aa7149497c555.js",revision:"b8sGVerbdz_oHlnIzJoXE"},{url:"/_next/static/chunks/pages/_app-abffdcde9d309a0c.js",revision:"b8sGVerbdz_oHlnIzJoXE"},{url:"/_next/static/chunks/pages/_error-94b8133dd8229633.js",revision:"b8sGVerbdz_oHlnIzJoXE"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-01154dd22c710dff.js",revision:"b8sGVerbdz_oHlnIzJoXE"},{url:"/_next/static/css/b232aad4588709cb.css",revision:"b232aad4588709cb"},{url:"/_next/static/css/ba661dc9a58531f3.css",revision:"ba661dc9a58531f3"},{url:"/_next/static/css/cda391f7bcc5db85.css",revision:"cda391f7bcc5db85"},{url:"/_next/static/media/4473ecc91f70f139-s.p.woff",revision:"78e6fc13ea317b55ab0bd6dc4849c110"},{url:"/_next/static/media/463dafcda517f24f-s.p.woff",revision:"cbeb6d2d96eaa268b4b5beb0b46d9632"},{url:"/_next/static/media/gymcirclelogo.60064559.png",revision:"39f72cf449419b904edfc946f30f5ed1"},{url:"/asseet/landingpage/gymcirclelogo.png",revision:"39f72cf449419b904edfc946f30f5ed1"},{url:"/asseet/landingpage/gymlogo.jpeg",revision:"6e1a206f7dd3413d493121bbb902edde"},{url:"/file.svg",revision:"d09f95206c3fa0bb9bd9fefabfd0ea71"},{url:"/icon512_maskable.png",revision:"432e102a334644ed3d9856691f93dc50"},{url:"/icon512_rounded.png",revision:"cd4fae1a3f51eb7e3d7f418e5dae083e"},{url:"/manifest.json",revision:"3e1a009897fa365cac145ae23e1f83e2"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/swe-worker-5c72df51bb1f6ee0.js",revision:"5a47d90db13bb1309b25bdf7b363570e"},{url:"/window.svg",revision:"a2760511c65806022ad20adf74370ff3"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:function(e){return _ref.apply(this,arguments)}}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/\/_next\/static.+\.js$/i,new e.CacheFirst({cacheName:"next-static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4|webm)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:48,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((function(e){var s=e.sameOrigin,n=e.url.pathname;return!(!s||n.startsWith("/api/auth/callback")||!n.startsWith("/api/"))}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((function(e){var s=e.request,n=e.url.pathname,a=e.sameOrigin;return"1"===s.headers.get("RSC")&&"1"===s.headers.get("Next-Router-Prefetch")&&a&&!n.startsWith("/api/")}),new e.NetworkFirst({cacheName:"pages-rsc-prefetch",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((function(e){var s=e.request,n=e.url.pathname,a=e.sameOrigin;return"1"===s.headers.get("RSC")&&a&&!n.startsWith("/api/")}),new e.NetworkFirst({cacheName:"pages-rsc",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((function(e){var s=e.url.pathname;return e.sameOrigin&&!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"pages",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((function(e){return!e.sameOrigin}),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET"),self.__WB_DISABLE_DEV_LOGS=!0}));
