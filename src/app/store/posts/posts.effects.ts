import { HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of, switchMap, tap } from "rxjs";
import { PostsService } from "src/app/service/posts/posts.service";
import * as PostsActions from "./posts.actions";

@Injectable()
export class PostsEffects {
    getGeneralPosts$ = createEffect(() => this.actions$.pipe(
        ofType(PostsActions.getGeneralPosts),
        exhaustMap(action => 
            this.postsService.getAllPosts().pipe(
                map(generalPosts => PostsActions.getGeneralPostsSuccess({ generalPosts }))
            )
        )
    ));

    getUserPosts$ = createEffect(() => this.actions$.pipe(
        ofType(PostsActions.getUserPosts),
        exhaustMap(action =>
            this.postsService.getAllUserPosts(action.userId).pipe(
                map(userPosts => PostsActions.getUserPostsSuccess({ userPosts }))
            )
        )
    ))

    createPost$ = createEffect(() => this.actions$.pipe(
        ofType(PostsActions.createPost),
        exhaustMap(action =>this.postsService.createPost(action.postCreate).pipe(
            map(postResponse => PostsActions.createPostSuccess({ postResponse }))
        ))
    ))

    createPostSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(PostsActions.createPostSuccess),
        tap(() => this.router.navigate(["/my-posts"]))
    ), { dispatch: false })

    editPost$ = createEffect(() => this.actions$.pipe(
        ofType(PostsActions.editPost),
        exhaustMap(action => this.postsService.editPost(action.postId, action.postCreate).pipe(
            map(postResponse => PostsActions.editPostSuccess({ postResponse }))
        ))
    ))

    editPostSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(PostsActions.editPostSuccess),
        tap(() => this.router.navigate(["/my-posts"]))
    ), { dispatch: false })

    deletePost$ = createEffect(() => this.actions$.pipe(
        ofType(PostsActions.deletePost),
        exhaustMap(action => this.postsService.deletePost(action.postId).pipe(
            map(post => PostsActions.deletePostSuccess({ postId: post.id }))
        ))
    ))

    deletePostSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(PostsActions.deletePostSuccess),
        tap(() => this.router.navigate(["/my-posts"]))
    ), { dispatch: false })

    upvotePosts$ = createEffect(() => this.actions$.pipe(
        ofType(PostsActions.upvotePost),
        switchMap(action => this.postsService.upvotePost(action.postId).pipe(
            map(postResponse => PostsActions.votePostSuccess({ postResponse })),
            catchError(errorResponse => of(PostsActions.votePostFail({ errorResponse })))
        ))
    ));

    downvotePosts$ = createEffect(() => this.actions$.pipe(
        ofType(PostsActions.downvotePost),
        switchMap(action => this.postsService.downvotePost(action.postId).pipe(
            map(postResponse => PostsActions.votePostSuccess({ postResponse })),
            catchError(errorResponse =>  of(PostsActions.votePostFail({ errorResponse })))
        ))
    ));

    unvotePost$ = createEffect(() => this.actions$.pipe(
        ofType(PostsActions.unvotePost),
        switchMap(action => this.postsService.unvotePost(action.postId).pipe(
            map(postResponse => PostsActions.votePostSuccess({ postResponse })),
            catchError(errorResponse => of(PostsActions.votePostFail({ errorResponse })))
        ))
    ))

    voteFail$ = createEffect(() => this.actions$.pipe(
        ofType(PostsActions.votePostFail),
        tap((errorResponse) => {
            if (errorResponse.errorResponse.status === 403){
                this.router.navigate(["/login"]);
            }
        })
    ), { dispatch: false })

    constructor(private actions$ : Actions, private postsService: PostsService, private router: Router) {}
}