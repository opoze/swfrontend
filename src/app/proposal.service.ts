import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Proposal } from './proposal';
import { Config } from './config';
import { Status } from './status';
import { Observable, of, fromEvent } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { MessageService } from './message.service';
import { tap, catchError, map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { LoadingService } from './loading.service'

// const searchBox = document.getElementById('search_box');
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class ProposalService {

  private proposalsUrl = 'http://127.0.0.1:8000/proposal';
  private proposalTimeUrl = 'http://127.0.0.1:8000/proposaltime';
  private proposalStatusHistoryUrl = 'http://127.0.0.1:8000/proposalstatushistory';
  private suplierProposalUrl = 'http://127.0.0.1:8000/proposals';
  private findUrl = 'http://127.0.0.1:8000/proposalfind';
  public httpError = false;
  public loadingProposalsError = false;

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private loadingService: LoadingService
  ) { }

  getProposals(id: number): Observable<Proposal[]> {
    this.loadingService.setLoading(true);
    this.httpError = false;
    const url = `${this.suplierProposalUrl}/${id}`;
    return this.http.get<Proposal[]>(url)
    .pipe(
      tap(
        data => {
          this.log(`fetched proposals`);
          this.loadingService.setLoading(false);
        },
        error => {
          this.httpError = true;
          this.loadingService.setLoading(false);
        }
      ),
      catchError(this.handleError('Get Propostas', []))
    );
  }

  getProposal(id: number): Observable<Proposal> {
    this.loadingService.setLoading(true);
    this.httpError = false;
    const url = `${this.proposalsUrl}/${id}`;
    return this.http.get<Proposal>(url).pipe(
      tap(
        data => {
          this.log(`fetched proposal id=${id}`);
          this.loadingService.setLoading(false);
        },
        error => {
          this.httpError = true;
          this.loadingService.setLoading(false);
        }
      ),
      catchError(this.handleError<Proposal>(`getProposal id=${id}`))
    );
  }

  getProposalTime(): Observable<Config> {
    this.loadingService.setLoading(true);
    this.httpError = false;
    return this.http.get<Config>(this.proposalTimeUrl).pipe(
      tap(
        data => {
          this.log('fetched proposal time');
          this.loadingService.setLoading(false);
        },
        error => {
          this.httpError = true;
          this.loadingService.setLoading(false);
        }
      ),
      catchError(this.handleError<Config>('getProposalTime'))
    );
  }

  getProposalStatusHistory(id: number): Observable<Status[]> {
    this.loadingService.setLoading(true);
    this.httpError = false;
    const url = `${this.proposalStatusHistoryUrl}/${id}`;
    return this.http.get<Status[]>(url).pipe(
      tap(
        data => {
          this.log('fetched proposal status history');
          this.loadingService.setLoading(false);
        },
        error => {
          this.httpError = true;
          this.loadingService.setLoading(false);
        }
      ),
      catchError(this.handleError<Config>('getProposalStatusHistory'))
    );
  }

  approveProposal(id: number): Observable<Status[]> {
    this.loadingService.setLoading(true);
    this.httpError = false;
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = `${this.proposalStatusHistoryUrl}/${id}`;
    return this.http.post<Status[]>(url, {status: 'A'}, {headers: headers}).pipe(
      tap(
        data => {
          this.messageService.add('Proposta aprovada.', 'success');
          this.log(`updated proposal status id=${id}`);
          this.loadingService.setLoading(false);
        },
        error => {
          this.httpError = true;
          this.messageService.add('Não foi possível aprovar a proposta.', 'danger');
          this.loadingService.setLoading(false);
        }
      ),
      catchError(this.handleError<any>('Aprovar proposta'))
    );
  }

  reproveProposal(id: number): Observable<Status[]> {
    this.loadingService.setLoading(true);
    this.httpError = false;
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    const url = `${this.proposalStatusHistoryUrl}/${id}`;
    return this.http.post<Status[]>(url, {status: 'R'}, {headers: headers}).pipe(
      tap(
        data => {
          this.messageService.add('Proposta reprovada.', 'success');
          this.log(`updated proposal status id=${id}`);
          this.loadingService.setLoading(false);
        },
        error => {
          this.httpError = true;
          this.messageService.add('Não foi possível reprovar a proposta.', 'danger');
          this.loadingService.setLoading(false);
        }
      ),
      catchError(this.handleError<any>('Reprovar proposta'))
    );
  }

  updateProposal (proposal: Proposal): Observable<any> {
    this.loadingService.setLoading(true);
    this.httpError = false;
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    const url = `${this.proposalsUrl}/${proposal.id}`;
    return this.http.post<Proposal>(url, proposal, {headers: headers}).pipe(
      tap(
        data => {
          this.messageService.add('Proposta alterado.', 'success');
          this.log(`updated proposal id=${proposal.id}`);
          this.loadingService.setLoading(false);
        },
        error => {
          this.httpError = true;
          this.messageService.add('Não foi possível alterar a proposta.', 'danger');
          this.loadingService.setLoading(false);
        }
      ),
      catchError(this.handleError<any>('Atualizar proposta'))
    );
  }

  updateProposalTime (proposaltime: Config): Observable<any> {
    this.loadingService.setLoading(true);
    this.httpError = false;
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    return this.http.post<Config>(this.proposalTimeUrl, proposaltime, {headers: headers}).pipe(
      tap(
        data => {
          this.messageService.add('Tempo de validade de proposta alterado.', 'success');
          this.log(`updated proposal time `);
          this.loadingService.setLoading(false);
        },
        error => {
          this.httpError = true;
          this.messageService.add('Não foi possível alterar o tempo de validade de proposta.', 'danger');
          this.loadingService.setLoading(false);
        }
      ),
      catchError(this.handleError<any>('Atualizar tempo de validade de proposta'))
    );
  }

  storeProposal (proposal: Proposal): Observable<any> {
    this.loadingService.setLoading(true);
    this.httpError = false;
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    const url = `${this.proposalsUrl}`;
    return this.http.post<Proposal>(url, proposal, {headers: headers}).pipe(
      tap(
        data => {
          this.messageService.add('Proposta inserida.', 'success');
          this.log(`insert proposal id=${proposal.id}`);
          this.loadingService.setLoading(false);
        },
        error => {
          this.httpError = true;
          this.messageService.add('Não foi possível adicionar a proposta.', 'danger');
          this.loadingService.setLoading(false);
        }
      ),
      catchError(this.handleError<any>('Inserir Proposta'))
    );
  }

  findProposalByName(): Observable<Proposal[]> {
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
        (term) => this.http.get<Proposal[]>(url+term).pipe(
          tap(
            data => {
              this.log(`fetched proposals`);
              this.loadingProposalsError = false;
              this.loadingService.setLoading(false);
            },
            error => {
              this.loadingProposalsError = true;
              this.loadingService.setLoading(false);
            }
          ),
          catchError(this.handleError<any>('Pesquisar proposta'))
        )
      )
    )
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
      this.validationErrors(error);

      // TODO: better job of transforming error for proposal consumption
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
