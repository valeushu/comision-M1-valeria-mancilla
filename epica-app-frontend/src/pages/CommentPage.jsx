import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../utils/consts";
import { AuthContext } from "../providers/AuthProvider";
import { HiOutlineTrash } from "react-icons/hi";
import Navbar from "../components/Navbar";
import "../styles/comment.css"; 

const CommentPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  const { auth } = useContext(AuthContext);
  const formRef = useRef(null);

  const getPost = () => {
    fetch(`${API_URL}/post/${postId}`, {
      headers: {
        Authorization: auth.token,
      },
    })
      .then((res) => {
        if (res.status !== 200) return alert("Error getting post");

        return res.json();
      })
      .then((data) => {
        setPost(data);
      });
  };

  useEffect(() => {
    getPost();
  }, [postId, auth]);

  const handleDeleteComment = (commentId) => {
    fetch(`${API_URL}/comment/${postId}/${commentId}`, {
      method: "DELETE",
      headers: {
        Authorization: auth.token,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      console.log("comment id",commentId)
      if (!res.ok) return alert("Error deleting comment");
      getPost();
    });
  };

  const handleCreateNewComment = async (e) => {
    e.preventDefault();
    console.log(e.target)
  
    const formData = new FormData(e.target);
    console.log(formData)
  
    try {
      
      const description = formData.get("description");
      //formData.append("description", formData.get("description"));
      const response = await fetch(`${API_URL}/comment/${postId}`, {
        method: "POST",
        body: JSON.stringify({ description }),
        headers: {
          "Content-Type": "application/json",
          Authorization: auth.token,
        },
      });
  
      if (!response.ok) {
        throw new Error("Error creating new comment");
      }
      else{
        alert("creating new comment succefully");
      }

  
  
      getPost();
      formRef.current.reset();
    } catch (error) {
      console.error(error.message);
      alert("Error creating new comment");
    }
  };
  

  if (!post) return <h1>Loading...</h1>;

  return (
    <div>
      <Navbar />
      <div className="post">
        <h1>{post.title}</h1>
        <p>{post.description}</p>
        <picture>
        <img src={post.imageURL} alt={post.imageURL} />
      </picture>
      </div>
      <div className="post-comment">
      <form onSubmit={handleCreateNewComment} ref={formRef}>
        <input type="text" name="description" placeholder="New comment" />
        {/* <input type="text" name="author" placeholder="author" /> */}
        <button>Submit</button>
      </form>
      </div>
      {post.comments.map((comment) => {
        console.log(comment)
        return (
          <div key={comment._id} className="comment">
            <h2>{comment.description}</h2>
            <p>
              <i>{comment.author}</i> 
            </p>
            <button
              className="delete-button"
              onClick={() => handleDeleteComment(comment._id)}
            ><HiOutlineTrash /></button>
          </div>
        );
      })}
    </div>
  );
};

export default CommentPage;