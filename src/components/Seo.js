import React from 'react'
import Helmet from 'react-helmet'

const origin = 'https://pradyumnashome.com'
const personId = `${origin}/#person`
const person = {
  '@type': 'Person',
  '@id': personId,
  name: 'Pradyumna Shome',
  url: `${origin}/`,
  image: `${origin}/images/pradyumna-shome.jpeg`,
  jobTitle: 'Co-Founder and Founding Engineer',
  worksFor: { '@type': 'Organization', name: 'Playful', url: 'https://playfuldesign.app/' },
  sameAs: [
    'https://linkedin.com/in/pradyumna-shome',
    'https://github.com/PradyumnaShome',
    'https://x.com/PradyumnaShome',
    'https://mastodon.social/@PradyumnaShome',
    'https://scholar.google.com/citations?user=om4Ot2kAAAAJ',
  ],
}

export default function Seo({ title, description, path = '/', collection = false }) {
  const url = `${origin}${path}`
  const graph = [
    person,
    { '@type': 'WebSite', '@id': `${origin}/#website`, name: 'Pradyumna Shome', url: `${origin}/` },
    {
      '@type': collection ? 'CollectionPage' : 'ProfilePage',
      '@id': `${url}#webpage`, url, name: title, description,
      isPartOf: { '@id': `${origin}/#website` },
      ...(collection ? { about: { '@id': personId } } : { mainEntity: { '@id': personId } }),
      inLanguage: 'en',
    },
    ...(collection ? [{
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${origin}/` },
        { '@type': 'ListItem', position: 2, name: 'Cooking', item: url },
      ],
    }] : []),
  ]

  return <Helmet htmlAttributes={{ lang: 'en' }} title={title}>
    <meta name="description" content={description} />
    <link rel="canonical" href={url} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={url} />
    <meta property="og:image" content={`${origin}/images/pradyumna-shome.jpeg`} />
    <meta property="og:image:alt" content="Pradyumna Shome" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={`${origin}/images/pradyumna-shome.jpeg`} />
    <script type="application/ld+json">{JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c')}</script>
  </Helmet>
}
