import {
    Injectable,
  } from '@angular/core';
  import { Subject } from 'rxjs';
  
  @Injectable({
    providedIn: 'root',
  })
  export class SpinnerService {
    private count = 0;
  
    private spinnerSubject = new Subject<boolean>();
    isSpinning$ = this.spinnerSubject.asObservable();
  
  
    showSpinner() {
        this.count++;
        if(this.count === 1) this.spinnerSubject.next(true);
    }
  
    hideSpinner() {
        this.count--
        if(this.count === 0) this.spinnerSubject.next(false)
    }
  }
  