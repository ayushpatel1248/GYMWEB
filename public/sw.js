if(!self.define){let e,s={};const n=(n,t)=>(n=new URL(n+".js",t).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(t,c)=>{const a=e||("document"in self?document.currentScript.src:"")||location.href;if(s[a])return;let i={};const r=e=>n(e,a),o={module:{uri:a},exports:i,require:r};s[a]=Promise.all(t.map((e=>o[e]||r(e)))).then((e=>(c(...e),i)))}}define(["./workbox-c2c0676f"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/-XtQrMRsK9-SeYU8FD5ce/_buildManifest.js",revision:"4f9a8207916dcebe9658eaf0d36dcbe7"},{url:"/_next/static/-XtQrMRsK9-SeYU8FD5ce/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/150-92959448dc693767.js",revision:"-XtQrMRsK9-SeYU8FD5ce"},{url:"/_next/static/chunks/198-441db1cba1a5228c.js",revision:"-XtQrMRsK9-SeYU8FD5ce"},{url:"/_next/static/chunks/296-5488f168d18d8fc3.js",revision:"-XtQrMRsK9-SeYU8FD5ce"},{url:"/_next/static/chunks/390-b147864d6b10c21b.js",revision:"-XtQrMRsK9-SeYU8FD5ce"},{url:"/_next/static/chunks/447-a17375294c3c13e4.js",revision:"-XtQrMRsK9-SeYU8FD5ce"},{url:"/_next/static/chunks/498-47ba2dc8e82799b5.js",revision:"-XtQrMRsK9-SeYU8FD5ce"},{url:"/_next/static/chunks/4bd1b696-fa8a7db91fb808a1.js",revision:"-XtQrMRsK9-SeYU8FD5ce"},{url:"/_next/static/chunks/725-ffad363dd052f599.js",revision:"-XtQrMRsK9-SeYU8FD5ce"},{url:"/_next/static/chunks/735.6e9c7e96f28c50e2.js",revision:"6e9c7e96f28c50e2"},{url:"/_next/static/chunks/859-03f036d788889d20.js",revision:"-XtQrMRsK9-SeYU8FD5ce"},{url:"/_next/static/chunks/97-45edd84e48ea7744.js",revision:"-XtQrMRsK9-SeYU8FD5ce"},{url:"/_next/static/chunks/app/AddPerson/page-3140f6df58cb10c3.js",revision:"-XtQrMRsK9-SeYU8FD5ce"},{url:"/_next/static/chunks/app/LandingPage/page-93b00aa89f19c0c1.js",revision:"-XtQrMRsK9-SeYU8FD5ce"},{url:"/_next/static/chunks/app/_not-found/page-fcb19de8356281f9.js",revision:"-XtQrMRsK9-SeYU8FD5ce"},{url:"/_next/static/chunks/app/aboutPerson/page-9f457530f0286375.js",revision:"-XtQrMRsK9-SeYU8FD5ce"},{url:"/_next/static/chunks/app/editpersoninfo/page-6cb3ca2f1834a00a.js",revision:"-XtQrMRsK9-SeYU8FD5ce"},{url:"/_next/static/chunks/app/layout-26d07598041bbc6e.js",revision:"-XtQrMRsK9-SeYU8FD5ce"},{url:"/_next/static/chunks/app/login/page-2276317ba95a2f2a.js",revision:"-XtQrMRsK9-SeYU8FD5ce"},{url:"/_next/static/chunks/app/notpaid/page-7523ee1d9b261c98.js",revision:"-XtQrMRsK9-SeYU8FD5ce"},{url:"/_next/static/chunks/app/page-8a0959d45b57c1bc.js",revision:"-XtQrMRsK9-SeYU8FD5ce"},{url:"/_next/static/chunks/c16f53c3-d969d78ae7631729.js",revision:"-XtQrMRsK9-SeYU8FD5ce"},{url:"/_next/static/chunks/framework-d29117d969504448.js",revision:"-XtQrMRsK9-SeYU8FD5ce"},{url:"/_next/static/chunks/main-57285d93c6b307c4.js",revision:"-XtQrMRsK9-SeYU8FD5ce"},{url:"/_next/static/chunks/main-app-2d99c4a6de18fa12.js",revision:"-XtQrMRsK9-SeYU8FD5ce"},{url:"/_next/static/chunks/pages/_app-d23763e3e6c904ff.js",revision:"-XtQrMRsK9-SeYU8FD5ce"},{url:"/_next/static/chunks/pages/_error-9b7125ad1a1e68fa.js",revision:"-XtQrMRsK9-SeYU8FD5ce"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-8a9caac115cc9c6f.js",revision:"-XtQrMRsK9-SeYU8FD5ce"},{url:"/_next/static/css/55b2e6f5be312cea.css",revision:"55b2e6f5be312cea"},{url:"/_next/static/css/b232aad4588709cb.css",revision:"b232aad4588709cb"},{url:"/_next/static/media/4473ecc91f70f139-s.p.woff",revision:"78e6fc13ea317b55ab0bd6dc4849c110"},{url:"/_next/static/media/463dafcda517f24f-s.p.woff",revision:"cbeb6d2d96eaa268b4b5beb0b46d9632"},{url:"/asseet/landingpage/gymlogo.jpeg",revision:"6e1a206f7dd3413d493121bbb902edde"},{url:"/file.svg",revision:"d09f95206c3fa0bb9bd9fefabfd0ea71"},{url:"/icon512_maskable.png",revision:"432e102a334644ed3d9856691f93dc50"},{url:"/icon512_rounded.png",revision:"cd4fae1a3f51eb7e3d7f418e5dae083e"},{url:"/manifest.json",revision:"3e1a009897fa365cac145ae23e1f83e2"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/swe-worker-5c72df51bb1f6ee0.js",revision:"5a47d90db13bb1309b25bdf7b363570e"},{url:"/window.svg",revision:"a2760511c65806022ad20adf74370ff3"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:function(e){return _ref.apply(this,arguments)}}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/\/_next\/static.+\.js$/i,new e.CacheFirst({cacheName:"next-static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4|webm)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:48,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((function(e){var s=e.sameOrigin,n=e.url.pathname;return!(!s||n.startsWith("/api/auth/callback")||!n.startsWith("/api/"))}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((function(e){var s=e.request,n=e.url.pathname,t=e.sameOrigin;return"1"===s.headers.get("RSC")&&"1"===s.headers.get("Next-Router-Prefetch")&&t&&!n.startsWith("/api/")}),new e.NetworkFirst({cacheName:"pages-rsc-prefetch",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((function(e){var s=e.request,n=e.url.pathname,t=e.sameOrigin;return"1"===s.headers.get("RSC")&&t&&!n.startsWith("/api/")}),new e.NetworkFirst({cacheName:"pages-rsc",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((function(e){var s=e.url.pathname;return e.sameOrigin&&!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"pages",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((function(e){return!e.sameOrigin}),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET"),self.__WB_DISABLE_DEV_LOGS=!0}));
