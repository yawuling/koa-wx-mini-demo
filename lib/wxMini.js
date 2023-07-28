const axios = require('axios');
const cache = require('memory-cache');

/**
 * 获取小程序接口调用凭证
 * @param {string} appid 小程序 appid
 * @param {string} secret 小程序 secret
 * @returns 
 */
exports.getAccessToken = async (appid, secret) => {
  const storageToken = cache.get('wx-mini-access-token');

  if (storageToken) {
    return storageToken;
  }

  const { data } = await axios.get('https://api.weixin.qq.com/cgi-bin/token', {
    params: {
      grant_type: 'client_credential',
      appid,
      secret,
    },
  });

  const { errcode, access_token, expires_in, errmsg } = data;

  if (errcode === 0 || access_token) {
    cache.put('wx-mini-access-token', access_token, expires_in * 1000);
    return access_token;
  }

  const error = new Error(errmsg);
  error.code = errcode;
  return error;
}

/**
 * 生成小程序 schema
 * @param {*} param0 
 * @returns 
 */
exports.generateSchema = async ({
  access_token,
  jump_wxa,
  is_expire,
  expire_type,
  expire_time,
  expire_interval,
}) => {
  return axios.post(`https://api.weixin.qq.com/wxa/generatescheme?access_token=${access_token}`, {
    jump_wxa,
    is_expire,
    expire_type,
    expire_time,
    expire_interval,
  });
}

/**
 * 生成小程序 schema
 * @param {*} param0 
 * @returns 
 */
exports.querySchema = async ({
  access_token,
  scheme,
}) => {
  return axios.post(`https://api.weixin.qq.com/wxa/queryscheme?access_token=${access_token}`, {
    scheme,
  });
}

/**
 * 生成小程序 URL Link
 * @param {*} param0 
 * @returns 
 */
exports.generateUrlLink = async ({
  access_token,
  path,
  query,
  env_version,
  is_expire,
  expire_type,
  expire_time,
  expire_interval,
}) => {
  return axios.post(`https://api.weixin.qq.com/wxa/generate_urllink?access_token=${access_token}`, {
    path,
    query,
    env_version,
    is_expire,
    expire_type,
    expire_time,
    expire_interval,
  });
}
