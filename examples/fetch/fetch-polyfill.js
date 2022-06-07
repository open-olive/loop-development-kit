import { network } from '@oliveai/ldk';
import { Request, Response } from 'whatwg-fetch';

// The following could be used to enhance the capabilities of the whatwg-fetch
// (Make sure to polyfill them before importing whatwg-fetch so it picks up the new objects)
//       EventTarget Polyfill
//       ReadableStream Polyfill
//       FormData polyfill
//       Blob Polyfill - This is probably the most impactful polyfill in terms of handling data

async function whatwgRequest2AptitudeRequest(whatWGrequest) {
  // The aptitude request headers need to be in the format of: { headerName: [values] }
  let aptitudeHeaders = null;
  if (whatWGrequest.headers) {
    aptitudeHeaders = {};
    whatWGrequest.headers.forEach((value, name) => {
      aptitudeHeaders[name] = value.split(', ');
    });
  }

  // Network Aptitude takes a Uint8Array
  let body = null;
  if (whatWGrequest.body) {
    body = await body.arrayBuffer();
  }

  return {
    url: whatWGrequest.url,
    method: whatWGrequest.method,
    body: body,
    headers: aptitudeHeaders,
    timeoutMs: whatWGrequest.timeoutMs,
  };
}

function aptitudeResponse2WhatwgResponse(aptitudeResponse) {
  // The response object requires each header key to have a single value string in the format of "value1, value2, value3 ...."
  // headers.append will automatically generate the string for us
  const aptitudeHeaders = aptitudeResponse.headers;
  const headers = new Headers();
  Object.getOwnPropertyNames(aptitudeHeaders).forEach((header) => {
    const values = aptitudeHeaders[header];
    values.forEach((value) => {
      headers.append(header, value);
    });
  });

  // responseUrl is not currently exposed
  let options = {
    status: aptitudeResponse.statusCode,
    statusText: '', // Not available, defaults to empty string (will become 'ok' in the response if status code is 2xx)
    headers: headers,
  };

  return new Response(aptitudeResponse.body, options);
}

// Currently abortable fetch is not supported
// We can still timeout, but there is no special flag set on the error when a timeout occurs
export function fetch(input, init) {
  return new Promise(async function (resolve, reject) {
    try {
      const request = await whatwgRequest2AptitudeRequest(new Request(input, init));
      const response = await network.httpRequest(request);
      const whatWGResponse = aptitudeResponse2WhatwgResponse(response);
      setTimeout(function () {
        resolve(whatWGResponse);
      }, 0);
    } catch (e) {
      console.log(`[Fetch] Network request failed: ${e}`);
      setTimeout(function () {
        reject(new TypeError('Network request failed'));
      }, 0);
    }
  });
}

// We can use either global or globalThis to set objects
// The underlying whatwg-fetch implementation uses XHR, which we do not support
// so replace it with our network aptitude implementation
global.fetch = fetch;
