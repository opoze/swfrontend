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
  public token: string = '';
  public name: string = '';
  public httpError = false;

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private loadingService: LoadingService
  ) { }

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

          this.name = data.name;
          this.token = data.token;
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
