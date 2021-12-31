import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import * as PostsActions from "../../store/posts/posts.actions";

@Component({
  selector: 'app-create-post-page',
  templateUrl: './create-post-page.component.html',
  styleUrls: ['./create-post-page.component.css']
})
export class CreatePostPageComponent {
  validateForm: FormGroup;

  submitForm(): void {
    if (this.validateForm.valid){
      this.store.dispatch(PostsActions.createPost({postCreate: this.validateForm.value }));
      this.resetForm();
    }
  }

  resetForm(){
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(key)) {
        this.validateForm.controls[key].markAsPristine();
        this.validateForm.controls[key].updateValueAndValidity();
      }
    }
  }

  resetFormClick(e: MouseEvent){
    e.preventDefault();
    this.resetForm();
  }

  constructor(private fb: FormBuilder, private store: Store<AppState>) {
    this.validateForm = this.fb.group({
      title: ['', [Validators.required]],
      text: ['', [Validators.required]]
    });
  }
}
