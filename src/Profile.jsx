import { useQuery } from "@tanstack/react-query";
import styles from "./Profile.module.css";
import userImage from "./assets/images/user.svg";

function Profile({ username }) {
  console.log(username);
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
  return (
    <div className={styles.profilePage}>
      {isLoading && <span>Ucitavanje...</span>}
      <div className={styles.profile}>
        {!isLoading && (
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
      <button className={styles.createPostButton}>Create Post</button>
    </div>
  );
}

export default Profile;
