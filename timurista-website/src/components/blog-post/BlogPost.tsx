import React from 'react';
import { Post } from '../../store/BlogStore';
import "./BlogPost.scss"
import ReactMarkdown from 'react-markdown';

export interface BlogPostProps {
    post: Post
}

function BlogPost({ post }: BlogPostProps) {
    console.log('post', post)
    return(
        <div className="Blog-Post">
            <h1>{post.title}</h1>
            <div><ReactMarkdown source={post.body || ''} /></div>
        </div>
    )
}
export default BlogPost