import CryptoJS from 'crypto-js';

/**
 * @param {string} username
 * @param {string} password
 * @param {string} timestamp 
 * @returns {string} 
 */
export const generateMD5Hash = (username, password, timestamp = Date.now()) => {
  const raw = `${username}${password}${timestamp}`;
  return CryptoJS.MD5(raw).toString();
};
