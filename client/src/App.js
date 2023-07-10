import React, { useState, useEffect } from "react";
import {
  Routes,
  Route,
  useNavigate,
  Navigate
} from "react-router-dom";
import axios from "axios";
import Comic from "./components/Comic";
import SearchBox from "./components/SearchBox";
import "./App.css";

const App = () => {
  const navigate = useNavigate();
  const [comic, setComic] = useState(null);
  const [latestComic, setLatestComic] = useState(null);

  useEffect(() => {
    fetchLatestComic();
  }, []);

  const fetchLatestComic = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/comics/latest"
      );
      setComic(response.data);
      setLatestComic(response.data);
      navigate(`/comic/${response.data.num}`, { replace: true });
    } catch (error) {
      console.error("Error fetching latest comic:", error);
    }
  };

  const fetchComicById = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/comics/${id}`
      );
      setComic(response.data);
      navigate(`/comic/${response.data.num}`, { replace: true });
    } catch (error) {
      console.error(`Error fetching comic with ID ${id}:`, error);
    }
  };

  const handleNextComic = () => {
    if (comic) {
      const nextId = comic.num === latestComic.num ? 1 : comic.num + 1;
      fetchComicById(nextId);
    }
  };

  const handlePreviousComic = () => {
    if (comic) {
      const previousId = comic.num === 1 ? latestComic.num : comic.num - 1;
      fetchComicById(previousId);
    }
  };

  const handleRandomComic = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/comics/latest"
      );
      const latestComic = response.data;
      const randomId = Math.floor(Math.random() * latestComic.num) + 1;
      fetchComicById(randomId);
    } catch (error) {
      console.error("Error fetching random comic:", error);
    }
  };

  const handleSearchComic = (id) => {
    fetchComicById(id);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={`/comic/${comic?.num}`} replace />}
      />
      <Route
        path="/comic/:id"
        element={
          <div className="app-container">
            <Comic
              comic={comic}
              handlePreviousComic={handlePreviousComic}
              handleNextComic={handleNextComic}
              handleRandomComic = {handleRandomComic}
            />

            <SearchBox onSearch={handleSearchComic} />
          </div>
        }
      />
    </Routes>
  );
};

export default App;
