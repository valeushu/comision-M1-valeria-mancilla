import React, { useEffect, useState } from "react";
import PostItem from "./Item";
import { Link, useNavigate } from "react-router-dom";

const Post = ({ posts, getPost }) => {
  const [search, setSearch] = useState("");
  const [filterPosts, setFilterPosts] = useState(posts);
  const navigate = useNavigate();

  useEffect(() => {
    const filtered = posts.filter((post) => {
      return post.title.toLowerCase().includes(search.toLowerCase());
    });
    setFilterPosts(filtered);
  }, [search, posts]);

  const handlePostClick = async (postId) => {
    try {
      // Llama a la función getPost con el ID del post
      await getPost(postId);
      // Redirige a la página de detalles del post
      navigate(`/post/${postId}`);
    } catch (error) {
      console.error("Error fetching post by ID", error);
      // Maneja el error, por ejemplo, mostrar un mensaje al usuario
    }
  };

  return (
    <div style={{ minWidth: "420px" }}>
      <Link to="/post/new" className="btn btn-success">
        Create
      </Link>
      <input
        type="search"
        className="form-control"
        placeholder="Search"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <>
        {filterPosts.map((post) => (
          <PostItem
            getPost={getPost}
            key={post._id}
            post={post}
            onClick={() => handlePostClick(post._id)}
          />
        ))}
      </>
    </div>
  );
};

export default Post;

