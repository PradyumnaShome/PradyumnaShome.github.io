module.exports = {
  siteMetadata: {
		title: 'Pradyumna Shome',
    description: ``,
    author: `Pradyumna Shome`,
		siteUrl: `https://pradyumnashome.com`,
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
      },
    },
    'gatsby-plugin-sass',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-offline'
  ],
}
