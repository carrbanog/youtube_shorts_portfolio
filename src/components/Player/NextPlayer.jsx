import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { VideoContext } from "../../VideoContext/VideoContext";
import { goToNextVideoFunction, postLikedVideo } from "../../api/typeSearch";
import { FaArrowRight, FaArrowLeft, FaHeart } from "react-icons/fa";
// import "./NextPlayer.css";

const NextPlayer = () => {
  const { category, videoIndex, nextVideoId } = useParams();
  const navigate = useNavigate();
  const { mainVideos, nextTopicVideos } = useContext(VideoContext);
  const [moveCurrentIndex, setMoveCurrentIndex] = useState(videoIndex);
  const [isLiked, setIsLiked] = useState(false);

  const currentIndex = nextTopicVideos.findIndex(
    (video) => video.video_id === nextVideoId
  );

  useEffect(() => {
    // 비디오가 변경되면 좋아요 상태 초기화
    setIsLiked(false);
  }, [nextVideoId]);

  const goToTopicNextVideo = () => {
    const nextVideo = goToNextVideoFunction(currentIndex, nextTopicVideos);
    if (nextVideo) {
      navigate(
        `/videoplay/recommended/${currentIndex}/${category}/${nextVideo.video_id}`
      );
    }
  };

  const goToPrevTopicVideo = () => {
    if (moveCurrentIndex !== null && mainVideos[moveCurrentIndex]) {
      const prevVideoId = mainVideos[moveCurrentIndex].video_id;
      navigate(`/videoplay/recommended/${prevVideoId}`);
    } else {
      console.error("Invalid moveCurrentIndex or mainVideos is undefined");
    }
  };

  const favoriteButton = () => {
    if (!isLiked) {
      setIsLiked(true); // 좋아요 상태로 변경
      postLikedVideo("abcd", nextVideoId, nextTopicVideos[0].category); // 서버에 데이터 전송
    } else {
      setIsLiked(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case "ArrowLeft":
          event.preventDefault();
          goToPrevTopicVideo();
          break;
        case "ArrowRight":
          event.preventDefault();
          goToTopicNextVideo();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentIndex, nextTopicVideos, mainVideos, videoIndex]);

  return (
    <div className="nextPlayer">
      {nextTopicVideos ? (
        <>
          <div className="ifame-container">
            <iframe
              src={`https://www.youtube.com/embed/${nextVideoId}?autoplay=1`}
              allow="autoplay; encrypted-media"
              allowFullScreen
              frameBorder="0"
            ></iframe>
            <button
              onClick={favoriteButton}
              className={`likeButton ${isLiked ? "liked" : ""}`}
            >
              <FaHeart />
            </button>
          </div>
        </>
      ) : (
        <div>Loading video...</div>
      )}
    </div>
  );
};

export default NextPlayer;
