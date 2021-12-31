import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { lastValueFrom, Observable, Observer, of, switchMap, take, takeLast } from 'rxjs';
import { AppState, selectUserFormErrors } from 'src/app/store';
import * as UserActions from 'src/app/store/user/user.actions';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})

export class LoginPageComponent implements OnInit {

  validateForm!: FormGroup;
  errorMessages: Observable<{ [fieldName: string]: string }>;

  constructor(private fb: FormBuilder, private store: Store<AppState>) {
    this.errorMessages = this.store.select(selectUserFormErrors);
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

  resetValidation() {
    Object.values(this.validateForm.controls).forEach(control => {
      control.setErrors(null);
      control.markAsDirty();
      control.updateValueAndValidity({ onlySelf: true });
    });
  }

  submitForm(): void {
    this.resetValidation();
    if (this.validateForm.valid) {
      this.store.dispatch(UserActions.clearErrorMessages());
      this.store.dispatch(UserActions.login({ loginCredentials: this.validateForm.value }));
      this.errorMessages.pipe(switchMap(errorMessages => of(errorMessages))).subscribe(errorMessages => {
        Object.keys(this.validateForm.controls).forEach(fieldName => {
          const control = this.validateForm.controls[fieldName]
          if (errorMessages[fieldName]) {
            control.setErrors({ [fieldName]: true });
          }
          else {
            control.setErrors(null);
          }
        })
      });
    }
  }

  ngOnInit(): void {
  }
}
