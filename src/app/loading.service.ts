import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LoadingService {

  public loading: boolean = false;

  constructor() {
  }

  setLoading(loading: boolean) {
    this.loading = loading;
  }

  toggle() {
    this.loading = !this.loading;
  }


}
