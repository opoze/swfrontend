import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class MessageService {

  total: number;

  primary: string[] = [];
  secondary: string[] = [];
  success: string[] = [];
  danger: string[] = [];
  warning: string[] = [];
  info: string[] = [];
  dark: string[] = [];

  constructor() {
    this.total = 0;
  }

  add(message: string, classe: string){
    switch(classe){
      case 'primary': {
        this.total++; this.primary.push(message); break;
      }
      case 'secondary': {
        this.total++; this.secondary.push(message); break;
      }
      case 'success': {
        this.total++; this.success.push(message); break;
      }
      case 'danger': {
        this.total++; this.danger.push(message); break;
      }
      case 'info': {
        this.total++; this.info.push(message); break;
      }
      case 'dark': {
        this.total++; this.dark.push(message); break;
      }
    }
  }

  clear(){
    this.primary = [];
    this.secondary = [];
    this.success = [];
    this.danger = [];
    this.warning = [];
    this.info = [];
    this.dark = [];
    this.total = 0;
  }
}
