import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import {SpinnerService} from '@andist/ui'

export const DirectusInterceptor: HttpInterceptorFn = (req, next) => {
  const spinner = inject(SpinnerService);
  spinner.showSpinner()
  return next(req).pipe(finalize(() => spinner.hideSpinner()));
};