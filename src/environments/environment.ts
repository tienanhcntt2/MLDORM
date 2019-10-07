// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  OIDC: {
    baseUrl: 'http://localhost:4200',
    authorizationEndpoint: '/login',
    tokenEndpoint: '/connect/token',
    urlUser: 'http://10.199.15.95/authorize',
    userinfoEndpoint: '/connect/userinfo',
    Paramaters: {
      'url': 'http://localhost:4200/login',
      'scope': 'openid',
      'client_id': 'MLDORM',
      'clientSecret': '',
      'redirect_uri': 'http://localhost:4300',
      'response_type': 'code id_token token',
      'nonce': 'n-0S6_WzA2Mj'
    }
  },
  Languager: '/assets/i18n/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
