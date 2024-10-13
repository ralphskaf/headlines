import React from "react";

const NewsCard = ({ article }) => {
  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div
        className="card h-100 d-flex flex-column"
        data-aos="fade-up"
        data-aos-duration="2000"
      >
        <img
          src={article.urlToImage}
          alt={article.title}
          className="card-img-top"
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{article.title}</h5>
          <p className="card-text">
            <small className="text-muted">
              Source: {article.source.name} <br />
              Published: {new Date(article.publishedAt).toLocaleDateString()}
            </small>
          </p>
          <div className="mt-auto">
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn read-more-btn"
            >
              Read more
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
