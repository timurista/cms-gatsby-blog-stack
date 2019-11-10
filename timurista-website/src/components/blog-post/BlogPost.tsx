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
            <div className="hero-image">
                <picture>
                    {/* <source srcset={post.heroImage || ''}
            media="(min-width: 800px)"></source> */}
                    <img alt={post.heroImage.title} src={post.heroImage.imageUrl || ""}></img>
                </picture>
                <div className="overlay"></div>
            </div>
            <div className="contents">
                <h1>{post.title}</h1>
                <div><ReactMarkdown source={post.body || ''} /></div>
            </div>
        </div>
    )
}
export default BlogPost