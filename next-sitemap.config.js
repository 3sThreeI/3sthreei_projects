
module.exports = {
  siteUrl: 'https://3sthreei.com',
  generateRobotsTxt: true,

  // Force include homepage
  additionalPaths: async () => {
    return [
      {
        loc: '/',
        changefreq: 'daily',
        priority: 1.0,
      },
    ]
  },
}