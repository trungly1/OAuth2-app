const authorizeButton = document.getElementById('authorizeButton');
const tokenDisplay = document.getElementById('tokenDisplay');

const authorizationURL = 'https://api.trial.lsk.lightspeed.app/oauth/authorize';
const tokenURL = 'https://api.trial.lsk.lightspeed.app/oauth/token';
const redirectURI = 'https://localhost';
const scope = 'items, orders-api, financial-api,reservations-api,tax-configuration,propertymanagement';

authorizeButton.addEventListener('click', () => {
  const authorizationParams = {
    client_id: 'YOUR_CLIENT_ID',
    response_type: 'code',
    scope: scope,
    redirect_uri: redirectURI,
  };

  const authorizationUrl = `${authorizationURL}?${new URLSearchParams(authorizationParams)}`;
  window.location.href = authorizationUrl;
});

window.addEventListener('message', (event) => {
  if (event.origin !== redirectURI) {
    return;
  }

  const code = event.data.code;
  if (!code) {
    return;
  }

  const tokenParams = {
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: redirectURI,
    client_id: 'YOUR_CLIENT_ID',
    client_secret: 'YOUR_CLIENT_SECRET',
  };

  axios.post(tokenURL, tokenParams)
    .then(response => {
      const accessToken = response.data.access_token;
      tokenDisplay.textContent = `Access Token: ${accessToken}`;
    })
    .catch(error => {
      console.error(error);
    });
});
