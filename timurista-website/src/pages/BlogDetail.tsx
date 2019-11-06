import React from "react";

function BlogDetail({ id }: { id: String }) {
  return (
    <div>
      <div>{id}</div>
      {JSON.stringify(id, undefined, 2)}
    </div>
  );
}

export default BlogDetail;
