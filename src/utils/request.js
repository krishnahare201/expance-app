import { BACKEND_API_URL } from './environment';
import { Cookies } from "react-cookie";
const Axios = require('axios');
const cookie = new Cookies();


export const config = {
  serverHost: BACKEND_API_URL,
};
const serialize = obj => {
  const str = [];
  for (const p in obj) {
    if (obj.hasOwnProperty(p)) {
      if (typeof obj[p] === 'boolean' || obj[p] === 0 || obj[p]) {
        str.push(`${encodeURI(p)}=${encodeURI(obj[p])}`);
      }
    }
  }
  return str.join('&');
};

export function getRequest(url, obj = {}) {
  const tokenString = cookie.get("token") ? cookie.get("token") : undefined
  return Axios({
    method: 'GET',
    url: `${config.serverHost + url}?${serialize(obj)}`,
    headers: {
      Authorization: `Bearer ${tokenString}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(response => response.data);
}

export function postRequest(url, data) {
  const tokenString = cookie.get("token") ? cookie.get("token") : undefined
  return Axios({
    method: 'POST',
    url: config.serverHost + url,
    headers: {
      Authorization: `Bearer ${tokenString}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
      CrossDomain: true,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': 86400,
    },
    data: JSON.stringify(data),
  }).then(response => response.data);
}

