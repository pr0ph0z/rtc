function checkBody (body, params) {
  let valid = true
  for (let i = 0; i < params.length; i++) {
    if (!(params[i] in body)) valid = false
  }
  return valid
}

const registerBody = [
  'username',
  'password',
  'email',
  'full_name'
]

const requestResponse = {
  body_incomplete: {
    code: 400,
    status: 'failed',
    message: 'Bad request. Please check your request data.'
  },
  success: {
    code: 200,
    status: 'success',
    message: 'Success'
  }
}

module.exports = {
  checkBody,
  registerBody,
  requestResponse
}
