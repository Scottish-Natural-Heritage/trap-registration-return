import axios from 'axios';

const generalError = {
  status: 500,
  statusText: 'Internal Server Error',
  data: {
    message: 'Not implemented.'
  },
  headers: {},
  config: {},
  request: undefined
};

// This is a mock public key for testing purposes. It can be used to validate
// the 100 year long token below, but will not validate any tokens from the live
// systems. Enabling the `d` attribute will allow more tokens to be generated,
// but they will only be valid during testing and will not be validated on the
// live systems.
const publicKeyResponse = {
  status: 200,
  statusText: 'OK',
  data: {
    kty: 'EC',
    kid: '7BvWTkXGNc07dguIUaxT_m_OWutHZcEXWwvxwIYTriE',
    crv: 'P-256',
    x: 'PaWMPhM7afaymxssSMaEjQYfv7XtfJIBc0T4XCkzHYE',
    y: 'f1MbjB-eQhGcrehqmPCuelt2KIjzzJ8qJZ12TsJODbo'
    // Adding the following `d` attribute would give you the private key used to
    // sign the `counterpart100yearToken` below.
    // d: 'rRPXIJLIGL1EJ1CxUhv9WTqPU3U9xg4Wq4rtMKRkng8'
  },
  headers: {},
  config: {},
  request: undefined
};

// This is unused, but is useful for building URLs for testing. As long as the
// app is started with TRR_TEST=true, then this token will validate as a 100
// year long token for the trap registration number "-1".
const counterpart100yearToken =
  'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjQ3Njc2NzQ1NTgsInN1YiI6Ii0xIn0.XSHX6QB8robVaEuXVeHKbBed13uAdWvLBaNeGCYPAWWlw7Fm7bafXMPUQQE69TNc8DbjUgaRDxKvS2ju5uZziw';

// A mock Axios implementation suitable for DI into the app during testing.
const mockAxios = {
  /**
   * Mock the get method from the axios library.
   *
   * Right now this only supports getting the fake public key from above.
   *
   * @param {string} url
   * @returns {Promise<any>} A fake response.
   */
  get: async (url) => {
    if (url.endsWith('/trap-registration-api/v1/public-key')) {
      return Promise.resolve(publicKeyResponse);
    }

    return Promise.resolve(generalError);
  }
};

const httpRequest = process.env.TRR_TEST ? mockAxios : axios;

export {httpRequest as default, counterpart100yearToken};
