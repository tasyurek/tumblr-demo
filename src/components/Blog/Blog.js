import React from "react";
import axios from "axios";
import { Notion, PostList } from "./Blog.elements";

const Blog = () => {
  const [posts, setPosts] = React.useState(undefined);
  const [tumblelog, setTumblelog] = React.useState(undefined);

  React.useEffect(() => {
    const url = "./data.json";

    axios.get(url).then((res) => {
      setTumblelog(res.data.tumblelog);

      const _posts = res.data.posts.filter((post) => post.type !== "audio");
      setPosts(_posts);
      console.log(res.data);
    });
  }, []);

  if (!posts || !tumblelog) return <div></div>;

  return (
    <div className="blog">
      <Notion tumblelog={tumblelog} totalPosts={posts.length} />
      <PostList posts={posts} />
    </div>
  );
};

export default Blog;
