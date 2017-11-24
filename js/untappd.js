var url = 'https://api.untappd.com/v4/method_name?client_id=' + clientID + '&client_secret=' + clientSecret + '&access_token=' + accessToken;
var clientID = 'C2E4C986B9B3D77E38445DF337306EB7DE359123';
var clientSecret = '223E3E57D2FD3C20979B7DE671B742F1DDF5DC6B';
var accessToken = response.access_token;
var oAuthUrl = 'https://untappd.com/oauth/authorize/?client_id=' + clientID + '&client_secret=' + clientSecret + '&response_type=code&redirect_url=' + redirectUrl + '&code=CODE'
//var redirectUrl = need to check