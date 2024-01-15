export class Token {
  static getToken(): string | null {
    return localStorage.getItem('Authorization');
  }

  static deleteToken() {
    localStorage.removeItem('Authorization');
  }

  static setToken( token : string ){
    this.deleteToken();
    localStorage.setItem('Authorization', token);
  }

}
