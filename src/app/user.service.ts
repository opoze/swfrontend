import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from './user';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private usersUrl = 'http://erp/user';
  public httpError = false;

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  getUsers(): Observable<User[]> {
    this.httpError = false;
    return this.http.get<User[]>(this.usersUrl)
    .pipe(
      tap(
        data => this.log(`fetched users`),
        error => this.httpError = true
      ),
      catchError(this.handleError('getUSers', []))
    );
  }

  getUser(id: number): Observable<User> {
    this.httpError = false;
    const url = `${this.usersUrl}/${id}`;
    return this.http.get<User>(url).pipe(
      tap(
        data => this.log(`fetched user id=${id}`),
        error => this.httpError = true
      ),
      catchError(this.handleError<User>(`getUser id=${id}`))
    );
  }

  updateUser (user: User): Observable<any> {
    this.httpError = false;
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    const url = `${this.usersUrl}/${user.id}`;
    return this.http.post<User>(url, user, {headers: headers}).pipe(
      tap(
        data => this.log(`updated user id=${user.id}`),
        error => this.httpError = true
      ),
      catchError(this.handleError<any>('Atualizar usuário'))
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
