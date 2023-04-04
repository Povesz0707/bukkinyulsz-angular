import {Injectable} from "@angular/core";

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
@Injectable({
  providedIn: 'root'
})
export class UserStorageService{

  constructor() {
  }
  signOut(): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.removeItem(USER_KEY);
  }
  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }
  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public tokenExpired(): boolean {
    let token = window.sessionStorage.getItem(TOKEN_KEY);
    if (token == null || token == "") {
      return true;
    }
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }
  getDisplayName(){
    if(this.getUser() != undefined){
      return this.getUser().displayName
    }
    else return ''
  }

  public isAdmin(): boolean {
    if(this.getUser() != undefined) {
      return !!this.getUser().roles.includes('ADMIN_ROLE');
    }
    return false;
  }

  public isLoggedIn(){
    return (window.sessionStorage.getItem(TOKEN_KEY) != null && window.sessionStorage.getItem(USER_KEY) != null) && !this.tokenExpired()
  }

  isAdminLogin(){
    return this.isAdmin() &&! this.tokenExpired()
  }



  public isEditor(): boolean {
    if(this.getUser() != undefined) {
      return !!this.getUser().roles.includes('EDITOR_ROLE');
    }
    return false;
  }
  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return undefined;
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }




}
