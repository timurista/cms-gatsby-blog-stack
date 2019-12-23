import React, { useEffect } from "react";
import { inject, observer } from "mobx-react";
import { BlogStore } from "../store/BlogStore";
import BlogPost from "../components/blog-post/BlogPost";
import get from "lodash.get";

function BlogDetail({ id, blogStore }: { id: String; blogStore?: BlogStore }) {
  console.log(id);
  useEffect(() => {
    window.scrollTo(0, 0);
    if (blogStore) {
      blogStore.fetchCurrentPost(id);
    }
  }, [blogStore, id]);
  const post = get(blogStore, "currentPost", null);

  return (
    <div className="Blog-Detail">
      {post != null ? <BlogPost post={post} /> : null}
    </div>
  );
}

export default inject("blogStore")(observer(BlogDetail));
