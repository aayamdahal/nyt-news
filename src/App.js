import React, { useState, useEffect } from "react";
import dotenv from "dotenv";
import SearchForm from "./SearchForm";
dotenv.config();
const App = () => {
  const [Articles, setArticles] = useState([]);
  const [term, setTerm] = useState("sports");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch(
          `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${term}&api-key=${process.env.REACT_APP_ARTICLES_API_KEY}`
        );

        const articles = await res.json();
        setArticles(articles.response.docs);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchArticles();
  }, [term]);

  return (
    <>
      <div className="showcase">
        <div className="overlay px-5">
          <h1 className="text-4xl font-bold text-white mb-4">
            Viewing articles about {term}
          </h1>
          <SearchForm searchText={(text) => setTerm(text)} />
        </div>
      </div>
      {isLoading ? (
        <h1 className="text-center mt-20 font-bold text-6xl">Loading...</h1>
      ) : (
        <section className=" section px-5 pt-10 pb-20">
          {Articles.map((article) => {
            const {
              abstract,
              headline: { main },
              byline: { original },
              lead_paragraph,
              news_desk,
              section_name,
              web_url,
              word_count,
            } = article;

            return (
              <article key={abstract} className="article bg-white py-10 px-5">
                <h2 className="font-bold text-2xl mb-5">{main}</h2>
                <p>{abstract}</p>
                <p>{lead_paragraph}</p>
                <ul className="my-4">
                  <li style={{ fontWeight: "500" }}>{original}</li>
                  <li>
                    <span className="font-bold">News Desk:</span> {news_desk}
                  </li>
                  <li>
                    <span className="font-bold">Section Name: </span>
                    {section_name}{" "}
                  </li>
                  <li>
                    <span className="font-bold">Word Count:</span> {word_count}
                  </li>
                </ul>
                <a
                  className="underline"
                  href={web_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  Web Resource
                </a>
              </article>
            );
          })}
        </section>
      )}
    </>
  );
};

export default App;
