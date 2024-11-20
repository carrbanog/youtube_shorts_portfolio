import React from "react";
import { useContext, useEffect, useState } from "react";
import "./Player.css";
import { useNavigate, useParams } from "react-router-dom";
import { VideoContext } from "../../VideoContext/VideoContext";
import { fetchVideos } from "../../api/api";
import {
  postWatchedVideo,
  postLikedVideo,
  goToNextVideoFunction,
  goToPrevVideoFunction,
} from "../../api/typeSearch";
import { FaArrowUp, FaArrowDown, FaHeart } from "react-icons/fa";

const TopicPlayer = () => {
  const { videoId } = useParams();
  const navigate = useNavigate();
  const { topicVideos, setTopicVideos } = useContext(VideoContext);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const { loading, setLoading } = useState(true);
  const [isLiked, setIsLiked] = useState(false);

  //서버에게 videoId를 전달 후 데이터 요청
  console.log(topicVideos);
  useEffect(() => {
    const userId = "topic";
    const videoCategory = topicVideos.find(
      (video) => video.video_id === videoId
    );
    postWatchedVideo(userId, videoId, videoCategory.category);
    if (topicVideos.length > 0) {
      const video = topicVideos.find((video) => video.video_id === videoId);
      setSelectedVideo(video);
    }
    setIsLiked(false);
  }, [videoId, topicVideos]);
  useEffect(() => {
    console.log("change mainVideos");
  }, [topicVideos]);

  //배열 업데이트 시 최신 배열을 기준으로 인덱스 찾기
  const currentIndex = topicVideos.findIndex(
    (video) => video.video_id === videoId
  );
  // console.log(topicVideos);

  const goToPreviousVideo = () => {
    const previousVideo = goToPrevVideoFunction(currentIndex, topicVideos);
    if (previousVideo) {
      navigate(`/videoplay/topic/${previousVideo.video_id}`);
    }
  };

  const goToNextVideo = () => {
    const nextVideo = goToNextVideoFunction(currentIndex, topicVideos);
    console.log(nextVideo.video_id);
    if (nextVideo) {
      navigate(`/videoplay/topic/${nextVideo.video_id}`);
    }
  };

  // const goToNextVideo = async() => {
  //   if (currentIndex === topicVideos.length - 1) {
  //     const newTopicVideos = await fetchVideos();
  //     console.log(newTopicVideos)
  //     if(newTopicVideos.length > 0){
  //       console.log(newTopicVideos);
  //       setTopicVideos(newTopicVideos);
  //       navigate(`/videoplay/topic/${newTopicVideos[0].vdieo_id}`);
  //     }else{
  //       console.log("새로운 영상을 가져올 수 없습니다.")
  //     }
  //   } else {
  //     const nextVideo = goToNextVideoFunction(currentIndex, topicVideos);
  //     if (nextVideo) {
  //       navigate(`/videoplay/topic/${nextVideo.video_id}`);
  //     }
  //   }
  // };

  const favoriteButton = () => {
    setIsLiked((prev) => !prev);
    console.log(selectedVideo.category, videoId);
    postLikedVideo("topic", videoId, selectedVideo.category);
  };
  if (loading) {
    <div className="loading">
      <p>Loading...</p>
    </div>;
  }
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
        <button
          onClick={favoriteButton}
          className={`likeButton ${isLiked ? "liked" : ""}`}
        >
          <FaHeart />
        </button>
      </div>
      <div className="button" onClick={goToNextVideo}>
        <FaArrowDown />
      </div>
    </div>
  );
};

export default TopicPlayer;
