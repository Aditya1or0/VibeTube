import React, { useEffect, useState } from "react";
import "./Recommended.css";
import { value_converter } from "../../data.js";
import { Link } from "react-router-dom";
const API_KEY = import.meta.env.VITE_APP_API_KEY;
const Recommended = ({ categoryId }) => {
  const [apiData, setApiData] = useState([]);

  const fetchData = async () => {
    const relatedVideos_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=35&regionCode=IN&videoCategoryId=${categoryId}&key=${API_KEY}`;
    await fetch(relatedVideos_url).then((res) =>
      res.json().then((data) => setApiData(data.items))
    );
  };
  useEffect(() => {
    fetchData();
  }, [categoryId]);

  return (
    <div className="recommended">
      {apiData.map((item, index) => (
        <Link
          to={`/video/${categoryId}/${item.id}`}
          className="side-video-list"
          key={index}
        >
          <img src={item.snippet.thumbnails.high.url} alt="" />
          <div className="vid-info">
            <h4>{item.snippet.title}</h4>
            <p>{item.snippet.channelTitle}</p>
            <p>{value_converter(item.statistics.viewCount)} Views</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Recommended;
