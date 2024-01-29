import React from "react";

function ArticlePreview({ title, url }) {
  return (
    <a
      href={url}
      target="_top"
    >
      <div className="p-2 rounded-md bg-gray-50 hover:bg-gray-100 ring-1 ring-inset ring-gray-300">{title}</div>
    </a>
  );
}

export default ArticlePreview;
