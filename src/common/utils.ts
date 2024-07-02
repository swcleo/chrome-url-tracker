export function isEncoded(url: string) {
  const regex = /%[0-9A-Fa-f]{2}/g
  return regex.test(url)
}

export function decodeUrl(url: string) {
  let decodedUrl = url
  while (isEncoded(decodedUrl)) {
    decodedUrl = decodeURIComponent(decodedUrl)
  }
  return decodedUrl
}

export function extractDomain(url: string) {
  let domain
  if (url.indexOf('://') > -1) {
    domain = url.split('/')[2]
  } else {
    domain = url.split('/')[0]
  }
  domain = domain.split(':')[0]
  return domain
}
