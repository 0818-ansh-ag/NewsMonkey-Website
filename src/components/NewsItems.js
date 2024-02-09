import React from "react";

const NewsItems = (props) => {
  let { title, description, imageUrl, newsurl, publishedAt, author, source } =
    props;
  return (
    <div style={{ marginBottom: "2rem" }}>
      <div className="card">
        <img src={imageUrl} alt="..." />
        <span
          className="position-absolute top-0 start-100  badge rounded-pill bg-danger"
          style={{ zIndex: "1", transform: "translate(-90%,-50%)" }}
        >
          {source}
        </span>
        <div className="card-body">
          <h5 className="card-title">{title}...</h5>
          <p className="card-text">{description}...</p>
          <p className="card-text">
            <small className="text-muted">
              By {author ? author : "Unknown"} on{" "}
              {new Date(publishedAt).toGMTString()}
            </small>
          </p>
          <a
            rel="noreferrer"
            href={newsurl}
            target="_blank"
            className="btn btn-sm btn-dark"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItems;
