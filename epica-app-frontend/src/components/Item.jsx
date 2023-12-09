import { Link } from "react-router-dom";
import styles from "../styles/Post.module.css";
import { HiOutlineTrash, HiOutlinePencilAlt } from "react-icons/hi";
import { useId } from "react";
import DeletePostModel from "./DeletePostModel";

const PostItem = ({ post, getPost, onClick }) => {
  const modalId = useId();

  return (
    <div
      key={post._id}
      className={styles.item}
      onClick={(e) => {
        // stop propagation to avoid triggering the onClick of the parent

        e.stopPropagation();

        onClick();
      }}
    >
      <picture>
        <img src={post.author.avatar} alt={post.author.username} />
      </picture>
      <section>
        <h2>{post.title}</h2>
        <p>
          <b>{post.author.username}</b>
          <span>{post.comments.length}</span>
        </p>
      </section>
      <div>
        <Link
          style={{ fontSize: "30px", color: "green" }}
          className="font-warning"
        >
          <HiOutlinePencilAlt />
        </Link>
        <Link
          onClick={(e) => {
            e.stopPropagation();
          }}
          data-bs-toggle="modal"
          data-bs-target={"#modal" + post._id}
          style={{ fontSize: "30px", color: "red" }}
        >
          <HiOutlineTrash />
        </Link>

        <DeletePostModel
          getPost={getPost}
          modalId={modalId}
          postId={post._id}
        />
      </div>
    </div>
  );
};

export default PostItem;
