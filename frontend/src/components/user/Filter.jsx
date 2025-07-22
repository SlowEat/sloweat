import React, { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";
import "../../styles/user/Filter.css";

function Filter({ onSearch }) {
  const [typeFilter, setTypeFilter] = useState("");
  const [situationFilter, setSituationFilter] = useState("");
  const [materialFilter, setMaterialFilter] = useState("");
  const [methodFilter, setMethodFilter] = useState("");
  const [sortOption, setSortOption] = useState("최신순");

  const [tagOptions, setTagOptions] = useState({
    TYPE: [],
    SITUATION: [],
    INGREDIENT: [],
    METHOD: [],
  });

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await axiosInstance.get("/api/recipe/tags");
        setTagOptions(res.data.data);
      } catch (error) {
        console.error("태그 불러오기 실패:", error);
        alert("태그 목록을 불러오는 데 실패했습니다.");
      }
    };
    fetchTags();
  }, []);

  const isFilterActive = () =>
    typeFilter && situationFilter && materialFilter && methodFilter;

  const handleFilterSearch = async () => {
    if (!isFilterActive()) {
      alert("모든 필터를 선택해주세요!");
      return;
    }

    try {
      const sortParam = sortOption === "인기순" ? "popular" : "latest";

      const response = await axiosInstance.get("/api/recipes/search", {
        params: {
          type: typeFilter,
          situation: situationFilter,
          ingredient: materialFilter,
          method: methodFilter,
          sort: sortParam,
        },
      });

      onSearch(response.data.data);
    } catch (error) {
      console.error("필터 검색 실패:", error);
      alert("검색 중 오류가 발생했습니다.");
      onSearch([]);
    }
  };

  // 정렬 옵션 변경 시 자동 재검색
  useEffect(() => {
    if (isFilterActive()) {
      handleFilterSearch();
    }
  }, [sortOption]);

  return (
    <div className="filter-container">
      <div className="filter-group">
        {/* 동적 렌더링 적용 */}
        <select
          className="select-box filter-select"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="">종류</option>
          {tagOptions.TYPE.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>

        <select
          className="select-box filter-select"
          value={situationFilter}
          onChange={(e) => setSituationFilter(e.target.value)}
        >
          <option value="">상황</option>
          {tagOptions.SITUATION.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>

        <select
          className="select-box filter-select"
          value={materialFilter}
          onChange={(e) => setMaterialFilter(e.target.value)}
        >
          <option value="">재료</option>
          {tagOptions.INGREDIENT.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>

        <select
          className="select-box filter-select"
          value={methodFilter}
          onChange={(e) => setMethodFilter(e.target.value)}
        >
          <option value="">방법</option>
          {tagOptions.METHOD.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-actions">
        <button className="search-button" onClick={handleFilterSearch}>
          필터 검색
        </button>
      </div>

      <select
        className="select-box sort-select"
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
      >
        <option value="최신순">최신순</option>
        <option value="인기순">인기순</option>
      </select>
    </div>
  );
}

export default Filter;
