import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { from, Observable } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { User } from 'src/app/models/user.model';
import { AppState, GeneralPostsState, PostsState, selectGeneralPostsState, selectUserProfile, UserState } from 'src/app/store';
import * as PostsActions from "../../store/posts/posts.actions";


@Component({
  selector: 'app-posts-page',
  templateUrl: './posts-page.component.html',
  styleUrls: ['./posts-page.component.css']
})
export class PostsPageComponent implements OnInit {

  user: Observable<User | null>
  generalPostsState : Observable<GeneralPostsState>;

  constructor(private store: Store<AppState>) {
    this.generalPostsState = this.store.select(selectGeneralPostsState);
    this.user = this.store.select(selectUserProfile);
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
