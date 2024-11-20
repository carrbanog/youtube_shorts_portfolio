import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { VideoContext } from "../../VideoContext/VideoContext";
import { useContext, useEffect, useState } from "react";
import { fetchVideos } from "../../api/api";
import {
  postWatchedVideo,
  postLikedVideo,
  goToNextVideoFunction,
  goToPrevVideoFunction,
} from "../../api/typeSearch";
import { FaArrowUp, FaArrowDown, FaHeart } from "react-icons/fa";
import "./Player.css";

const Player = () => {
  const { videoId } = useParams();
  const navigate = useNavigate();
  const { mainVideos, setNextTopicVideos, nextTopicVideos, setMainVideos } =
    useContext(VideoContext);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const userId = "abcd";
    const videoCategory = mainVideos.find(
      (video) => video.video_id === videoId
    );
    // console.log(videoCategory.category);
    postWatchedVideo(userId, videoId, videoCategory.category);
    if (mainVideos.length > 0) {
      const video = mainVideos.find((video) => video.video_id === videoId);
      setSelectedVideo(video);
    }
    setIsLiked(false);
  }, [videoId, mainVideos]);
  // useEffect(() => {
  //   console.log("change mainVideos");
  // }, [mainVideos]);

  // 배열 업데이트 시, 최신 배열을 기준으로 인덱스 찾기
  const currentIndex = mainVideos.findIndex(
    (video) => video.video_id === videoId
  );
  console.log(currentIndex);

  const goToPreviousVideo = () => {
    const previousVideo = goToPrevVideoFunction(currentIndex, mainVideos);
    console.log(previousVideo.category);
    if (previousVideo) {
      navigate(`/videoplay/recommended/${previousVideo.video_id}`);
    }
  };

  // const goToNextVideo = () => {
  //   const nextVideo = goToNextVideoFunction(currentIndex, mainVideos);
  //   console.log(nextVideo.video_id);
  //   if (nextVideo) {
  //     navigate(`/videoplay/recommended/${nextVideo.video_id}`);
  //   }
  // };

  const goToNextVideo = async () => {
    if (currentIndex === mainVideos.length - 1) {
      const newMainVideos = await fetchVideos();
      console.log(newMainVideos);
      if (newMainVideos.length > 0) {
        console.log(newMainVideos[0].video_id);
        setMainVideos(newMainVideos);
        navigate(`/videoplay/recommended/${newMainVideos[0].video_id}`);
      } else {
        console.log("새로운 영상을 가져올 수 없습니다.");
      }
    } else {
      // console.log(mainVideos, mainVideos[1].video_id)
      const nextVideo = goToNextVideoFunction(currentIndex, mainVideos);
      if (nextVideo) {
        console.log(nextVideo);
        navigate(`/videoplay/recommended/${nextVideo.video_id}`);
      }
    }
  };

  const favoriteButton = () => {
    setIsLiked((prev) => !prev);
    console.log(selectedVideo.category);
    postLikedVideo("abcd", videoId, selectedVideo.category);
    // 서버에 전달
  };

  return (
    <div className="player">
      <div className="button" onClick={() => goToPreviousVideo()}>
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
export default Player;
