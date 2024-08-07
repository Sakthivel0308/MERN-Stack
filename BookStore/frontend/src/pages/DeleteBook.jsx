import React, { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();
  const handleDeleteBook = ()=>{
    setLoading(true);
    axios
   .delete(`http://localhost:3000/books/${id}`)
   .then(()=>{
     setLoading(false);
     navigate('/');
   })
   .catch((err)=>{
     setLoading(false);
     alert('an error occurred check the console');
     console.log(err);
   })
  }
  return <div className="p-4">
    <BackButton />
    <h1 className="text-3xl my-4">DELETE BOOK</h1>
    {loading ? <Spinner /> : ''}
    <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
      <h1 className="text-2xl">Are you sure you want to delete this book?</h1>

      <button className="p-4 bg-red-600 text-white m-8 w-full" onClick={handleDeleteBook}>
        yes, Delete it
      </button>
    </div>

  </div>;
};

export default DeleteBook;
