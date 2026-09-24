import { useState, useEffect } from "react";

export default function SuggestedFollowers({ currentUser }) {
  const [allUsers, setAllUsers] = useState([]);
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const followedList = JSON.parse(localStorage.getItem(`following_${currentUser}`)) || [];

    // Exclude current user from suggestions
    const otherUsers = users.filter((user) => user.username !== currentUser);

    setAllUsers(otherUsers);
    setFollowing(followedList);
  }, [currentUser]);

  const toggleFollow = (usernameToFollow) => {
    let updatedList;
    if (following.includes(usernameToFollow)) {
      updatedList = following.filter((u) => u !== usernameToFollow);
    } else {
      updatedList = [...following, usernameToFollow];
    }

    setFollowing(updatedList);
    localStorage.setItem(`following_${currentUser}`, JSON.stringify(updatedList));
  };

  return (
    <div className="suggested-box">
      <h3>Suggested Followers</h3>
      {allUsers.length === 0 ? (
        <p>No users to suggest.</p>
      ) : (
        allUsers.map((user) => (
          <div key={user.username} className="suggested-user">
            <span>{user.username}</span>
            <button
              className="follow-btn"
              onClick={() => toggleFollow(user.username)}
            >
              {following.includes(user.username) ? "Following" : "Follow"}
            </button>
          </div>
        ))
      )}
    </div>
  );
}
