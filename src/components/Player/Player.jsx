import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { VideoContext } from "../../VideoContext/VideoContext";
import { useContext, useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import {
  postWatchedVideo,
  goToNextVideoFunction,
  goToPrevVideoFunction,
} from "../../api/typeSearch";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import "./Player.css";

const Player = () => {
  const { videoId } = useParams();
  const navigate = useNavigate();
  const {
    mainVideos,
    setNextTopicVideos,
    nextTopicVideos,
    setMainVideos,
    changeMainVideos,
    setChangeMainVideos,
  } = useContext(VideoContext);
  const [selectedVideo, setSelectedVideo] = useState(null);


  useEffect(() => {
    const userId = "abcd";
    postWatchedVideo(userId, videoId)
    if (mainVideos.length > 0) {
      const video = mainVideos.find((video) => video.video_id === videoId);
      setSelectedVideo(video);
    }
  }, [videoId, mainVideos]);
  useEffect(() => {
    console.log("change mainVideos");
  }, [mainVideos]);

  // 배열 업데이트 시, 최신 배열을 기준으로 인덱스 찾기
  const currentIndex = mainVideos.findIndex(
    (video) => video.video_id === videoId
  );
  console.log(mainVideos);
  const goToPreviousVideo = () => {
    const previousVideo = goToPrevVideoFunction(currentIndex, mainVideos);
    if (previousVideo) {
      navigate(`/videoplay/recommended/${previousVideo.video_id}`);
    }
  };

  const goToNextVideo = () => {
    const nextVideo = goToNextVideoFunction(currentIndex, mainVideos);
    console.log(nextVideo.video_id);
    if (nextVideo) {
      navigate(`/videoplay/recommended/${nextVideo.video_id}`);
    }
  };

  const favoriteButton = () => {
    console.log(selectedVideo.category);
    // 서버에 전달
  };

  return (
    <div className="player">
      <div className="button" onClick={goToPreviousVideo}>
        <FaArrowUp />
      </div>
      <div className="iframe-container">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>
      </div>
      <div className="button" onClick={goToNextVideo}>
        <FaArrowDown />
      </div>
      <button onClick={favoriteButton}>
        <CiHeart />
      </button>
    </div>
  );
};
export default Player;
