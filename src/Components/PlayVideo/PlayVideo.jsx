import React, { useState, useEffect } from "react";
import "./PlayVideo.css";
import like from "../../assets/like.png";
import dislike from "../../assets/dislike.png";
import share from "../../assets/share.png";
import save from "../../assets/save.png";
import { value_converter } from "../../data.js";
import moment from "moment";
import { useParams } from "react-router-dom";
const API_KEY = import.meta.env.VITE_APP_API_KEY;
const PlayVideo = () => {
  const { videoId } = useParams();
  const [apiData, setApiData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [commentData, setCommentData] = useState([]);

  // Fetch video data
  const fetchVideoData = async () => {
    const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
    try {
      const res = await fetch(videoDetails_url);
      const data = await res.json();
      setApiData(data.items[0]);
    } catch (error) {
      console.error("Error fetching video data:", error);
    }
  };

  // Fetch channel and comment data
  const fetchOtherData = async () => {
    if (!apiData) return; // Ensure apiData is defined

    const channelData_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
    const comment_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=${videoId}&key=${API_KEY}`;

    try {
      // Fetch channel data
      const channelResponse = await fetch(channelData_url);
      const channelData = await channelResponse.json();
      setChannelData(channelData.items[0]);

      // Fetch comment data
      const commentResponse = await fetch(comment_url);
      const commentData = await commentResponse.json();
      setCommentData(commentData.items);
    } catch (error) {
      console.error("Error fetching other data:", error);
    }
  };

  useEffect(() => {
    fetchVideoData();
  }, [videoId]);

  useEffect(() => {
    fetchOtherData();
  }, [apiData]); // Fetch other data when apiData is updated

  return (
    <div className="play-video">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>

      <h3>{apiData ? apiData.snippet.title : "Title Here"}</h3>
      <div className="play-video-info">
        <p>
          {apiData?.statistics?.viewCount
            ? value_converter(apiData.statistics.viewCount)
            : "16K"}{" "}
          &bull;{" "}
          {apiData?.snippet?.publishedAt
            ? moment(apiData.snippet.publishedAt).fromNow()
            : "N/A"}
        </p>
        <div>
          <span>
            <img src={like} />
            {value_converter(apiData?.statistics?.likeCount)}
          </span>
          <span>
            <img src={dislike} />
          </span>
          <span>
            <img src={share} />
            Share
          </span>
          <span>
            <img src={save} />
            Save
          </span>
        </div>
      </div>
      <hr />
      <div className="publisher">
        <img
          src={channelData ? channelData.snippet?.thumbnails?.default?.url : ""}
          alt=""
        />
        <div>
          <p>{apiData?.snippet?.channelTitle}</p>
          <span>
            {value_converter(channelData?.statistics?.subscriberCount)}{" "}
            Subscribers
          </span>
        </div>
        <button>Subscribe</button>
      </div>
      <div className="vid-description">
        <p>
          {apiData
            ? apiData.snippet.description.slice(0, 250)
            : "Description Here"}
        </p>

        <hr />
        <h4>{value_converter(apiData?.statistics?.commentCount)} Comments</h4>
        {commentData.map((item, index) => {
          return (
            <div className="comment" key={index}>
              <img
                src={item.snippet.topLevelComment.snippet.authorProfileImageUrl}
                alt=""
              />
              <div>
                <h3>
                  {item.snippet.topLevelComment.snippet.authorDisplayName}{" "}
                  <span>
                    {moment(
                      item.snippet.topLevelComment.snippet.publishedAt
                    ).fromNow()}
                  </span>
                </h3>
                <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
                <div className="comment-action">
                  <img src={like} alt="" />
                  <span>
                    {value_converter(
                      item.snippet.topLevelComment.snippet.likeCount
                    )}
                  </span>
                  <img src={dislike} alt="" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlayVideo;
