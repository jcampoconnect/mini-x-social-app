import { useState, useEffect } from "react";

export default function SearchUserPost({ posts = [], currentUser = "" }) {
  const [searchInput, setSearchInput] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (searchInput.trim() === "") {
      setResults([]);
      return;
    }

    const filtered = posts.filter((post) =>
        post.username &&
        post.username.toLowerCase().includes(searchInput.toLowerCase())
      );
      

    setResults(filtered);
  }, [searchInput, posts]);

return (
    <div>
      <form>
        <h3>Search User Posts</h3>
        <input
          type="text"
          placeholder="Enter username"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </form>
  
      <div>
        <h3>Search Results:</h3>
        {results.length > 0 ? (
          results.map((post) => (
            <div
              key={post.id}
              className="post"
            >
              <p><strong>{post.username}</strong></p>
              <p>{post.content}</p>
              <small>{post.created_at}</small>
              <p>❤️ Likes: {post.likes || 0}</p>
              {post.username === currentUser && (
                <p style={{ color: "green" }}>This is your post ✅</p>
              )}
            </div>
          ))
        ) : (
          <p>No results found or not searched yet.</p>
        )}
      </div>
    </div>
  );
}  