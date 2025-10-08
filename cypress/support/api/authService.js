import { ENDPOINTS } from '../../config/endpoints';
import CryptoJS from 'crypto-js';

export const AuthService = {
 
  login(username, password) {
    return cy.request({
      method: 'POST',
      url: ENDPOINTS.LOGIN,
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        username,
        password,
      },
      failOnStatusCode: false,
    });
  },

  loginWithMD5(username, password) {
    const timestamp = Date.now(); 
    const hash = CryptoJS.MD5(`${username}${password}${timestamp}`).toString();

    return cy.request({
      method: 'POST',
      url: ENDPOINTS.LOGIN,
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        username,
        timestamp,
        hash,
      },
      failOnStatusCode: false,
    });
  },
};
