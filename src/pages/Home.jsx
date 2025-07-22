// pages/Home.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

const Home = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await api.get("/news/");
        setNews(response.data);
      } catch (err) {
        setError("Failed to load news.");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const breakingNews = news.filter(n => n.is_breaking).slice(0, 5);
  const featured = news[0];
  const others = news.slice(1);

  if (loading) return <div className="text-center py-10">⏳ Loading news...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="w-[90%] mx-auto px-4 py-8">
      {/* 🎯 Featured */}
      {featured && (
        <div className="mb-12 rounded-lg overflow-hidden bg-white shadow-lg transition">
          <Link to={`/news/${featured.slug}`} className="block group">
            <div className="grid md:grid-cols-2 gap-6">
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full h-64 object-cover group-hover:scale-105 duration-300"
              />
              <div className="p-6">
                <h1 className="text-2xl md:text-3xl font-bold mb-3">{featured.title}</h1>
                <p className="text-gray-600 mb-4">
                  {featured.body.slice(0, 150)}...
                </p>
                <span className="text-sm text-gray-400 block">
                  {new Date(featured.date_posted).toLocaleDateString()}
                </span>
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* 🔥 Breaking */}
      {breakingNews.length > 0 && (
        <div className="bg-red-600 text-white py-2 px-4 rounded shadow mb-8 overflow-hidden">
          <marquee behavior="scroll" direction="left">
            {breakingNews.map(b => (
              <span key={b.id} className="mx-5 font-semibold">
                🚨 <Link to={`/news/${b.slug}`} className="underline hover:text-yellow-300">{b.title}</Link>
              </span>
            ))}
          </marquee>
        </div>
      )}

      {/* 📰 Latest */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {others.map(article => (
          <Link
            to={`/news/${article.slug}`}
            key={article.id}
            className="bg-white rounded-lg shadow hover:shadow-xl overflow-hidden transition transform hover:-translate-y-1"
          >
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">{article.title}</h2>
              <p className="text-sm text-gray-600 mb-3">{article.body.slice(0, 90)}...</p>
              <span className="text-xs text-gray-400">
                {new Date(article.date_posted).toLocaleDateString()}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
