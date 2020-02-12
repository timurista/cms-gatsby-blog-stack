import { observable, action, runInAction } from "mobx";
import axios from "axios";
// import get from "lodash.get";

const initialUrl = window.location.href;
export const CONGITO_ENDPOINT = `https://thetimurista.auth.us-east-1.amazoncognito.com`;
export const COGNITO_AUTH_LOGIN = `https://thetimurista.auth.us-east-1.amazoncognito.com/login?client_id=2k9cu38mg2h3ugqnpvc51gbg3a&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone&redirect_uri=${window.location.href}`;
// export const TOKEN_VERIFIER_URL = `${CONGITO_ENDPOINT}/oauth2/userInfo&scope=openid`;
export const TOKEN_VERIFIER_URL = 'https://g2vtb5opa8.execute-api.us-east-1.amazonaws.com/Prod/userInfo'

export interface User {
  username: string;
}

function parseToken() {
  let token = null;
  const params = new URLSearchParams(window.location.hash.substr(1));
  if (params.get("access_token")) {
    token = params.get("access_token");
  }
  return token;
}

function setWithExpiry(key: string, value: string, ttl: number) {
  const now = new Date()
  
  // `item` is an object which contains the original value
  // as well as the time when it's supposed to expire
	const item = {
		value: value,
		expiry: now.getTime() + ttl
	}
	localStorage.setItem(key, JSON.stringify(item))
}

function getWithExpiry(key: string) {
	const itemStr = localStorage.getItem(key)
	// if the item doesn't exist, return null
	if (!itemStr) {
		return null
	}
	const item = JSON.parse(itemStr)
	const now = new Date()
	// compare the expiry time of the item with the current time
	if (now.getTime() > item.expiry) {
		// If the item is expired, delete the item from storage
		// and return null
		localStorage.removeItem(key)
		return null
	}
	return item.value
}

export class AuthStore {
  @observable user: User | null = null;

  constructor() {
    const TOKEN_LS_KEY = 'timurista.com-temp-token';
    let token = getWithExpiry(TOKEN_LS_KEY)
    if (!token) {
      window.location.replace(initialUrl);
      token = parseToken();
    }
    if (token) {
      this.fetchUserDetails(token);
      setWithExpiry(TOKEN_LS_KEY, token, 12*60*60*1000)
    }
  }

  @action async fetchUserDetails(token: string) {
    axios({
      method: "get",
      url: TOKEN_VERIFIER_URL,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Authorization": token
      }
    }).then(res => {
      console.log("success", res);
      runInAction(() => {
        this.user = {
          username: res.data.Username
        }
        if (res.data.UserAttributes) {
          res.data.UserAttributes.forEach((att: { Name: string, Value: string }) => {
            // this.user[att.Name] = att.Value
          })
        }

      })

    });
  }

  @action
  login() {
    window.location.assign(COGNITO_AUTH_LOGIN);
  }
}

export default new AuthStore();
