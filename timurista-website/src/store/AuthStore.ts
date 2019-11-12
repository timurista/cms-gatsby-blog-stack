import { observable, action } from "mobx";
import axios from "axios";
// import get from "lodash.get";

const initialUrl = window.location.href;
export const COGNITO_AUTH_LOGIN = `https://thetimurista.auth.us-east-1.amazoncognito.com/login?client_id=2k9cu38mg2h3ugqnpvc51gbg3a&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone&redirect_uri=${window.location.href}`;
export const TOKEN_VERIFIER_URL = "#";

export interface User {
  picture?: string;
  username: string;
  email: string;
  token: string;
}

function parseToken() {
  let token = null;
  const params = new URLSearchParams(window.location.hash.substr(1));
  if (params.get("id_token")) {
    token = params.get("id_token");
  }
  return token;
}

export class AuthStore {
  @observable user: User | null = null;

  constructor() {
    const token = parseToken();
    console.log(token, "verifying...");
    if (token) {
      window.location.replace(initialUrl);
      this.fetchUserDetails(token);
    }
  }

  @action async fetchUserDetails(token: string) {
    // let data = null;
    // const { data: { err, result } } = await app.axios('/files')
    let params = undefined;

    axios({
      method: "post",
      url: TOKEN_VERIFIER_URL,
      params,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        Authorization: "Bearer " + token
      }
    }).then(res => {
      console.log("success", res);
    });
  }

  @action
  login() {
    window.location.assign(COGNITO_AUTH_LOGIN);
  }
}

export default new AuthStore();
