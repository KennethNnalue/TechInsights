import { CurrentUserInterface } from '../../shared/models/currentUser.interface'
import { BackendErrorsInterface } from '../../shared/models/backendErrors.interface'

export interface AuthStateInterface {
  isSubmitting: boolean
  currentUser: CurrentUserInterface | null | undefined
  isLoading: boolean
  validationErrors: BackendErrorsInterface | null
}
