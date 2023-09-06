import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  selectIsSubmitting,
  selectValidationErrors,
} from '../../store/reducers';
import { combineLatest } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthStateInterface } from '../../models/authState.interface';
import { authActions } from '../../store/actions';
import { LoginRequestInterface } from '../../models/loginRequest.interface';
import { BackendErrorMessagesComponent } from '../../../shared/components/backend-error-messages/backend-error-messages.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'ti-login',
  standalone: true,
  imports: [
    CommonModule,
    BackendErrorMessagesComponent,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  isSubmitting$ = this.store.select(selectIsSubmitting);

  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
  });

  constructor(
    private fb: FormBuilder,
    private store: Store<{ auth: AuthStateInterface }>,
  ) {}
  onSubmit() {
    const request: LoginRequestInterface = {
      user: this.form.getRawValue(),
    };
    this.store.dispatch(authActions.login({ request }));
  }
}
