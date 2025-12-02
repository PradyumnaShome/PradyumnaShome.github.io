module.exports = {
  siteMetadata: {
    title: 'Pradyumna Shome',
    description: `Co-Founder and Founding Engineer at Playful, where ideas come to play.`,
    author: `Pradyumna Shome`,
    siteUrl: `https://pradyumnashome.com`,
    image: `/images/pradyumna-shome.webp`,
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        icon: 'static/images/pradyumna-shome.webp',
        start_url: '/',
        background_color: '#f4f0bb',
        theme_color: '#226f54',
        display: 'minimal-ui',
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          "G-KSBE5VH4EL", // Google Analytics / GA
        ],
        // This object is used for configuration specific to this plugin
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: true,
        },
      },
    },
    'gatsby-plugin-sass',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-offline',
    {
      resolve: `gatsby-plugin-s3`,
      options: {
        bucketName: "pradyumnashome.com",
        acl: null,
        region: 'us-east-1',
        protocol: "https",
        hostname: "pradyumnashome.com",
      },
    }
  ],
}
