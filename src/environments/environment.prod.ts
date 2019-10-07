export const environment = {
  production: true,
  OIDC: {
    baseUrl: 'http://10.199.15.95/fhsoidc',
    authorizationEndpoint: '/',
    tokenEndpoint: '/connect/token',
    urlUser: 'http://10.199.15.95/authorize',
    userinfoEndpoint: '/connect/userinfo',
    Paramaters: {   
    'scope': 'openid',
    'client_id': 'MLDORM',
    'clientSecret': '',
    'redirect_uri': 'http://10.199.15.95/MLDORM/',
    'response_type': 'id_token token',
    'nonce': 'n-0S6_WzA2Mj'
    }
    },
    
  Languager: '/MLDORM/assets/i18n/'
};
