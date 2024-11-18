import React, { createContext, useState } from "react";

export const VideoContext = createContext();
export const VideoProvider = ({ children }) => {
  const [mainVideos, setMainVideos] = useState([]);
  const [topicVideos, setTopicVideos] = useState([]);
  const [nextTopicVideos, setNextTopicVideos] = useState([]);
  const [changeMainVideos, setChangeMainVideos] = useState([]);

  // console.log("main", mainVideos)
  // console.log("topic", topicVideos)
  return (
    <VideoContext.Provider
      value={{
        mainVideos,
        setMainVideos,
        topicVideos,
        setTopicVideos,
        nextTopicVideos,
        setNextTopicVideos,
        changeMainVideos,
        setChangeMainVideos,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};