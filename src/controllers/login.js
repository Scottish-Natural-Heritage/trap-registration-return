import {ReturnState} from './_base.js';
import config from '../config/app.js';
import axios from '../config/http-request.js';
import jwt from 'jsonwebtoken';
import jwkToPem from 'jwk-to-pem';

/**
 * Get the TR-API's public key.
 *
 * @returns {any} JWK representation of our public key.
 */
const getPublicKey = async () => {
  const response = await axios.get(`${config.apiEndpoint}/public-key`);
  return response.data;
};

/**
 * Validate the user's saved login token.
 *
 * Clears the token when it's finished, but keeps a copy of their trap reg no.
 *
 * @param {any} session Our user's session object.
 * @param {string} session.token The user's saved login token.
 * @returns {boolean} True if the token is valid, false otherwise.
 */
const validateToken = async (session) => {
  const publicKey = await getPublicKey();
  const publicKeyAsPem = jwkToPem(publicKey);

  try {
    // Attempt to validate the user's saved login token.
    const validatedToken = jwt.verify(session.token, publicKeyAsPem, {algorithms: ['ES256']});

    // Now that we've verified the token, we can save the user's registration
    // number and clear the token.
    session.loggedInRegNo = validatedToken.sub;
    session.token = '';

    // Tell the controller that the login is valid.
    return true;
  } catch (error) {
    // If anything went wrong during validation, log the error.
    console.error({error});

    // Tell the controller that the login is no good.
    return false;
  }
};

const loginController = async (request) => {
  // First of all, check if we've already logged in.
  if (request.session.loggedInRegNo) {
    // If so, go right ahead!
    return ReturnState.Positive;
  }

  // If we're not already logged in, try to validate the supplied token.
  if (await validateToken(request.session)) {
    // If it validates, then we're golden!
    return ReturnState.Positive;
  }

  // If it doesn't validate, or we've not got a token at all, then kick back.
  return ReturnState.Negative;
};

export {loginController as default};
