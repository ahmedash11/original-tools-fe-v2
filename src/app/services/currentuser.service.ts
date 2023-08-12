import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrentuserService {
  //Observable Source
  private currentUser = new BehaviorSubject(null);
  currentUser$ = this.currentUser.asObservable();

  setUser(user: any) {
    this.currentUser.next(user);
  }
  getUser() {
    return this.currentUser$;
  }

  constructor() {
    let result = localStorage.getItem('x-current-user');
    if (result) {
      result = JSON.parse(result ?? '');
      this.setUser(result);
    }
  }
}
