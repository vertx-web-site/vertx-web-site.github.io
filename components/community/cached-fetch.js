const cacache = require("cacache")
const nodeFetch = require("node-fetch")

export function CachedFetch({ cachePath, cacheTimeoutSeconds }) {
  return async function fetch(url, opts) {
    // check if we've got a cached response for this URL
    let info = await cacache.get.info(cachePath, url)

    if (info !== null && info.metadata !== undefined &&
        info.metadata.headers !== undefined &&
        info.metadata.headers.etag !== undefined &&
        info.metadata.headers.etag.length > 0) {
      // we found a cached response and an etag
      // check if we can read the response locally
      let readFromCache = false
      let updateCache = false
      let elapsedSeconds = (new Date() - info.time) / 1000
      if (elapsedSeconds < cacheTimeoutSeconds) {
        readFromCache = true
      } else {
        // make a conditional request
        let etag = info.metadata.headers.etag[0]
        let conditionalResponse = await nodeFetch(url, {
          ...opts,
          headers: {
            ...opts.headers,
            "If-None-Match": etag
          }
        })

        // check if the content has not been modified on the server
        readFromCache = conditionalResponse.status === 304

        updateCache = true
      }

      if (readFromCache) {
        let cachedResponse = await cacache.get(cachePath, url)
        let body = cachedResponse.data
        let headers = cachedResponse.metadata.headers

        // update cache
        if (updateCache) {
          await cacache.put(cachePath, url, body, { metadata: { headers } })
        }

        return new nodeFetch.Response(body, { status: 200, headers })
      }
    }

    // perform fresh request
    let response = await nodeFetch(url, opts)

    // store response in cache if possible
    if (response.status === 200 && response.headers.get("etag")) {
      let body = await response.text()
      let headers = response.headers.raw()
      await cacache.put(cachePath, url, body, { metadata: { headers } })

      // create a new in-memory response because we already consumed the read stream
      response = new nodeFetch.Response(body, response)
    }

    return response
  }
}
