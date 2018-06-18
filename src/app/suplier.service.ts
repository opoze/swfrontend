import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Suplier } from './suplier';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SuplierService {

  private supliersUrl = 'http://localhost:8000/supliers';

  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient
  ) { }

  getSupliers(): Observable<Suplier[]> {
    return this.http.get<Suplier[]>(this.supliersUrl)
    .pipe(
      tap(supliers => this.log(`fetched supliers`)),
      catchError(this.handleError('getSupliers', []))
    );
  }

  getSuplier(id: number): Observable<Suplier> {
    const url = `${this.supliersUrl}/${id}`;
    return this.http.get<Suplier>(url).pipe(
      tap(_ => this.log(`fetched suplier id=${id}`)),
      catchError(this.handleError<Suplier>(`getSuplier id=${id}`))
    );
  }

  updateSuplier (suplier: Suplier): Observable<any> {
    return this.http.put(this.supliersUrl, Suplier, httpOptions).pipe(
      tap(_ => this.log(`updated suplier id=${suplier.id}`)),
      catchError(this.handleError<any>('updateSuplier'))
    );
  }

  private log(message: string){
    console.log('SuplierService: ' + message);
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
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
