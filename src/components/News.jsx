import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import NewsCard from "./NewsCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const News = () => {
  const [articles, setArticles] = useState([]);
  const [visibleArticles, setVisibleArticles] = useState(6); // Number of articles to display initially
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  const fetchNews = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/news");
      console.log(response.data);
      setArticles(response.data); // Store all articles
    } catch (err) {
      toast.error("Failed to load news. Please try again later.");
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const isValidArticle = (article) => {
    return (
      article.title &&
      article.source.name &&
      article.publishedAt &&
      article.url &&
      article.urlToImage &&
      article.title !== "[Removed]" &&
      article.source.name !== "[Removed]" &&
      article.publishedAt !== "[Removed]" &&
      article.url !== "[Removed]" &&
      article.urlToImage !== "[Removed]"
    );
  };

  const loadMoreArticles = () => {
    setVisibleArticles((prevVisibleArticles) => prevVisibleArticles + 6);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <div className="row my-5">
        <div className="col-12 col-md-8">
          <h1
            className="text-center text-md-start"
            data-aos="fade"
            data-aos-duration="1500"
          >
            Today's Headlines
          </h1>
        </div>
        <div className="col-12 col-md-4 mt-3 mt-md-0">
          <div className="input-group">
            <span className="input-group-text">
              <FontAwesomeIcon icon={faSearch} />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search news..."
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
        </div>
      </div>
      <div className="row">
        {filteredArticles
          .filter(isValidArticle)
          .slice(0, visibleArticles)
          .map((article, index) => (
            <NewsCard key={index} article={article} />
          ))}
      </div>
      {visibleArticles < filteredArticles.length && (
        <div className="text-center my-4">
          <button className="btn btn-secondary" onClick={loadMoreArticles}>
            More Headlines
          </button>
        </div>
      )}
    </div>
  );
};

export default News;
