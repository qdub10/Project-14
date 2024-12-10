import { JwtPayload, jwtDecode } from 'jwt-decode';
import { redirect } from 'react-router-dom';

class AuthService {
  getProfile() {
    // TODO: return the decoded token
    return jwtDecode(this.getToken());
  }

  loggedIn() {
    // TODO: return a value that indicates if the user is logged in
    return this.getToken() ? true : false;
  }
  
  isTokenExpired(token: string) {
    // TODO: return a value that indicates if the token is expired
    const decoded: JwtPayload = jwtDecode(token);
    return decoded.exp ? decoded.exp < Date.now() / 1000 : true;
  }

  getToken(): string {
    // TODO: return the token
    return localStorage.getItem('token') || '';
  }

  login(idToken: string) {
    // TODO: set the token to localStorage
    localStorage.setItem('token', idToken);
    // TODO: redirect to the home page
    redirect('/');
  }

  logout() {
    // TODO: remove the token from localStorage
    localStorage.removeItem('token');
    // TODO: redirect to the login page
    redirect('/login');
  }
}

export default new AuthService();
