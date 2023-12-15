import { useContext, useId, useState } from "react";
import styles from "../styles/AuthForm.module.css";
import { API_URL } from "../utils/consts";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const NewPost = () => {
  const titleId = useId();
  const descriptionId = useId();  // Nuevo campo
  const imageURLId = useId();  // Nuevo campo

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");  // Nuevo estado
  const [imageURL, setImageURL] = useState("");  // Nuevo estado

  const navigate = useNavigate();

  const { auth } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim() || !imageURL.trim()) {
      return alert("Please fill in all fields");
    }

    fetch(`${API_URL}/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth.token,
      },
      body: JSON.stringify({
        title: title.trim(),
        description: description.trim(),  
        imageURL: imageURL.trim(), 
      }),
    }).then((res) => {
      if (res.status !== 201) return alert("Error creating post");

      navigate("/post");
    });
  };

  return (
    <div>
      <Navbar />
      <h2>Create post</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor={titleId}>Title:</label>
          <input
            type="text"
            id={titleId}
            placeholder="My new Post"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        {/* Nuevo campo para la descripción */}
        <div className={styles.inputGroup}>
          <label htmlFor={descriptionId}>Description:</label>
          <textarea
            type="text"
            id={descriptionId}
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        {/* Nuevo campo para la URL de la imagen */}
        <div className={styles.inputGroup}>
          <label htmlFor={imageURLId}>Image URL:</label>
          <input
            type="url"
            id={imageURLId}
            placeholder="Enter image URL"
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default NewPost;
