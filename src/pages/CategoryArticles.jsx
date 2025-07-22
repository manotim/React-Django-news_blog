import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const CategoryArticles = () => {
  const { slug } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/news/?category=${slug}`)
      .then((response) => {
        setArticles(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching articles:", error);
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <p className="text-center mt-10">Loading articles...</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 capitalize">
        {slug.replace("-", " ")} News
      </h1>

      {articles.length === 0 ? (
        <p>No articles found in this category.</p>
      ) : (
        <div className="space-y-6">
          {articles.map((article) => (
            <div
              key={article.id}
              className="border-b pb-4"
            >
              <h2 className="text-xl font-semibold">{article.title}</h2>
              <p className="text-gray-700">{article.summary}</p>
              <a
                href={`/news/${article.slug}`}
                className="text-red-600 hover:underline"
              >
                Read more →
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryArticles;
