import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { DataPersistenceService } from './data-persistence.service';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const dataPersistenceService = inject(DataPersistenceService);
  const token = dataPersistenceService.get('accessToken');

  request = request.clone({
    setHeaders: {
      Authorization: token ? `Token ${token}` : '',
    },
  });

  return next(request);
};
