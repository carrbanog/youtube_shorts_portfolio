import React, { useContext, useEffect, useState } from "react";
import { fetchVideos, fetchTopicVideos } from "../../api/api";
import { postGraph } from "../../api/typeSearch";
import { VideoContext } from "../../VideoContext/VideoContext";
import "./Main2.css";
import { Link } from "react-router-dom";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement, // 원형 차트에 필요한 요소 등록
  Title,
  Tooltip,
  Legend
);

const Main = () => {
  const { mainVideos, setMainVideos, topicVideos, setTopicVideos } =
    useContext(VideoContext);

  const [graphDraw, setGraphDraw] = useState([]); // 차트 데이터
  const [maxCategory, setMaxCategory] = useState(""); // 가장 많은 count의 카테고리

  // 1. 추천 영상 로드
  useEffect(() => {
    const loadRecommendedVideos = async () => {
      const recommendedVideoData = await fetchVideos("abcd");
      setMainVideos(recommendedVideoData);
    };

    loadRecommendedVideos();
  }, [setMainVideos]);

  // 2. 차트 데이터 로드 및 가장 큰 카테고리 설정
  useEffect(() => {
    const loadPostGraph = async () => {
      const graphData = await postGraph();
      console.log(graphData)
      if (graphData && graphData.length > 0) {
        setGraphDraw(graphData);
        // console.log(graphData.length)
        // 가장 큰 count의 카테고리 찾기
        const maxItem = graphData.reduce((prev, current) =>
          prev.count > current.count ? prev : current
        );
        setMaxCategory(maxItem.category);
      }
    };

    loadPostGraph();
  }, []); // 빈 의존성 배열로 한 번만 실행

  // 3. 가장 큰 카테고리를 기반으로 토픽 영상 로드
  useEffect(() => {
    if (maxCategory) {
      const loadTopicVideos = async () => {
        const topicVideoData = await fetchTopicVideos(maxCategory);
        setTopicVideos(topicVideoData);
        // console.log(topicVideoData.length)
      };

      loadTopicVideos();
    }
  }, [maxCategory, setTopicVideos]); // maxCategory 변경 시 실행

  // 차트 데이터
  const chartData = {
    labels: graphDraw.map((item) => item.category), // 카테고리 이름
    datasets: [
      {
        label: "카테고리별 개수",
        data: graphDraw.map((item) => item.count), // count 값
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"], // 막대 색상
        borderColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"], // 테두리 색상
        borderWidth: 1, // 테두리 두께
      },
    ],
  };

  // 차트 옵션
  const options = {
    responsive: true,
    maintainAspectRatio: false, // 비율 고정 해제
    plugins: {
      legend: {
        position: "top", // 범례 위치
      },
      title: {
        display: true,
        text: "카테고리별 데이터", // 차트 제목
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            return tooltipItem.label + ": " + tooltipItem.raw + "개"; // 툴팁에 카테고리와 값을 표시
          },
        },
      },
      datalabels: {
        display: true,
        formatter: (value, context) => {
          return context.chart.data.labels[context.dataIndex]; // 각 구역에 이름 표시
        },
        color: "white", // 텍스트 색상
        font: {
          weight: "bold", // 글씨 굵기
          size: 14, // 글씨 크기
        },
      },
    },
  };

  return (
    <div className="main">
      {/* 추천 영상 섹션 */}
      <div className="recommededVideo">
        <h2>추천 영상</h2>
        {mainVideos.length === 0 ? (
          <div className="loading">Loading ...</div>
        ) : (
          <div className="recommendedList">
            {mainVideos.map((video) => (
              <Link
                to={`videoplay/recommended/${video.video_id}`}
                key={video.video_id}
              >
                <div className="box">
                  <img
                    src={`https://img.youtube.com/vi/${video.video_id}/maxresdefault.jpg`}
                    alt="thumbnail"
                  />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* 토픽 영상 섹션 */}
      <div className="topicVideo">
        <h2>
          {topicVideos.length > 0 ? `${maxCategory} Video` : "Loading..."}
        </h2>
        <div className="topicList">
          {topicVideos.map((video) => (
            <Link to={`videoplay/topic/${video.video_id}`} key={video.video_id}>
              <div className="box">
                <img
                  src={`https://img.youtube.com/vi/${video.video_id}/maxresdefault.jpg`}
                  alt="thumbnail"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 차트 섹션 */}
      <div style={{ width: "400px", height: "400px", margin: "0 auto" }} className="chart">
        {graphDraw.length > 0 ? (
          <>
            <div className="chart-text">당신이 가장 선호하는 장르는 {maxCategory} 입니다.</div>
            <Pie data={chartData} options={options} />
          </>
        ) : (
          <p>Loading chart...</p>
        )}
      </div>
    </div>
  );
};

export default Main;
