import { Injectable } from '@angular/core';
import { HttpEvent, HttpClient, HttpHeaders, HttpRequest, HttpEventType } from '@angular/common/http';
import { Proposal } from './proposal';
import { Config } from './config';
import { Status } from './status';
import { Observable, of, fromEvent } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { MessageService } from './message.service';
import { last, tap, catchError, map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { LoadingService } from './loading.service'
import { AuthService } from './auth.service'

@Injectable({
  providedIn: 'root'
})

export class ProposalService {

  private proposalsUrl = 'http://127.0.0.1:8000/proposal';
  private proposalTimeUrl = 'http://127.0.0.1:8000/proposaltime';
  private proposalStatusHistoryUrl = 'http://127.0.0.1:8000/proposalstatushistory';
  private suplierProposalUrl = 'http://127.0.0.1:8000/proposals';
  private findUrl = 'http://127.0.0.1:8000/proposalfind';
  private proposalUploadFileUrl = 'http://127.0.0.1:8000/proposaluploadfile';
  private proposalDownloadFileUrl = 'http://127.0.0.1:8000/proposaldownloadfile';
  public httpError = false;
  public loadingProposalsError = false;
  public uploadProgress: number = 0;

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private loadingService: LoadingService,
    private authService: AuthService
  ) { }

  headers: HttpHeaders = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', this.authService.token);

  getProposals(id: number): Observable<Proposal[]> {
    this.loadingService.setLoading(true);
    this.httpError = false;
    const url = `${this.suplierProposalUrl}/${id}`;
    return this.http.get<Proposal[]>(url, {headers: this.headers})
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

  removeProposal(id: number): Observable<any> {
    this.loadingService.setLoading(true);
    this.httpError = false;
    const url = `${this.proposalsUrl}/${id}`;
    return this.http.delete<any>(url, {headers: this.headers}).pipe(
      tap(
        data => {
          this.log(`deleted proposal id=${id}`);
          this.loadingService.setLoading(false);
        },
        error => {
          this.httpError = true;
          this.loadingService.setLoading(false);
        }
      ),
      catchError(this.handleError<any>(`removeProposal id=${id}`))
    );
  }

  getProposal(id: number): Observable<Proposal> {
    this.loadingService.setLoading(true);
    this.httpError = false;
    const url = `${this.proposalsUrl}/${id}`;
    return this.http.get<Proposal>(url, {headers: this.headers}).pipe(
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
    return this.http.get<Config>(this.proposalTimeUrl, {headers: this.headers}).pipe(
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
    return this.http.get<Status[]>(url, {headers: this.headers}).pipe(
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
      catchError(this.handleError<Status[]>('getProposalStatusHistory'))
    );
  }

  approveProposal(id: number): Observable<Status[]> {
    this.loadingService.setLoading(true);
    this.httpError = false;
    const url = `${this.proposalStatusHistoryUrl}/${id}`;
    return this.http.post<Status[]>(url, {status: 'A'}, {headers: this.headers}).pipe(
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
    const url = `${this.proposalStatusHistoryUrl}/${id}`;
    return this.http.post<Status[]>(url, {status: 'R'}, {headers: this.headers}).pipe(
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



  /** Return distinct message for sent, upload progress, & response events */
  private getEventMessage(event: HttpEvent<any>, file: File) {
    switch (event.type) {
      case HttpEventType.Sent: {
        const sizeInMb = (file.size / 1024).toFixed(2);
        //this.messageService.add(`Enviando arquivo: "${file.name}", tamanho: ${sizeInMb}KB.`, 'info');
        break;
      }
      case HttpEventType.UploadProgress:{
        this.uploadProgress = Math.round(100 * event.loaded / event.total);
        break;
      }
      case HttpEventType.Response:{
        this.messageService.add(`Arquivo "${file.name}" foi enviando!`, 'success');
        break;
      }
      default:
        return;
    }
  }

  showProgress(message){
    this.messageService.add(message, 'info');
  }

  uploadFile (id: number, file: File): Observable<any> {
    //FormData
    let formData: FormData = new FormData();
    formData.append('file', file, file.name);
    //Request
    const req = new HttpRequest('POST', `${this.proposalUploadFileUrl}/${id}`, formData, {
      reportProgress: true
    });
    // Return Observable
    return this.http.request(req).pipe(
      map(event => this.getEventMessage(event, file)),
      // tap(message => this.showProgress(message)),
      last(),
      catchError(this.handleError('Upload de arquivo'))
    );

  }

  downloadFile(id: number): Observable<any> {
    this.loadingService.setLoading(true);
    this.httpError = false;
    const url = `${this.proposalDownloadFileUrl}/${id}`;
    return this.http.get(url, {headers: this.headers, responseType: 'blob' as 'blob'}).pipe(
      tap(
        data => {
          this.log(`fetched proposal file id=${id}`);
          this.loadingService.setLoading(false);
        },
        error => {
          this.httpError = true;
          this.loadingService.setLoading(false);
          this.messageService.add('Não foi possível carreagar o arquivo.', 'danger');

        }
      ),
      catchError(this.handleError(`downloadFile id=${id}`))
    );
  }


  updateProposal (proposal: Proposal): Observable<any> {
    this.loadingService.setLoading(true);
    this.httpError = false;
    const url = `${this.proposalsUrl}/${proposal.id}`;

    // Parse data to API
    let aux = {
      id: proposal.id,
      name: proposal.name,
      category: proposal.category.id,
      suplier: proposal.suplier.id,
      value: proposal.value,
      description: proposal.description
    }

    return this.http.post<Proposal>(url, aux, {headers: this.headers}).pipe(
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
    return this.http.post<Config>(this.proposalTimeUrl, proposaltime, {headers: this.headers}).pipe(
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
    const url = `${this.proposalsUrl}`;

    // Parse data to API
    let aux = {
      id: proposal.id,
      name: proposal.name,
      category: proposal.category.id,
      suplier: proposal.suplier.id,
      value: proposal.value,
      description: proposal.description
    }

    return this.http.post<Proposal>(url, aux, {headers: this.headers}).pipe(
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

  findProposalByString(): Observable<Proposal[]> {
    this.loadingService.setLoading(true);
    const url = `${this.findUrl}/`;
    const searchBox = document.getElementById('search_box1');
    return fromEvent(searchBox, 'input').pipe(
      map((e: any) => e.target.value),
      filter(text => text.length > 0),
      debounceTime(500),
      distinctUntilChanged(),
      // switchMap((term) => ajax(url+term)),
      switchMap(
        (term) => this.http.get<Proposal[]>(url+term, {headers: this.headers}).pipe(
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

  findProposalByDate(): Observable<Proposal[]> {
    this.loadingService.setLoading(true);
    const url = `${this.findUrl}/`;
    const searchBox = document.getElementById('search_box2');
    return fromEvent(searchBox, 'input').pipe(
      map((e: any) => e.target.value),
      filter(text => text.length > 0),
      debounceTime(500),
      distinctUntilChanged(),
      // switchMap((term) => ajax(url+term)),
      switchMap(
        (term) => this.http.get<Proposal[]>(url+term, {headers: this.headers}).pipe(
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
      if(typeof error.error != 'undefined' && error.error != null){
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
