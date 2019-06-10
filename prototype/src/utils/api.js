const httpEndpoint = process.env.VUE_APP_API

let client = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
}

export async function apiRequest(overrides) {
  // console.log("Send API request");

  let options = {
    method: "GET",
    ...overrides,
  }

  let url = new URL(httpEndpoint)
  if (options.method == "GET" && options.data) {
    Object.keys(options.data).forEach(key => url.searchParams.append(key, options.data[key]))
  }

  return fetch(url, {
    method: options.method,
    headers: client.headers,
    data: options.data,
  })
    .then(async function(response) {
      // console.log("API response data", response)
      const responseData = await response.json()

      return responseData
    })
    .catch(error => {
      // console.log("API request error: ", error)

      return error
    })

  // TODO: General error handling, display errors to user
}
