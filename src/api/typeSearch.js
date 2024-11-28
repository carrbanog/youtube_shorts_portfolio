import axios from 'axios';

//다음 영상 버튼 함수
export const goToNextVideoFunction = (currentIndex, videos) => {
  console.log(videos)
  if(currentIndex < videos.length - 1){
    const nextVideo = videos[currentIndex + 1];
    return nextVideo;
  }
  return null
}

//이전 영상 버튼 함수
export const goToPrevVideoFunction = (currentIndex, videos) => {
  // console.log(videos)
  if(currentIndex > 0){
    const previousVideo = videos[currentIndex - 1];
    // console.log("prevVideo",previousVideo.video_id)
    return previousVideo;
  }
  return null;
}

//url에서 videoId가 변하면 videoId를 서버에 전송
export const postWatchedVideo = async (user_id, video_id, category) => {
  try {
    const response = await fetch("http://192.168.123.152:3000/api/watched", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        video_id: video_id,
        user_id: user_id,
        category: category
      }),
    });

    if (!response.ok) {
      console.error("Failed to send watched video data:", response.status);
    } else {
      console.log("Watched video data sent successfully");
    }
  } catch (error) {
    console.error("Error sending watched video data:", error);
  }
};

export const postLikedVideo = async (user_id, video_id, category) => {
  try {
    const response = await fetch("http://192.168.123.152:3000/api/likes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        video_id: video_id,
        user_id: user_id,
        category: category
      }),
    });

    if (!response.ok) {
      console.error("Failed to send watched video data:", response.status);
    } else {
      console.log("Watched video data sent successfully");
    }
  } catch (error) {
    console.error("Error sending watched video data:", error);
  }
};

export const postGraph = async () => {
  try {
    // console.log("fetch함수 실행")
    const response = await axios.get(`http://192.168.123.152:3000/api/aggregate/abcd`);
    // if (!response.data || response.data.length === 0) {
    //   throw new Error("No videos found.");
    // }
    console.log(response);
    return response.data; // 데이터를 반환
  } catch (error) {
    // 오류가 발생한 경우 에러 메시지를 던짐
    console.log(error)
    throw new Error(error.response?.data?.message || 'Failed to fetch videos');
  }
};
