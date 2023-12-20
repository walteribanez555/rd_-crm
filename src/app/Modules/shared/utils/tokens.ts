export class Token {
  getToken(): string | null {
    return localStorage.getItem('Authorization');
  }

  deleteToken() {
    localStorage.removeItem('Authorization');
  }
}
