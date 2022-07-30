import { Schema, model, connect } from 'mongoose';

interface IPost {
  title: string;
  description: string;
}

const postSchema = new Schema<IPost>({
  title: { type: String, required: true },
  description: { type: String, required: true },
});

const Post = model<IPost>('Post', postSchema);

export default Post;
