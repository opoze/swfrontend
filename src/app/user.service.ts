import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user';
import { Observable, of, fromEvent } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { MessageService } from './message.service';
import { tap, catchError, map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { LoadingService } from './loading.service'
import { AuthService } from './auth.service'

// const searchBox = document.getElementById('search_box');
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private usersUrl = 'http://127.0.0.1:8000/user';
  private findUrl = 'http://127.0.0.1:8000/userfind';
  public httpError = false;
  public loadingUsersError = false;

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private loadingService: LoadingService,
    private authService: AuthService
  ) { }

  headers: HttpHeaders = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', this.authService.token);


  getUsers(): Observable<User[]> {
    this.loadingService.setLoading(true);
    this.httpError = false;
    return this.http.get<User[]>(this.usersUrl, {headers: this.headers})
    .pipe(
      tap(
        data => {
          this.log(`fetched users`);
          this.loadingService.setLoading(false);
        },
        error => {
          this.httpError = true;
          this.loadingService.setLoading(false);
        }
      ),
      catchError(this.handleError('Get Usuários', []))
    );
  }

  getUser(id: number): Observable<User> {
    this.loadingService.setLoading(true);
    this.httpError = false;
    const url = `${this.usersUrl}/${id}`;
    return this.http.get<User>(url, {headers: this.headers}).pipe(
      tap(
        data => {
          this.log(`fetched user id=${id}`);
          this.loadingService.setLoading(false);
        },
        error => {
          this.httpError = true;
          this.loadingService.setLoading(false);
        }
      ),
      catchError(this.handleError<User>(`getUser id=${id}`))
    );
  }

  removeUser(id: number): Observable<any> {
    this.loadingService.setLoading(true);
    this.httpError = false;
    const url = `${this.usersUrl}/${id}`;
    return this.http.delete<any>(url, {headers: this.headers}).pipe(
      tap(
        data => {
          this.log(`deleted user id=${id}`);
          this.loadingService.setLoading(false);
        },
        error => {
          this.httpError = true;
          this.loadingService.setLoading(false);
        }
      ),
      catchError(this.handleError<User>(`removeUser id=${id}`))
    );
  }

  updateUser (user: User): Observable<any> {
    this.loadingService.setLoading(true);
    this.httpError = false;
    const url = `${this.usersUrl}/${user.id}`;
    return this.http.post<User>(url, user, {headers: this.headers}).pipe(
      tap(
        data => {
          this.messageService.add('Usuário alterado.', 'success');
          this.log(`updated user id=${user.id}`);
          this.loadingService.setLoading(false);
        },
        error => {
          this.httpError = true;
          this.messageService.add('Não foi possível alterar o usuário.', 'danger');
          this.loadingService.setLoading(false);
        }
      ),
      catchError(this.handleError<any>('Atualizar usuário'))
    );
  }

  storeUser (user: User): Observable<any> {
    this.loadingService.setLoading(true);
    this.httpError = false;
    const url = `${this.usersUrl}`;
    return this.http.post<User>(url, user, {headers: this.headers}).pipe(
      tap(
        data => {
          this.messageService.add('Usuário inserido.', 'success');
          this.log(`insert user id=${user.id}`);
          this.loadingService.setLoading(false);
        },
        error => {
          this.httpError = true;
          this.messageService.add('Não foi possível adicionar o usuário.', 'danger');
          this.loadingService.setLoading(false);
        }
      ),
      catchError(this.handleError<any>('Inserir Usuário'))
    );
  }

  findUserByName(): Observable<User[]> {
    this.loadingService.setLoading(true);
    const url = `${this.findUrl}/`;
    const searchBox = document.getElementById('search_box');
    return fromEvent(searchBox, 'input').pipe(
      map((e: any) => e.target.value),
      filter(text => text.length > 0),
      debounceTime(500),
      distinctUntilChanged(),
      // switchMap((term) => ajax(url+term)),
      switchMap(
        (term) => this.http.get<User[]>(url+term, {headers: this.headers}).pipe(
          tap(
            data => {
              this.log(`fetched users`);
              this.loadingUsersError = false;
              this.loadingService.setLoading(false);
            },
            error => {
              this.loadingUsersError = true;
              this.loadingService.setLoading(false);
            }
          ),
          catchError(this.handleError<any>('Pesquisar usuários'))
        )
      )
    )
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
