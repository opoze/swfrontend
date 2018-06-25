import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Suplier } from './suplier';
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

export class SuplierService {

  private supliersUrl = 'http://127.0.0.1:8000/suplier';
  private findUrl = 'http://127.0.0.1:8000/suplierfind';
  public httpError = false;
  public loadingSupliersError = false;

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private loadingService: LoadingService
  ) { }

  getSupliers(): Observable<Suplier[]> {
    this.loadingService.setLoading(true);
    this.httpError = false;
    return this.http.get<Suplier[]>(this.supliersUrl)
    .pipe(
      tap(
        data => {
          this.log(`fetched supliers`);
          this.loadingService.setLoading(false);
        },
        error => {
          this.httpError = true;
          this.loadingService.setLoading(false);
        }
      ),
      catchError(this.handleError('Get Fornecedores', []))
    );
  }

  getSuplier(id: number): Observable<Suplier> {
    this.loadingService.setLoading(true);
    this.httpError = false;
    const url = `${this.supliersUrl}/${id}`;
    return this.http.get<Suplier>(url).pipe(
      tap(
        data => {
          this.log(`fetched suplier id=${id}`);
          this.loadingService.setLoading(false);
        },
        error => {
          this.httpError = true;
          this.loadingService.setLoading(false);
        }
      ),
      catchError(this.handleError<Suplier>(`getSuplier id=${id}`))
    );
  }

  updateSuplier (suplier: Suplier): Observable<any> {
    this.loadingService.setLoading(true);
    this.httpError = false;
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    const url = `${this.supliersUrl}/${suplier.id}`;
    return this.http.post<Suplier>(url, suplier, {headers: headers}).pipe(
      tap(
        data => {
          this.messageService.add('Fornecedor alterado.', 'success');
          this.log(`updated suplier id=${suplier.id}`);
          this.loadingService.setLoading(false);
        },
        error => {
          this.httpError = true;
          this.messageService.add('Não foi possível alterar o fornecedor.', 'danger');
          this.loadingService.setLoading(false);
        }
      ),
      catchError(this.handleError<any>('Atualizar fornecedor'))
    );
  }

  storeSuplier (suplier: Suplier): Observable<any> {
    this.loadingService.setLoading(true);
    this.httpError = false;
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    const url = `${this.supliersUrl}`;
    return this.http.post<Suplier>(url, suplier, {headers: headers}).pipe(
      tap(
        data => {
          this.messageService.add('Fornecedor inserido.', 'success');
          this.log(`insert suplier id=${suplier.id}`);
          this.loadingService.setLoading(false);
        },
        error => {
          this.httpError = true;
          this.messageService.add('Não foi possível adicionar o fornecedor.', 'danger');
          this.loadingService.setLoading(false);
        }
      ),
      catchError(this.handleError<any>('Inserir Fornecedor'))
    );
  }

  findSuplierByName(): Observable<Suplier[]> {
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
        (term) => this.http.get<Suplier[]>(url+term).pipe(
          tap(
            data => {
              this.log(`fetched supliers`);
              this.loadingSupliersError = false;
              this.loadingService.setLoading(false);
            },
            error => {
              this.loadingSupliersError = true;
              this.loadingService.setLoading(false);
            }
          ),
          catchError(this.handleError<any>('Pesquisar fornecedores'))
        )
      )
    )
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
      this.validationErrors(error);

      // TODO: better job of transforming error for suplier consumption
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
