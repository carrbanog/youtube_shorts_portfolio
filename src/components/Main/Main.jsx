import React, { useContext, useEffect } from "react";
import { fetchVideos, fetchTopicVideos } from "../../api/api";
import { VideoContext } from "../../VideoContext/VideoContext";
import "./Main.css";
import { Link } from "react-router-dom";

const Main = () => {
  const {
    mainVideos,
    setMainVideos,
    topicVideos,
    setTopicVideos,
    changeMainVideo,
  } = useContext(VideoContext);

  //api파일을 통해서 영상 받아오기
  useEffect(() => {
    const loadRecommendedVdieos = async () => {
      const recommendedVideoData = await fetchVideos();
      console.log(recommendedVideoData);
      // console.log(changeMainVideo);
      setMainVideos(recommendedVideoData);
    };
    const loadTopicVideos = async () => {
      const topicVideoData = await fetchTopicVideos("게임");
      // console.log(topicVideoData);
      setTopicVideos(topicVideoData);
    };
    loadRecommendedVdieos();
    loadTopicVideos();
  }, []);
  return (
    <div className="main">
      <div className="recommededVideo">
        <h2>추천 영상</h2>
        <div className="recommendedList">
          {mainVideos.map((video) => {
            return (
              <Link to={`videoplay/recommended/${video.video_id}`}>
                <div className="box">
                  <img
                    src={`https://img.youtube.com/vi/${video.video_id}/maxresdefault.jpg`}
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="topicVideo">
        <h2>
          {topicVideos.length > 0
            ? topicVideos[0].category + " Video"
            : "Loading..."}
        </h2>
        <div className="topicList">
          {topicVideos.map((video) => {
            return (
              <Link to={`videoplay/topic/${video.video_id}`}>
                <div className="box">
                  <img
                    src={`https://img.youtube.com/vi/${video.video_id}/maxresdefault.jpg`}
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Main;
