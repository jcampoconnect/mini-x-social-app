// utils.js

// Load users from localStorage or fallback to data.json
export const getUsers = async () => {
    const localUsers = localStorage.getItem("users");
    if (localUsers) {
      return JSON.parse(localUsers); // Users were saved before
    } else {
      const res = await fetch("/mockData/data.json");
      const data = await res.json();
      localStorage.setItem("users", JSON.stringify(data.users)); // Save for next time
      return data.users;
    }
  };
  
  // Save a new user to localStorage
  export const saveUser = (newUser) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
  };
  // utils.js (add to the bottom of the file)

export const getPosts = async () => {
    const localPosts = localStorage.getItem("posts");
    if (localPosts) {
      return JSON.parse(localPosts);
    } else {
      const res = await fetch("/mockData/data.json");
      const data = await res.json();
      localStorage.setItem("posts", JSON.stringify(data.posts));
      return data.posts;
    }
  };
  
  export const savePost = (newPost) => {
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.unshift(newPost); // Add to top
    localStorage.setItem("posts", JSON.stringify(posts));
  };
  