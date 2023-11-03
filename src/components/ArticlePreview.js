import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function ArticlePreview({ article_link, picture, heading, summary, authors }) {
  return (
    <a
      className="container"
      href={article_link}
      target="_blank"
      style={{ textDecoration: "none", color: "black" }}
      rel="noreferrer"
    >
      <div class="card">
        <div class="card-header text-left">Related article:</div>
        <img src={picture} class="card-img-top" alt="article" />
        <div class="card-body">
          <h6 class="card-title">{heading}</h6>
          <p class="card-text text-gray-500">{summary}...</p>
        </div>
        <div class="card-footer">
          <small class="text-muted">
            Authors: {authors && authors.join(" | ")}
          </small>
        </div>
      </div>
    </a>
  );
}

export default ArticlePreview;
