import fetch from 'cross-fetch';

export default function makeApiCall (url, method, apiPayload) {
  // This will not be accessible past the workshop date
  const oAuthProxyUrl = 'https://play-oauth-proxy.global.ssl.fastly.net/api/defaultCreds';
  const options = {
    method: 'POST',
    body: JSON.stringify({
      apiCall: url,
      method,
      apiCallData: apiPayload
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  };

  return fetch(oAuthProxyUrl, options)
    .then(
      response => response.json(),

      // Do not use catch, because that will also catch
      // any errors in the dispatch and resulting render,
      // causing a loop of 'Unexpected batch number' errors.
      // https://github.com/facebook/react/issues/6895
      error => console.error('ERROR', error)
    );
};

export function makeS3Call (signedUrl, options) {
  return fetch(signedUrl, options)
};
