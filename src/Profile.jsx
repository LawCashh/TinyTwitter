import { useQuery } from "@tanstack/react-query";
import styles from "./Profile.module.css";
import userImage from "./assets/images/user.svg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile({ username, loggedIn }) {
  const [showForm, setShowForm] = useState(false);
  const [newPostContent, setNewPostContent] = useState("");
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const showFormHandler = () => {
    setShowForm((s) => !s);
  };

  useEffect(() => {
    if (!loggedIn) navigate("/login");
  }, [loggedIn, navigate]);

  const { data, isLoading } = useQuery({
    queryKey: ["userProfile:", username],
    queryFn: async () => {
      try {
        const userFetch = await fetch(
          `https://blrysfklb5.execute-api.eu-north-1.amazonaws.com/default/profile/${username}`
        );
        const user = await userFetch.json();
        return user;
      } catch (error) {
        console.log("greska u uzimanju postova " + error);
      }
    },
  });

  const handleCreatePost = async (event) => {
    setIsCreatingPost(true);
    event.preventDefault();
    try {
      const createPostFetch = await fetch(
        "https://blrysfklb5.execute-api.eu-north-1.amazonaws.com/default/createPost",
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content: newPostContent, id: data._id }),
        }
      );
      const message = await createPostFetch.json();
      if (createPostFetch.status === 201) {
        setMessage("");
        setNewPostContent("");
        setIsCreatingPost(false);
      } else {
        setMessage("ERROR: " + JSON.stringify(message));
        setNewPostContent("");
        setIsCreatingPost(false);
      }
    } catch (error) {
      setMessage("ERROR: " + JSON.stringify(error));
      setNewPostContent("");
      setIsCreatingPost(false);
    }
  };

  return (
    <div className={styles.profilePage}>
      <p style={{ marginTop: "30px" }}>{message}</p>
      {(isLoading || isCreatingPost) && <span>Ucitavanje...</span>}
      <div className={styles.profile}>
        {!isLoading && !isCreatingPost && (
          <>
            <img
              src={userImage}
              alt="user_slika"
              className={styles.profile__img}
            />
            <span className={styles.profile__username}>{data.username}</span>
            <span className={styles.profile__description}>
              {" "}
              {data.description}
            </span>
          </>
        )}
      </div>
      {!showForm && !isLoading && !isCreatingPost && (
        <button className={styles.createPostButton} onClick={showFormHandler}>
          Create Post
        </button>
      )}
      {showForm && !isLoading && !isCreatingPost && (
        <form onSubmit={handleCreatePost} className={styles.post__form}>
          <textarea
            id="newPostArea"
            name="newPostArea"
            className={styles.post__form__textarea}
            placeholder="Unesi sadrzaj.."
            onChange={(event) => setNewPostContent(event.target.value)}
          />
          <button className={styles.createPostButton}>Create Post</button>
        </form>
      )}
    </div>
  );
}

export default Profile;
