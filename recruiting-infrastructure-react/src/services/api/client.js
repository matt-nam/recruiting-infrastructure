import { API } from "aws-amplify";

export async function client(endpoint, path, method, { body, ...customConfig } = {}) {
    const headers = { 'Content-Type': 'application/json' }

    const config = {
        ...customConfig,
        headers: {
            ...headers,
            ...customConfig.headers,
        },
    }

    if (body) {
        config.body = body
    }

    console.log(body)
    console.log(customConfig)
    console.log(config)
    let data
    try {
        let response
        switch (method) {
            case APICallMethods.GET:
                response = await API.get(endpoint, path, config);
                break;
            case APICallMethods.POST:
                response = await API.post(endpoint, path, config);
                break;
            case APICallMethods.PUT:
                response = await API.put(endpoint, path, config);
                break;
            default:
                response = await API.get(endpoint, path);
                break;
        }
        if (response) {
            return response
        }
        throw new Error(response.statusText)
    } catch (err) {
        console.log(err)
        return Promise.reject(err.message ? err.message : data)
    }
}

const APICallMethods = {
    GET: 1,
    POST: 2,
    PUT: 3,
}

client.get = function (endpoint, path, customConfig = {}) {
    return client(endpoint, path, APICallMethods.GET, { ...customConfig })
}

client.post = function (endpoint, path, body, customConfig = {}) {
    return client(endpoint, path, APICallMethods.POST, { ...customConfig, body })
}

client.put = function (endpoint, path, body, customConfig = {}) {
    return client(endpoint, path, APICallMethods.PUT, { ...customConfig, body })
}
