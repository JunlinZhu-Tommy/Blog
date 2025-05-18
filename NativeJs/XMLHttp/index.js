const XHR_READY_STATE = {
  "UNSENT": 0,
  'OPENED':1,
  'HEADERS_RECEIVED': 2,
  'LOADING': 3,
  'DONE': 4
}

function xhrRequest(
  options
) {
  return new Promise((resolve, reject) => {
    if (!options || typeof options !== 'object') {
      reject(new Error('Please enter a valid options'))
    }
    
    const {
      method,
      url,
      data = null,
      headers = {},
      timeout = 10000,
    } = options

    if (!url) {
      reject(new Error('URL is a must have param'))
    }

    const xhr = new XMLHttpRequest()

    let finalUrl = url

    if (method.toUpperCase() === 'GET' && data) {
      const queryString = Object.keys(
        data
      ).map(
        key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
      ).join('&')

      finalUrl += (url.indexOf('?') !== -1 ? '?' : '&') + queryString
    }

    xhr.open(method.toUpperCase(), finalUrl, true)

    for (let key in headers) {
      xhr.setRequestHeader(key, headers[key])
    }

    if (method.toUpperCase() !== 'GET' && !headers['Content-Type']) {
      xhr.setRequestHeader(
        'Content-Type', 
        'application/json'
      )
    }

    xhr.timeout = timeout

    xhr.onreadystatechange = function() {
      if (xhr.readyState === XHR_READY_STATE.DONE) {
        const status = xhr.status

        if (status >= 200 && status < 300) {
          try {
            const contentType = xhr.getResponseHeader('Content-Type')

            if (contentType && contentType.indexOf('application/json') !== -1) {
              resolve(JSON.parse(xhr.responseText))
            } else {
              resolve(xhr.responseText)
            }
          } catch (error) {
            reject(new Error('Parsing error on response'))
          }
        } else {
          reject(new Error('Request Failure with status code: ' + status))
        }
      }
    }

    xhr.onerror = function() {
      reject(new Error('Network Error'))
    }

    xhr.ontimeout = function() {
      reject(new Error('Request Timeout'))
    }

    if (method.toUpperCase() === 'GET' || !data) {
      xhr.send()
    } else {
      const sendData = typeof data === 'string' ? data : JSON.stringify(data)
      xhr.send(sendData)
    }
  })
}