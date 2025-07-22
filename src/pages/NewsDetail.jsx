// pages/NewsDetail.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";

const NewsDetail = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [liked, setLiked] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!localStorage.getItem("token");

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await api.get(`/news/${slug}/`);
        setArticle(res.data);
        setLiked(res.data.is_liked);
        const commentRes = await api.get(`/news/${res.data.slug}/comments/`);
        setComments(commentRes.data);
      } catch (err) {
        console.error("Error loading article:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [slug]);

  const handleLikeToggle = async () => {
    if (!isAuthenticated) return alert("You must log in to like this post.");

    try {
      const res = await api.post(`/news/${article.slug}/like/`);
      setLiked(res.data.liked);
      setArticle({ ...article, likes_count: res.data.likes_count });
    } catch (err) {
      console.error("Like error:", err);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) return alert("You must log in to comment.");
    if (!newComment.trim()) return;

    try {
      const res = await api.post(`/news/${article.slug}/comments/`, {
        news: article.id,
        name: "John Doe", // 🔁 Replace with user's real info
        email: "john@example.com",
        comment: newComment,
      });

      setComments([res.data, ...comments]);
      setNewComment("");
    } catch (err) {
      console.error("Comment error:", err.response?.data);
    }
  };

  if (loading) return <div className="text-center py-10">Loading article...</div>;
  if (!article) return <div className="text-center py-10 text-red-500">News not found.</div>;

  return (
    <div className="w-[90%] mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>

      {article.image && (
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-72 object-cover rounded shadow mb-6"
        />
      )}

      <div className="text-sm text-gray-500 mb-4">
        <span>Posted on {new Date(article.date_posted).toLocaleDateString()}</span>
        <span className="ml-4">Category: <strong>{article.category?.name}</strong></span>
      </div>

      <div className="text-lg leading-relaxed text-gray-800 whitespace-pre-line mb-6">
        {article.body}
      </div>

      {/* ❤️ Like Button */}
      <div className="mb-8">
        <button
          onClick={handleLikeToggle}
          className={`px-5 py-2 rounded text-white text-sm ${
            liked ? "bg-red-600" : "bg-gray-700"
          } hover:opacity-90 transition`}
        >
          {liked ? "❤️ Liked" : "🤍 Like"} ({article.likes_count})
        </button>
        {!isAuthenticated && (
          <p className="text-sm text-red-600 mt-2">
            <Link to="/login" className="underline text-blue-600">Login</Link> to like this post.
          </p>
        )}
      </div>

      <hr className="mb-8" />

      {/* 💬 Comments */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Comments ({comments.length})</h2>

        {/* New Comment */}
        {isAuthenticated ? (
          <form onSubmit={handleCommentSubmit} className="mb-6">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows={4}
              className="w-full border p-3 rounded focus:outline-none focus:ring"
              placeholder="Write your comment..."
            />
            <button
              type="submit"
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Submit
            </button>
          </form>
        ) : (
          <p className="text-red-600 mb-6">
            <Link to="/login" className="underline text-blue-600">Login</Link> to leave a comment.
          </p>
        )}

        {/* Comment List */}
        {comments.length === 0 ? (
          <p className="text-gray-500">No comments yet.</p>
        ) : (
          comments.map((c) => (
            <div key={c.id} className="border-t py-4">
              <p className="font-medium text-gray-900">{c.name}</p>
              <p className="text-gray-700 mb-1">{c.comment}</p>
              <p className="text-xs text-gray-500">
                {new Date(c.timestamp).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default NewsDetail;
