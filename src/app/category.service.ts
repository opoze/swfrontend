import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Category } from './category';
import { Observable, of, fromEvent } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { MessageService } from './message.service';
import { tap, catchError, map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { LoadingService } from './loading.service'
import { AuthService } from './auth.service'

@Injectable({
  providedIn: 'root'
})

export class CategoryService {

  private categoriesUrl = 'http://127.0.0.1:8000/category';
  private findUrl = 'http://127.0.0.1:8000/categoryfind';
  public httpError = false;
  public loadingCategoriesError = false;

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private loadingService: LoadingService,
    private authService: AuthService
  ) { }

  headers: HttpHeaders = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', this.authService.token);

  getCategories(): Observable<Category[]> {
    this.loadingService.setLoading(true);
    this.httpError = false;
    return this.http.get<Category[]>(this.categoriesUrl, {headers: this.headers})
    .pipe(
      tap(
        data => {
          this.log(`fetched categories`);
          this.loadingService.setLoading(false);
        },
        error => {
          this.httpError = true;
          this.loadingService.setLoading(false);
        }
      ),
      catchError(this.handleError('Get Categorias', []))
    );
  }

  getCategory(id: number): Observable<Category> {
    this.loadingService.setLoading(true);
    this.httpError = false;
    const url = `${this.categoriesUrl}/${id}`;
    return this.http.get<Category>(url, {headers: this.headers}).pipe(
      tap(
        data => {
          this.log(`fetched catgory id=${id}`);
          this.loadingService.setLoading(false);
        },
        error => {
          this.httpError = true;
          this.loadingService.setLoading(false);
        }
      ),
      catchError(this.handleError<Category>(`getCategory id=${id}`))
    );
  }

  removeCategory(id: number): Observable<any> {
    this.loadingService.setLoading(true);
    this.httpError = false;
    const url = `${this.categoriesUrl}/${id}`;
    return this.http.delete<any>(url, {headers: this.headers}).pipe(
      tap(
        data => {
          this.log(`deleted category id=${id}`);
          this.loadingService.setLoading(false);
        },
        error => {
          this.httpError = true;
          this.loadingService.setLoading(false);
        }
      ),
      catchError(this.handleError<any>(`removeCategory id=${id}`))
    );
  }

  updateCategory (category: Category): Observable<any> {
    this.loadingService.setLoading(true);
    this.httpError = false;
    const url = `${this.categoriesUrl}/${category.id}`;
    return this.http.post<Category>(url, category, {headers: this.headers}).pipe(
      tap(
        data => {
          this.messageService.add('Categoria alterada.', 'success');
          this.log(`updated category id=${category.id}`);
          this.loadingService.setLoading(false);
        },
        error => {
          this.httpError = true;
          this.messageService.add('Não foi possível alterar a categoria.', 'danger');
          this.loadingService.setLoading(false);
        }
      ),
      catchError(this.handleError<any>('Atualizar categoria'))
    );
  }

  storeCategory (category: Category): Observable<any> {
    this.loadingService.setLoading(true);
    this.httpError = false;
    const url = `${this.categoriesUrl}`;
    return this.http.post<Category>(url, category, {headers: this.headers}).pipe(
      tap(
        data => {
          this.messageService.add('Categoria inserida.', 'success');
          this.log(`insert category id=${category.id}`);
          this.loadingService.setLoading(false);
        },
        error => {
          this.httpError = true;
          this.messageService.add('Não foi possível adicionar a categoria.', 'danger');
          this.loadingService.setLoading(false);
        }
      ),
      catchError(this.handleError<any>('Inserir Categoria'))
    );
  }

  findCategoryByName(): Observable<Category[]> {
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
        (term) => this.http.get<Category[]>(url+term, {headers: this.headers}).pipe(
          tap(
            data => {
              this.log(`fetched categories`);
              this.loadingCategoriesError = false;
              this.loadingService.setLoading(false);
            },
            error => {
              this.loadingCategoriesError = true;
              this.loadingService.setLoading(false);
            }
          ),
          catchError(this.handleError<any>('Pesquisar usuários'))
        )
      )
    )
  }

  private log(message: string){
    console.log('CategoryService: ' + message);
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

      // TODO: better job of transforming error for category consumption
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
