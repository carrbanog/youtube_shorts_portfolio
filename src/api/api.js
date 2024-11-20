// src/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

// 비디오 목록을 가져오는 함수
export const fetchVideos = async (userId) => {
  try {
    // console.log("fetch함수 실행")
    const response = await axios.get(`http://192.168.123.152:3000/api/videos/random`, {
      params: {user_id:userId}
    })
    if (!response.data || response.data.length === 0) {
      throw new Error("No videos found.");
    }
    console.log(response);
    return response.data; // 데이터를 반환
  } catch (error) {
    // 오류가 발생한 경우 에러 메시지를 던짐
    console.log(error)
    throw new Error(error.response?.data?.message || 'Failed to fetch videos');
  }
};

//특정주제 영상 요청fetchTopicVideos
export const fetchTopicVideos = async (category) => {
  try {
    const response = await axios.post('http://192.168.123.152:3000/api/videos/new', {
      category: category,
    });
    // console.log(response)
    if (!response.data || response.data.length === 0) {
      throw new Error("No videos found.");
    }

    return response.data; // 데이터를 반환
  } catch (error) {
    console.error("Error fetching videos for category:", error);
    throw new Error(error.response?.data?.message || 'Failed to fetch videos');
  }
};





// 필요한 다른 API 요청 함수를 여기에 추가할 수 있습니다.
