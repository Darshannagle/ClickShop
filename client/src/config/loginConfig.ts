const loginConfig = {
  isLoggedIn: false,
  user: null,
};
export default loginConfig;

export function login(user: any) {
  loginConfig.isLoggedIn = true;
  loginConfig.user = user;
}

export function logout() {
  loginConfig.isLoggedIn = false;
  loginConfig.user = null;
}

export function getUser() {
  return loginConfig.user;
}

export function isLoggedIn() {
  return loginConfig.isLoggedIn;
}
