import { useEffect } from 'react'

const ensureMetaTag = (name, attribute = 'name') => {
  let element = document.head.querySelector(`meta[${attribute}="${name}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, name)
    document.head.appendChild(element)
  }
  return element
}

const ensureLinkTag = (rel) => {
  let element = document.head.querySelector(`link[rel="${rel}"]`)
  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', rel)
    document.head.appendChild(element)
  }
  return element
}

export function usePageMetadata({
  title,
  description,
  keywords,
  canonicalPath,
  structuredData,
}) {
  useEffect(() => {
    if (title) {
      document.title = title
      const ogTitle = ensureMetaTag('og:title', 'property')
      ogTitle.setAttribute('content', title)
      const twitterTitle = ensureMetaTag('twitter:title', 'name')
      twitterTitle.setAttribute('content', title)
    }

    if (description) {
      const descriptionTag = ensureMetaTag('description')
      descriptionTag.setAttribute('content', description)
      const ogDescription = ensureMetaTag('og:description', 'property')
      ogDescription.setAttribute('content', description)
      const twitterDescription = ensureMetaTag('twitter:description', 'name')
      twitterDescription.setAttribute('content', description)
    }

    if (keywords) {
      const keywordsTag = ensureMetaTag('keywords')
      keywordsTag.setAttribute('content', keywords)
    }

    const canonicalUrl = canonicalPath
      ? new URL(canonicalPath, window.location.origin).href
      : window.location.href
    const canonicalLink = ensureLinkTag('canonical')
    canonicalLink.setAttribute('href', canonicalUrl)

    const ogUrl = ensureMetaTag('og:url', 'property')
    ogUrl.setAttribute('content', canonicalUrl)

    const twitterCard = ensureMetaTag('twitter:card', 'name')
    twitterCard.setAttribute('content', 'summary_large_image')

    let jsonLdTag = document.head.querySelector('script[data-managed="seo-jsonld"]')
    if (structuredData) {
      if (!jsonLdTag) {
        jsonLdTag = document.createElement('script')
        jsonLdTag.type = 'application/ld+json'
        jsonLdTag.dataset.managed = 'seo-jsonld'
        document.head.appendChild(jsonLdTag)
      }
      jsonLdTag.textContent = JSON.stringify(structuredData)
    } else if (jsonLdTag) {
      jsonLdTag.remove()
    }

    return () => {
      if (structuredData) {
        const tag = document.head.querySelector('script[data-managed="seo-jsonld"]')
        if (tag) {
          tag.remove()
        }
      }
    }
  }, [title, description, keywords, canonicalPath, structuredData])
}
