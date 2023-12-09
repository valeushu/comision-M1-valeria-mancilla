import { useContext, useEffect, useRef, useState } from "react";
// import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import { API_URL } from "../utils/consts";
import { AuthContext } from "../providers/AuthProvider";
import { HiOutlineTrash } from "react-icons/hi";
import Navbar from "../components/Navbar";
import "../styles/comment.css"; 

//import React, { useState } from 'react';

const CommentPage = ({ postId }) => {
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/comment/${postId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description }),
      });

      if (response.ok) {
        // Comentario creado con éxito, puedes manejarlo aquí
        console.log('Comentario creado con éxito');
      } else {
        // Manejar errores si es necesario
        console.error('Error al crear el comentario');
      }
    } catch (error) {
      console.error('Error de red', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Comentario:
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <button type="submit">Agregar Comentario</button>
    </form>
  );
};

export default CommentPage;

