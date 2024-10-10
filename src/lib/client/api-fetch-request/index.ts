/**
 * This function is used to send fetch requests to the API endpoints.
 * 
 * @param {string} method - The HTTP method (e.g. "GET", "POST", "PUT", "PATCH", "DELETE") associated with the request.
 * @param {string} path - The endpoint path. The path should be prefixed with a `/` and can include path parameters, but not query parameters. Query parameters should be passed in the `queryStringParams` argument.
 * @param {object} queryStringParams - An object of key/value pairs representing the query parameters for the request. Query parameters are often used to search/sort/filter on data.
 * @param {object} payload - An object of key/value pairs that will be sent in the request body. If you want to pass a payload but no query params, then pass an empty object as the `queryStringParams` argument and then pass the necessary payload object.
 * @param {object} additionalHeaders - An object of key/value pairs that are wrapped in quotes, like this: 
 * { "Accept": "application/json" }
 * The headers object already includes the following header: 
 * { "Content-Type": "application/json" }
 * If more headers are needed, then you can pass those to this argument.
 * @returns {Promise<object>} Returns a Promise object that contains the JSON response from the request. A call to this `apiRequest()` function needs to be awaited in order to return the JSON response.
 * 
 * EXAMPLES
 * * EXAMPLE 1: Send a GET request for a single record.
 * @example
 * ```
 * const response = await apiRequest(
 *   "GET", 
 *   `/users/get-user-data/${user.id}`,
 * );
 * ```
 * 
 * * EXAMPLE 2: Send a GET request with querystring params.
 * @example
 * ```
 * let searchTerm = "comfortable shoes";
 * const response = await apiRequest(
 *   "GET", 
 *   `/search`,
 *   {
 *     q: searchTerm,
 *     limit: 10,
 *     offset: 0,
 *   },
 * );
 * ```
 * 
 * * EXAMPLE 3: Send a POST request.
 * @example
 * ```
 * const response = await apiRequest(
 *   "POST", 
 *   `/products/create-product`,
 *   {},
 *   {
 *     name: "T-Shirt",
 *     price: 2500
 *   },
 * );
 * ```
 * 
 * * EXAMPLE 4: Send a PUT request.
 * @example
 * ```
 * const response = await apiRequest(
 *   "PUT",
 *   `/products/update-product/${product.id}`,
 *   {},
 *   {
 *     price: 2000
 *   }, 
 * );
 * ```
 * 
 * * EXAMPLE 5: Send a DELETE request.
 * @example
 * ```
 * const response = await apiRequest(
 *   "DELETE",
 *   `/products/delete-product/${product.id}`, 
 * );
 * ```
 */
export async function apiRequest(
  method: string, 
  path: string, 
  queryStringParams: object = {}, 
  payload: object = {}, 
  additionalHeaders: object = {}
) {
  const headers = {
    "Content-Type": "application/json"
  };

  const options: RequestInit = {
    method: method,
    headers: headers,
  };

  // If additional headers are passed to this function, then include them in the headers object by using the spread operator.
  options.headers = { ...options.headers, ...additionalHeaders };

  // If a queryStringParams object is passed to this function, then convert it to a string of query params.
  let qsParams = "";
  if (Object.keys(queryStringParams).length > 0) {
    // @ts-ignore: The `new URLSearchParams()` constructor accepts objects as arguments (https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams#examples), but TypeScript still shows errors when passing objects to the `new URLSearchParams()` constructor (see https://github.com/microsoft/TypeScript/issues/15338).
    qsParams = `?${new URLSearchParams(queryStringParams)}`;
  }

  // If a payload object is passed to this function, then add a body to the options object and stringify the payload for the request body.
  if (Object.keys(payload).length > 0) {
    options.body = JSON.stringify(payload);
  }

  const url = `__HONO_DOMAIN__/api${path}${qsParams}`;
  console.log("FETCH URL (fetch-request):", url);
  const response = await fetch(url, options);

  if (!response.ok) {
    console.log("ERROR RESPONSE:", response);
    const result = await response.json();
    console.log("ERROR RESULT:", result);
    throw new Error(`
      RESPONSE STATUS: ${response.status} | ${response.statusText}
      METHOD: ${method}
      URL: ${url}
      PAYLOAD: ${options.body}
      ERRORS: ${JSON.stringify(result)}
    `);
  }

  return response.json();
}
