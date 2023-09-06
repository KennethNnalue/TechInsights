import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { Store } from '@ngrx/store'
import { authActions } from '../../store/actions'
import { RegisterRequestInterface } from '../../models/registerRequest.interface'
import { RouterLink } from '@angular/router'
import {
  selectIsSubmitting,
  selectValidationErrors,
} from '../../store/reducers'
import { AuthStateInterface } from '../../models/authState.interface'
import { combineLatest } from 'rxjs'
import { BackendErrorMessagesComponent } from '../../../shared/components/backend-error-messages/backend-error-messages.component'

@Component({
  selector: 'ti-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    BackendErrorMessagesComponent,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  })

  isSubmitting$ = this.store.select(selectIsSubmitting)

  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
  })

  constructor(
    private fb: FormBuilder,
    private store: Store<{ auth: AuthStateInterface }>,
  ) {}
  onSubmit() {
    console.log('form', this.form.getRawValue())
    const request: RegisterRequestInterface = {
      user: this.form.getRawValue(),
    }
    this.store.dispatch(authActions.register({ request }))
  }
}
