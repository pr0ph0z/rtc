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

const loginBody = [
  'username',
  'password'
]

const requestResponse = {
  incomplete_body: {
    code: 400,
    status: 'failed',
    message: 'Bad request. Please check your request data'
  },
  success: {
    code: 200,
    status: 'success',
    message: 'Success'
  },
  unauthorized: {
    code: 401,
    status: 'failed',
    message: 'Username and password does not match'
  }
}

module.exports = {
  checkBody,
  loginBody,
  registerBody,
  requestResponse
}
