import { useQuery } from "@tanstack/react-query";
import styles from "./PostUser.module.css";
import userImage from "./assets/images/user.svg";

function PostUser({ userId }) {
  // console.log(userId);
  const { data, isLoading } = useQuery({
    queryKey: ["user:", userId],
    queryFn: async () => {
      try {
        const userFetch = await fetch(
          `https://blrysfklb5.execute-api.eu-north-1.amazonaws.com/default/users/${userId}`
        );
        const user = await userFetch.json();
        return user;
      } catch (error) {
        console.log("greska u uzimanju postova " + error);
      }
    },
  });

  // console.log(data);
  return (
    <div className={styles.post__user}>
      {isLoading && <p>Loading user...</p>}
      {!isLoading && (
        <>
          <img
            className={styles.post__user__image}
            src={userImage}
            alt="user_slika"
          />
          <p className={styles.post__user__username}>{data.username}</p>
        </>
      )}
    </div>
  );
}

export default PostUser;
