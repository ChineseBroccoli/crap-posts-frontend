import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { PostResponse } from 'src/app/models/post-response.model';
import { GeneralPostsState, selectUserPostsState, selectUserProfile, UserPostsState } from 'src/app/store';
import { environment } from 'src/environments/environment';
import * as PostsActions from '../../store/posts/posts.actions';

@Component({
  selector: 'app-my-posts-page',
  templateUrl: './my-posts-page.component.html',
  styleUrls: ['./my-posts-page.component.css']
})
export class MyPostsPageComponent implements OnInit {

  userPostsState: Observable<UserPostsState>

  constructor(private store: Store<UserPostsState>) {
    this.userPostsState = this.store.select(selectUserPostsState); 
  }

  ngOnInit(): void {
  }
    
  upvotePost(postId: number){
    console.log("upvotePost");
    this.store.dispatch(PostsActions.upvotePost({ postId }));
  }

  downvotePost(postId: number){
    console.log("downvotePost");
    this.store.dispatch(PostsActions.downvotePost({ postId }));
  }

  unvotePost(postId: number) {
    console.log("unvotePost");
    this.store.dispatch(PostsActions.unvotePost({ postId }));
  }
}
