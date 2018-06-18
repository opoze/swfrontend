import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Proposal } from './proposal';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProposalService {

  private proposalsUrl = 'http://localhost:8000/proposals';

  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient
  ) { }

  getProposals(): Observable<Proposal[]> {
    return this.http.get<Proposal[]>(this.proposalsUrl)
    .pipe(
      tap(proposals => this.log(`fetched proposals`)),
      catchError(this.handleError('getProposals', []))
    );
  }

  getProposal(id: number): Observable<Proposal> {
    const url = `${this.proposalsUrl}/${id}`;
    return this.http.get<Proposal>(url).pipe(
      tap(_ => this.log(`fetched proposal id=${id}`)),
      catchError(this.handleError<Proposal>(`getProposal id=${id}`))
    );
  }

  updateProposal (proposal: Proposal): Observable<any> {
    return this.http.put(this.proposalsUrl, Proposal, httpOptions).pipe(
      tap(_ => this.log(`updated proposal id=${proposal.id}`)),
      catchError(this.handleError<any>('updateProposal'))
    );
  }

  private log(message: string){
    console.log('ProposalService: ' + message);
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
