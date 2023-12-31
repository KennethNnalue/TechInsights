import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { authActions } from './actions';
import { CurrentUserInterface } from '../../shared/models/currentUser.interface';
import { DataPersistenceService } from '../../shared/services/data-persistence.service';
import { Router } from '@angular/router';

export const registerEffect = createEffect(
  // the first argument for this createEffect method is a function, and we will pass one below:
  // We inject all actions and our authService to this function
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
    dataPersistenceService = inject(DataPersistenceService),
  ) => {
    return actions$.pipe(
      // We use ofType operator to limit the actions we are listening for to the required actions
      ofType(authActions.register),
      switchMap(({ request }) => {
        return authService.register(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            dataPersistenceService.set('accessToken', currentUser.token);
            return authActions.registerSuccess({ currentUser });
          }),
          catchError((errorResponse) => {
            return of(
              authActions.registerFailure({
                errors: errorResponse.error.errors,
              }),
            );
          }),
        );
      }),
    );
  },

  //second parameter is our options, and we are using functional programming to write our effect
  { functional: true },
);

export const redirectAfterRegisterEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(authActions.registerSuccess),
      tap(() => {
        router.navigateByUrl('/');
      }),
    );
  },
  { functional: true, dispatch: false },
);

export const loginEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
    dataPersistenceService = inject(DataPersistenceService),
  ) => {
    return actions$.pipe(
      ofType(authActions.login),
      switchMap(({ request }) => {
        return authService.login(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            dataPersistenceService.set('accessToken', currentUser.token);
            return authActions.loginSuccess({ currentUser });
          }),
          catchError((errorResponse) => {
            return of(
              authActions.loginFailure({ errors: errorResponse.error.errors }),
            );
          }),
        );
      }),
    );
  },
  { functional: true },
);

export const redirectAfterLoginEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(authActions.loginSuccess),
      tap(() => {
        router.navigateByUrl('/');
      }),
    );
  },
  { functional: true, dispatch: false },
);

export const getCurrentUserEffect = createEffect(
  (
    actions$ = inject(Actions),
    dataPersistenceService = inject(DataPersistenceService),
    authService = inject(AuthService),
  ) => {
    return actions$.pipe(
      ofType(authActions.getCurrentUser),
      switchMap(() => {
        const token = localStorage.getItem('accessToken');

        //confirm that we have a token before making request to get currentUser otherwise
        if (!token) {
          return of(authActions.getCurrentUserFailure());
        }
        return authService.getCurrentUser().pipe(
          map((currentUser: CurrentUserInterface) => {
            return authActions.getCurrentUserSuccess({ currentUser });
          }),
          catchError(() => {
            return of(authActions.getCurrentUserFailure());
          }),
        );
      }),
    );
  },
  { functional: true },
);
