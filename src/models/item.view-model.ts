import { Album } from './album.model';
import { Post } from './post.model';
import { User } from './user.model';

export interface Item {
	users: User;
	posts: Post;
	albums: Album;
}
