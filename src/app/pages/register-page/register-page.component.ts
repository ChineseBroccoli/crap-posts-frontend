import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { Observable, of, switchMap } from 'rxjs';
import { AppState, selectUserFormErrors, UserState } from 'src/app/store';
import { environment } from 'src/environments/environment';
import * as UserActions from "../../store/user/user.actions";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  validateForm!: FormGroup;
  errorMessages: Observable<{ [fieldName: string]: string }>;

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls["password"].value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  updateConfirmValidator(): void {
    Promise.resolve().then(() => this.validateForm.controls["passwordConfirm"].updateValueAndValidity());
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
      this.store.dispatch(UserActions.register({ registerCredentials: this.validateForm.value }));
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

  constructor(private fb: FormBuilder, private store: Store<AppState>) {
    this.errorMessages = this.store.select(selectUserFormErrors);
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      passwordConfirm: [null, [Validators.required, this.confirmationValidator]],
      remember: [true]
    });
  }

  ngOnInit(): void {

  }

}
