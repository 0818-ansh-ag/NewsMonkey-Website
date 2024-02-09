import React, { useEffect, useState } from "react";
import NewsItems from "./NewsItems";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
// import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticle] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const updateNews = async () => {
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticle(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  };

  useEffect(() => {
    document.title = `${toUpperFirstLetter(props.category)} - NewsMonkey`;
    updateNews();
    // eslint-disable-next-line
  }, []);

  const handlePrev = async () => {
    setPage(page - 1);
    updateNews();
  };

  const handleNext = async () => {
    setPage(page + 1);
    updateNews();
  };

  const toUpperFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // fetchMoreData = async () => {
  //   setState({ page: state.page + 1 });
  //   const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=6647341cc78c48cc9c62fd5307b7ccfc&page=${state.page}&pageSize=${props.pageSize}`;
  //   let data = await fetch(url);
  //   let parsedData = await data.json();
  //   setState({
  //     articles: state.articles.concat(parsedData.articles),
  //     totalResults: parsedData.totalResults,
  //   });
  // };

  return (
    <>
      <h2
        className="text-center"
        style={{ marginTop: "4.5rem", marginBottom: "2rem" }}
      >
        NewsMonkey - Top {toUpperFirstLetter(props.category)} Headlines
      </h2>

      {loading && <Spinner />}

      {/* <InfiniteScroll
          dataLength={state.articles.length}
          next={fetchMoreData}
          hasMore={state.articles.length !== state.totalResults}
          loader={<Spinner />}
        > */}
      <div className="container my-3">
        <div className="row my-3">
          {!loading &&
            articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItems
                    title={element.title ? element.title.slice(0, 45) : " "}
                    description={
                      element.description
                        ? element.description.slice(0, 60)
                        : " "
                    }
                    imageUrl={
                      !element.urlToImage
                        ? "https://images.indianexpress.com/2023/05/dc-vs-csk-live.jpeg"
                        : element.urlToImage
                    }
                    newsurl={element.url}
                    publishedAt={element.publishedAt}
                    author={element.author}
                    source={element.source.name}
                  />
                </div>
              );
            })}
        </div>
      </div>
      {/* </InfiniteScroll> */}

      <div className="container my-3 d-flex justify-content-between">
        <button
          type="button"
          onClick={handlePrev}
          disabled={page <= 1}
          className="btn btn-dark btn-sm"
        >
          &larr; Previous
        </button>
        <button
          type="button"
          onClick={handleNext}
          disabled={page + 1 > Math.ceil(totalResults / props.pageSize)}
          className="btn btn-dark btn-sm"
        >
          Next &rarr;
        </button>
      </div>
    </>
  );
};

News.defaultProps = {
  country: "in",
  pageSize: 6,
  category: "general",
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
