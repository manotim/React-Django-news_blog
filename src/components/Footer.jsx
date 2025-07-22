const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-10">
      <div className="w-[90%] mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-xl font-bold mb-3">About NewsHub</h2>
          <p className="text-sm">
            NewsHub is your reliable source of trending political, business, and entertainment news. Stay informed with our real-time updates and breaking headlines.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-3">Quick Links</h2>
          <ul className="text-sm space-y-2">
            <li><a href="/" className="hover:text-red-400">Home</a></li>
            <li><a href="/#breaking" className="hover:text-red-400">Breaking News</a></li>
            <li><a href="/#top" className="hover:text-red-400">Top Stories</a></li>
            <li><a href="/#categories" className="hover:text-red-400">Categories</a></li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-3">Follow Us</h2>
          <ul className="text-sm space-y-2">
            <li><a href="#" className="hover:text-red-400">Facebook</a></li>
            <li><a href="#" className="hover:text-red-400">Twitter</a></li>
            <li><a href="#" className="hover:text-red-400">Instagram</a></li>
            <li><a href="#" className="hover:text-red-400">YouTube</a></li>
          </ul>
        </div>
      </div>

      <div className="text-center text-sm text-gray-400 py-4 border-t border-gray-700">
        © {new Date().getFullYear()} NewsHub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
