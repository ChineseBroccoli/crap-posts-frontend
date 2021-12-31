import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostCreate } from 'src/app/models/post-create.model';
import { Post } from 'src/app/models/post.model';
import { PostResponse } from 'src/app/models/post-response.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  getAllPosts = (): Observable<PostResponse[]> => {
    return this.http.get<PostResponse[]>(`${environment.baseUrl}/api/v1/posts`);
  }

  getAllUserPosts = (userId: number): Observable<PostResponse[]> => {
    return this.http.get<PostResponse[]>(`${environment.baseUrl}/api/v1/posts/users/${userId}`);
  }

  getPostById = (postId: number): Observable<Post> => {
    return this.http.get<Post>(`${environment.baseUrl}/api/v1/posts/${postId}`);
  }

  getPostsByUserId = (userId: number): Observable<PostResponse[]> => {
    return this.http.get<PostResponse[]>(`${environment.baseUrl}/api/v1/posts/users/${userId}`);
  }

  createPost = (post: PostCreate): Observable<PostResponse> => {
    return this.http.post<PostResponse>(`${environment.baseUrl}/api/v1/posts`, post);
  }

  editPost = (postId: number, post: PostCreate): Observable<PostResponse> => {
    return this.http.put<PostResponse>(`${environment.baseUrl}/api/v1/posts/${postId}`, post);
  }

  deletePost = (postId: number): Observable<Post> => {
    return this.http.delete<Post>(`${environment.baseUrl}/api/v1/posts/${postId}`);
  }

  upvotePost = (postId: number): Observable<PostResponse> => {
    return this.http.put<PostResponse>(`${environment.baseUrl}/api/v1/posts/${postId}/upvote`, null);
  }

  downvotePost = (postId: number): Observable<PostResponse> => {
    return this.http.put<PostResponse>(`${environment.baseUrl}/api/v1/posts/${postId}/downvote`, null);
  }

  unvotePost = (postId: number): Observable<PostResponse> => {
    return this.http.put<PostResponse>(`${environment.baseUrl}/api/v1/posts/${postId}/unvote`, null);
  }
}
