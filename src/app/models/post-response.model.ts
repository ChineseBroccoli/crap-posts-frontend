import { Post } from "./post.model";

export interface PostResponse {
    post: Post;
    voteStatus: string;
}