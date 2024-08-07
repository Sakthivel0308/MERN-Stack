
import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from "../components/Spinner";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const CreateBook = () => {

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSaveBook = ()=>{
    const data = {
      title,
      author,
      publishYear,
    }
    setLoading(true);
    axios.post(`http://localhost:3000/books`,data)
    .then(()=>{
      setLoading(false);
      navigate('/');
    })
    .catch((err)=>{
      setLoading(false);
      alert('an error occurred check the console');
      console.log(err);
    })
  };
  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">CREATE BOOK</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
          <div className="my-4">
            <label className="text-gray-500 mr-4 text-xl">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-2 border-gray-500 py-4 px-2 w-full"
            />
          </div>
          <div className="my-4">
            <label className="text-gray-500 mr-4 text-xl">Author</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="border-2 border-gray-500 py-4 px-2 w-full"
            />
          </div>
          <div className="my-4">
            <label className="text-gray-500 mr-4 text-xl">Publish Year</label>
            <input
              type="number"
              value={publishYear}
              onChange={(e) => setPublishYear(e.target.value)}
              className="border-2 border-gray-500 py-4 px-2 w-full"
            />
          </div>
          <button className="p-2 bg-sky-300 m-8" onClick={handleSaveBook}>
            Save
          </button>
        </div>
      )}
    </div>
  );
}

export default CreateBook