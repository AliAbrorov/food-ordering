/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
};

module.exports = {
  async redirects() {
    return [
      // if the header `x-redirect-me` is present,
      // this redirect will be applied
      {
        source: "/:path((?!another-page$).*)",
        has: [
          {
            type: "header",
            key: "x-redirect-me",
          },
        ],
        permanent: false,
        destination: "/another-page",
      },
      // if the header `x-dont-redirect` is present,
      // this redirect will NOT be applied
      {
        source: "/:path((?!another-page$).*)",
        missing: [
          {
            type: "header",
            key: "x-do-not-redirect",
          },
        ],
        permanent: false,
        destination: "/another-page",
      },
      // if the source, query, and cookie are matched,
      // this redirect will be applied
      {
        source: "/specific/:path*",
        has: [
          {
            type: "query",
            key: "page",
            // the page value will not be available in the
            // destination since value is provided and doesn't
            // use a named capture group e.g. (?<page>home)
            value: "home",
          },
          {
            type: "cookie",
            key: "authorized",
            value: "true",
          },
        ],
        permanent: false,
        destination: "/another/:path*",
      },
      // if the header `x-authorized` is present and
      // contains a matching value, this redirect will be applied
      {
        source: "/",
        has: [
          {
            type: "header",
            key: "x-authorized",
            value: "(?<authorized>yes|true)",
          },
        ],
        permanent: false,
        destination: "/home?authorized=:authorized",
      },
      // if the host is `example.com`,
      // this redirect will be applied
      {
        source: "/:path((?!another-page$).*)",
        has: [
          {
            type: "host",
            value: "example.com",
          },
        ],
        permanent: false,
        destination: "/another-page",
      },
    ];
  },
};

module.exports = nextConfig;
