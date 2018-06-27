import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, fromEvent } from 'rxjs';
import { MessageService } from './message.service';
import { tap, catchError, map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { LoadingService } from './loading.service'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = 'http://127.0.0.1:8000/login';
  private logoutUrl = 'http://127.0.0.1:8000/logout';
  public httpError = false;

  public token: string = '';
  public name: string = '';
  public perfil: string = '';

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private loadingService: LoadingService
  ) { }

  setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
  }

  getCookies() {
    this.token = this.getCookie('token');
    this.name = this.getCookie('name');
    this.perfil = this.getCookie('perfil');
  }

  getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) {
          return c.substring(nameEQ.length,c.length);
        }
    }
    return '';
  }

  eraseCookie(name) {
    document.cookie = name+'=; Max-Age=-99999999;';
  }

  logout() {
    this.token = '';
    this.name = '';
    this.perfil = '';
    this.eraseCookie('token');
    this.eraseCookie('name');
    this.eraseCookie('perfil');
    return;
  }

  logoutApi(): Observable<any> {
    this.loadingService.setLoading(true);
    this.httpError = false;
    const headers: HttpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', this.token);

    return this.http.get<any>(this.logoutUrl, {headers: headers})
    .pipe(
      tap(
        data => {
          this.log(`logged out`);
          this.loadingService.setLoading(false);
        },
        error => {
          this.httpError = true;
          this.loadingService.setLoading(false);
        }
      ),
      catchError(this.handleError('Logout', []))
    );
  }

  login(login: string, password: string): Observable<any>{
    this.loadingService.setLoading(true);
    this.httpError = false;
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    return this.http.post<any>(this.loginUrl, {login, password}, {headers: headers})
    .pipe(
      tap(
        data => {
          this.log(`fetched login`);
          this.loadingService.setLoading(false);
          this.setCookie('token', data.token, 1);
          this.setCookie('name', data.name, 1);
          this.setCookie('perfil', data.perfil, 1);
          this.token = data.token;
          this.name = data.name;
          this.perfil = data.perfil;
        },
        error => {
          this.httpError = true;
          this.loadingService.setLoading(false);
        }
      ),
      catchError(this.handleError('Get Login', []))
    );
  }

  private log(message: string){
    console.log('UserService: ' + message);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      this.validationErrors(error);

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);

    };
  }

  private validationErrors(error: any){
    if(typeof error != 'undefined'){
      if(typeof error.error != 'undefined'){
        if(typeof error.error.errors != 'undefined'){
          for(let i in error.error.errors){
            // console.log(error.error.errors[i][0]));
            this.messageService.add(error.error.errors[i][0], 'danger');
          }
        }
      }
    }
  }

}
