import { useState, useEffect } from "react";
import Weather from "./Weather";
import { getPosts, savePost } from "./utils";
import SearchUserPost from "./SearchUserPost";
import SuggestedFollowers from "./SuggestedFollowers";
import "./new-main.css";

export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  
  // Load posts
  useEffect(() => {
    getPosts()
      .then((loadedPosts) => setPosts(loadedPosts))
      .catch(() => setErrorMsg("Failed to load posts."));
  }, []);

  // Add New Post
  const handlePost = (e) => {
    e.preventDefault();
    if (newPost.trim() === "") {
      setErrorMsg("Post cannot be empty.");
      return;
    }

    const newEntry = {
      id: Date.now(),
      username: username,
      content: newPost,
      created_at: new Date().toLocaleString(),
      likes: 0,
    };

    savePost(newEntry);
    setPosts([newEntry, ...posts]);
    setNewPost("");
    setErrorMsg("");
  };

  // Like a Post
  const handleLike = (postId) => {
    const likedKey = `liked_${username}`; 
    const likedPosts = JSON.parse(localStorage.getItem(likedKey)) || [];
  
    if (likedPosts.includes(postId)) {
      setErrorMsg("You already liked this post.");
      setTimeout(() => setErrorMsg(""), 3000); 
      return;
    }
  
    const updatedPosts = posts.map((post) =>
      post.id === postId ? { ...post, likes: (post.likes || 0) + 1 } : post
    );
  
  
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    localStorage.setItem(likedKey, JSON.stringify([...likedPosts, postId]));
    // Update state
    setPosts(updatedPosts);
  };
  

  // Delete a Post (only by owner)
  const handleDelete = (postId) => {
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  };


  return (
    <div className="main-container">
    <h2>Welcome, {username}!</h2>
    <a href="/">Logout</a>
  
    <Weather />
  
    <h3>Post New Message:</h3>
    {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
    <form onSubmit={handlePost}>
      <textarea
        value={newPost}
        onChange={(e) => setNewPost(e.target.value)}
        rows="3"
        cols="50"
        placeholder="You can type here! - Julian Campo"
      />
      <br />
      <button type="submit">Post</button>
    </form>
  
    <SearchUserPost posts={posts} currentUser={username} />
  
    <h3>Recent Posts:</h3>
    {posts.length === 0 ? (
      <p>No posts yet.</p>
    ) : (
      posts.map((post) => (
        <div key={post.id} className="post">
          <p><strong>{post.username}</strong></p>
          <p>{post.content}</p>
          <small>{post.created_at}</small>
          <button onClick={() => handleLike(post.id)}>
            ❤️ Like ({post.likes || 0})
          </button>
          {post.username === username && (
            <button
              className="delete-button"
              onClick={() => handleDelete(post.id)}
              style={{ marginLeft: "10px" }}
            >
              🗑️ Delete
            </button>
          )}
        </div>
      ))
    )}
  
    <SuggestedFollowers currentUser={username} />
  </div>
  );
}  