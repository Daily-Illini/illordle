import React from "react";

function ArticlePreview({ title, url }) {
  return (
    <a
      className="container"
      href={url}
      target="_blank"
      style={{ textDecoration: "none", color: "black" }}
      rel="noreferrer"
    >
      <div class="card-body p-1 rounded-md bg-gray-50 hover:bg-gray-100 ring-1 ring-inset ring-gray-300">{title}</div>
    </a>
  );
}

export default ArticlePreview;
