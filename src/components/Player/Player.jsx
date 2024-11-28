import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { VideoContext } from "../../VideoContext/VideoContext";
import { fetchTopicVideos, fetchVideos } from "../../api/api";
import {
  postWatchedVideo,
  postLikedVideo,
  goToNextVideoFunction,
  goToPrevVideoFunction,
} from "../../api/typeSearch";
import { FaArrowUp, FaArrowDown, FaHeart, FaArrowRight } from "react-icons/fa";
import "./Player.css";

const Player = () => {
  const userId = "abcd";
  const { videoId } = useParams();        
  const navigate = useNavigate();
  const { mainVideos, setMainVideos, nextTopicVideos, setNextTopicVideos } =
    useContext(VideoContext);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [nextCategoty, setNextCategory] = useState("");


  useEffect(() => {
    const videoCategory = mainVideos.find(
      (video) => video.video_id === videoId
    );

    //영상을 보면 userId, 해당 영상의 Id, 카테고리를 서버에 전송해서 db에,
    if (videoCategory) {
      postWatchedVideo(userId, videoId, videoCategory.category);
      setNextCategory(videoCategory.category);
    }
    
    if (mainVideos.length > 0) {
      const video = mainVideos.find((video) => video.video_id === videoId);
      setSelectedVideo(video);
    } else {
      setSelectedVideo(null);
    }

    setIsLiked(false);
  }, [videoId, mainVideos]);

  const currentIndex = mainVideos.findIndex(
    (video) => video.video_id === videoId
  );

  const goToPreviousVideo = () => {
    const previousVideo = goToPrevVideoFunction(currentIndex, mainVideos);
    if (previousVideo) {
      navigate(`/videoplay/recommended/${previousVideo.video_id}`);
    }
  };

  const goToNextVideo = async () => {
    if (currentIndex === mainVideos.length - 1) {
      const newMainVideos = await fetchVideos();
      if (newMainVideos.length > 0) {
        setMainVideos(newMainVideos);
        navigate(`/videoplay/recommended/${newMainVideos[0].video_id}`);
      } else {
        console.log("새로운 영상을 가져올 수 없습니다.");
      }
    } else {
      const nextVideo = goToNextVideoFunction(currentIndex, mainVideos);
      if (nextVideo) {
        navigate(`/videoplay/recommended/${nextVideo.video_id}`);
      }
    }
  };

  const favoriteButton = () => {
    if (!isLiked) {
      setIsLiked(true); // 좋아요 상태로 변경
      postLikedVideo(userId, videoId, selectedVideo?.category); // 서버에 데이터 전송
    } else {
      setIsLiked(false);
    }
  };

  const goToNextTopicVideo = async () => {
    const nextTopicVideoData = await fetchTopicVideos(nextCategoty);
    setNextTopicVideos(nextTopicVideoData);
    navigate(
      `/videoplay/recommended/${currentIndex}/${nextCategoty}/${nextTopicVideoData[0].video_id}`
    );
  };
  // console.log(mainVideos)
  // console.log(currentIndex)

  useEffect(() => {
    const handleKeyDown = (event) => {
      // 기본 동작 막기
      if (["ArrowUp", "ArrowDown", "ArrowRight"].includes(event.key)) {
        event.preventDefault();
      }

      switch (event.key) {
        case "ArrowUp": // 이전 비디오로 이동
          goToPreviousVideo();
          break;
        case "ArrowDown": // 다음 비디오로 이동
          goToNextVideo();
          break;
        case "ArrowRight": // 다음 주제 비디오로 이동
          goToNextTopicVideo();
          break;
        case "l": // 좋아요 토글
          favoriteButton();
          break;
        default:
          break;
      }
    };

    // 키보드 이벤트 리스너 추가
    window.addEventListener("keydown", handleKeyDown);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mainVideos, videoId, currentIndex, nextCategoty, isLiked]);

  return (
    <div className="player">
      {selectedVideo ? (
        <>
          {/* <div className="button" onClick={() => goToPreviousVideo()}>
            <FaArrowUp />
          </div> */}
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
          {/* <div className="button" onClick={goToNextVideo}>
            <FaArrowDown />
          </div>
          <div className="right" onClick={goToNextTopicVideo}>
            <FaArrowRight />
          </div> */}
        </>
      ) : (
        <div className="loading">
          <p>Loading video...</p>
        </div>
      )}
    </div>
  );
};

export default Player;
