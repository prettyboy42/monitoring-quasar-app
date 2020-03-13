// This is just an example,
// so you can safely delete all default props below

export default {
  failed: 'Action failed',
  success: 'Action was successful',
  error: {
    title: 'Error page!',
    http: {
      '400': 'Bad request.',
      '403': 'You are not authorized to access this page.',
      '404': 'The page does not exist.',
      '405': 'The HTTP verb you used is not supported for this URL.',
      '500': 'Internal server error.'
    },
    concurrencyFailure:
      'Another user modified this data at the same time as you. Your changes were rejected.',
    validation: 'Validation error on the server.'
  },
  login: {
    title: 'Sign in',
    form: {
      password: 'Password',
      'password.placeholder': 'Your password',
      rememberme: 'Remember me',
      button: 'Sign in'
    },
    messages: {
      error: {
        authentication:
          '<strong>Failed to sign in!</strong> Please check your credentials and try again.'
      }
    },
    password: {
      forgot: 'Did you forget your password?'
    }
  }
};
