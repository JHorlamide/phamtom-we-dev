const withOffline = require("next-offline");

module.exports = withOffline({
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    domains: [
      "res.cloudinary.com"
    ]
  },
  target: "serverless",
  workboxOpts: {
    swDest: "static/service-worker.js",
    runtimeCaching: [
      {
        urlPattern: /^https?.*/,
        handler: "NetworkFirst",
        options: {
          cacheName: "offlineCache",
          expiration: {
            maxEntries: 200
          }
        }
      }
    ]
  }
});

// module.exports = {
//   reactStrictMode: false,
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
//   images: {
//     domains: [
//       'res.cloudinary.com'
//     ],
//   },
// }
