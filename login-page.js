"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginPage = vars => {
    return `
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
 <script src="https://cdn.auth0.com/js/auth0/9.11/auth0.min.js"></script>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
    <div id="status">
    </div>
    <br>
    Login: <input type="text" id="username">
    <br>
    Password: <input type="password" id="password" value="">
    <br>
    <button onclick="login()">Login</button>
</body>
<script>

  var webAuth = new auth0.WebAuth({
    domain:      "${vars.domain}",
    clientID:    "${vars.clientID}",
    responseType: 'token id_token',
  });

  window.onload = () => {
    handleCallback();
    window.location.hash = '';
  }
  function login(){
    webAuth.login({
    realm: '${vars.realm}',
    username: document.getElementById('username').value,
    password: document.getElementById('password').value,
  }, (err, authResult) => {
      saveToken('', '')
      console.log(err)
  });
  }
function saveToken(accessToken, idToken) {
    // Saves user access token and ID token into local storage
    localStorage.setItem('access_token', accessToken)
    localStorage.setItem('id_token', idToken)
}

function handleCallback(){
  const hashUrl = window.location.hash;
    const hash = hashUrl.substring(1, hashUrl.length);
    const data = {};
    hash.split('&').map(kp => {
      const keypair = kp.split('=');
      data[keypair[0]] = keypair[1];
    })
    saveToken(data.access_token, data.id_token);
}

</script>
</html>

`;
};
//# sourceMappingURL=login-page.js.map