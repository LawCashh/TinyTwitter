import { useQuery } from "@tanstack/react-query";
import styles from "./Posts.module.css";
import PostUser from "./PostUser";
// import { useEffect } from "react";

function Posts() {
  const { isLoading: isLoadingPosts, data: posts } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      try {
        const postsFetch = await fetch(
          "https://blrysfklb5.execute-api.eu-north-1.amazonaws.com/default/posts"
        );
        const posts = await postsFetch.json();
        return posts;
      } catch (error) {
        console.log("greska u uzimanju postova " + error);
      }
    },
  });

  //   useEffect(() => {
  //     const getPosts = async () => {
  //       try {
  //         const postsFetch = await fetch(
  //           "https://blrysfklb5.execute-api.eu-north-1.amazonaws.com/default/posts"
  //         );
  //         const posts = await postsFetch.json();
  //         console.log(posts);
  //       } catch (error) {
  //         console.log("greska u uzimanju postova " + error);
  //       }
  //     };
  //     getPosts();
  //   }, []);

  return (
    <main className={styles.posts}>
      {isLoadingPosts && <h1>Loading...</h1>}
      {!isLoadingPosts &&
        posts.map((post) => {
          return (
            <div className={styles.post} key={post._id}>
              <PostUser userId={post.userId} />
              <div className={styles.post__content}>
                <p className={styles.post__content__text}>{post.content}</p>
                <p className={styles.post__content__date}>
                  Created On: {post.createdOn}
                </p>
              </div>
            </div>
          );
        })}
    </main>
  );
}

export default Posts;
