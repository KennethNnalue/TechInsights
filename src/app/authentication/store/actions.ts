import { createActionGroup, props } from '@ngrx/store';
import { RegisterRequestInterface } from '../models/registerRequest.interface';
import { CurrentUserInterface } from '../../shared/models/currentUser.interface';
import { BackendErrorsInterface } from '../../shared/models/backendErrors.interface';

export const authActions = createActionGroup({
  source: 'auth',
  events: {
    Register: props<{ request: RegisterRequestInterface }>(),

    //enter events as string because of the space between the name
    'Register success': props<{ currentUser: CurrentUserInterface }>(),
    'Register failure': props<{ errors: BackendErrorsInterface }>(),
  },
});
