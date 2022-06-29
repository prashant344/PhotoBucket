import React, { useEffect, useState } from "react";
import debounce from "lodash.debounce";
import ImageRenderer from "../ImageRenderer";
import SearchBar from "../SearchBar";
import "./index.css";

const Dashboard = () => {
  const [photosList, setPhotosList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/albums/1/photos").then((data) =>
      data.json().then((result) => {
        setPhotosList(result);
        setFilteredList(result);
      })
    );
  }, []);

  const search = (text) => {
    if (photosList && photosList.length && text) {
      const newList = photosList.filter((item) => item.title.includes(text));
      setFilteredList(newList);
    } else if (!text) {
      setFilteredList(photosList);
    }
  };
  const debounceSearch = debounce((text) => {
    search(text);
  }, 3000);

  return (
    <div className="dashboard">
      <SearchBar debounceSearch={debounceSearch} />
      <div className="container">
        {filteredList && filteredList.length
          ? filteredList.map((photo) => (
              <div className="card">
                <a href={photo.url}>
                  <ImageRenderer
                    width={150}
                    height={150}
                    thumb={photo.thumbnailUrl}
                    url={photo.thumbnailUrl}
                  />
                </a>
                {photo.title}
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default Dashboard;
