import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState, getUserPostById, selectUserProfile } from 'src/app/store';
import * as UserActions from '../../store/user/user.actions';
import * as PostsActions from '../../store/posts/posts.actions';
import { Location } from '@angular/common';
import { Observable, of } from 'rxjs';
import { PostResponse } from 'src/app/models/post-response.model';

@Component({
  selector: 'app-edit-post-page',
  templateUrl: './edit-post-page.component.html',
  styleUrls: ['./edit-post-page.component.css']
})
export class EditPostPageComponent {

  validateForm: FormGroup;
  postId: number;

  submitForm(): void {
    if (this.validateForm.valid){
      console.log(this.validateForm.value);
      this.store.dispatch(PostsActions.editPost({ postId: this.postId, postCreate: this.validateForm.value }));
    }
  }

  resetFormClick(e: MouseEvent)
  {
    e.preventDefault();
    this.resetForm();
  }

  resetForm(){
    this.store.select(getUserPostById(this.postId)).subscribe(postResponse => {
      this.validateForm.controls["title"].setValue(postResponse?.post?.title);
      this.validateForm.controls["text"].setValue(postResponse?.post?.text);
    })
  }

  goBackClick(e: MouseEvent)
  {
    e.preventDefault();
    this.goBack();
  }

  goBack()
  {
    this.location.back();
  }

  deleteClick(e: MouseEvent)
  {
    e.preventDefault();
    this.delete();
  }

  delete()
  {
    this.store.dispatch(PostsActions.deletePost({ postId: this.postId }));
  }

  constructor(private fb: FormBuilder, private store: Store<AppState>, private route: ActivatedRoute, private location: Location) {
    this.validateForm = this.fb.group({
      title: ['', [Validators.required]],
      text: ['', [Validators.required]]
    });

    this.postId = Number(this.route.snapshot.paramMap.get('id'));
    
    this.resetForm();
  }
}
