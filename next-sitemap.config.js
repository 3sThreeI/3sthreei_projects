
module.exports = {
  siteUrl: 'https://3sthreei.com',
  generateRobotsTxt: true,

  // Force include homepage
    alternateRefs: [
    {
      href: 'https://3sthreei.com/en',
      hreflang: 'en',
    },
    {
      href: 'https://3sthreei.com/fr',
      hreflang: 'fr',
    },
  ],
  additionalPaths: async () => [
    { loc: '/en', priority: 1 },
    { loc: '/fr', priority: 1 },
  ],
}