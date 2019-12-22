import React, { useEffect } from "react";
import { inject, observer } from "mobx-react";
import { BlogStore } from "../store/BlogStore";
import PaperLong from "../components/paper-long/PaperLong";
import get from "lodash.get";

function PaperDetail({ id, blogStore }: { id: String; blogStore?: BlogStore }) {
  useEffect(() => {
    window.scrollTo(0, 0);
    if (blogStore) {
      blogStore.fetchCurrentPaper(id);
    }
  }, [blogStore, id]);
  const paper = get(blogStore, "currentPaper", null);

  return (
    <div className="Blog-Detail">
      {paper != null ? <PaperLong paper={paper} /> : null}
    </div>
  );
}

export default inject("blogStore")(observer(PaperDetail));
