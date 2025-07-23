import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import "../../styles/user/PopularTags.css";

const TAG_LABELS = {
  TYPE: "종류",
  SITUATION: "상황",
  INGREDIENT: "재료",
  METHOD: "방법",
};

const PopularTags = () => {
  const [popularTagsByType, setPopularTagsByType] = useState({});

  useEffect(() => {
    const fetchPopularTags = async () => {
      try {
        const response = await axiosInstance.get("/api/recipe/tags/popular");
        const data = response.data.data;

        // 각 타입별 최대 2개만 추출
        const trimmed = {};
        Object.entries(data).forEach(([type, tags]) => {
          trimmed[type] = tags.slice(0, 2);
        });

        setPopularTagsByType(trimmed);
      } catch (error) {
        console.error("인기 태그 조회 실패:", error);
        alert("인기 태그를 불러오는 중 오류가 발생했습니다.");
      }
    };

    fetchPopularTags();

    // 1시간마다 새로 고침
    const interval = setInterval(fetchPopularTags, 3600000); // 1시간

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="popular-tag-box">
      <section className="popular-tag-view">
        <div className="popular-tag-overlap">
          <h1 className="popular-tag-title">인기 태그</h1>

          <ul className="popular-tag-list">
            {Object.entries(popularTagsByType).map(([type, tags]) => (
              <li key={type} className="popular-tag-item-group">
                <span className="popular-tag-type">{TAG_LABELS[type]} :</span>
                {tags.map((tag, index) => (
                  <div key={index} className="popular-tag-container">
                    <span className="popular-tag-text">#{tag}</span>
                  </div>
                ))}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
};

export default PopularTags;
