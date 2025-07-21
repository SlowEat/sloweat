import React, { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";
import "../../styles/user/SearchBar.css";

function SearchBar({ onSearch }) {
  const [keyword, setKeyword] = useState("");
  const [sortOption, setSortOption] = useState("최신순");

  const handleSearch = async () => {
    if (!keyword.trim()) {
      alert("검색어를 입력해주세요!");
      return;
    }

    try {
      const sortParam = sortOption === "인기순" ? "popular" : "latest";

      const response = await axiosInstance.get("/api/recipes/search-keyword", {
        params: { keyword, sort: sortParam },
      });

      onSearch(response.data.data);
    } catch (error) {
      console.error("검색 실패:", error);
      alert("검색 중 오류가 발생했습니다.");
      onSearch([]);
    }
  };

  // ✅ 정렬 옵션이 변경되면 자동으로 검색 요청
  useEffect(() => {
    if (keyword.trim()) {
      handleSearch();
    }
  }, [sortOption]);

  return (
    <div
      className="searchbar-container"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: "12px",
        marginBottom: "1rem",
      }}
    >
      <input
        type="text"
        className="search-input"
        placeholder="레시피 키워드를 입력하세요"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        style={{
          flex: 1,
          height: "40px",
          padding: "0 12px",
          fontSize: "15px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          backgroundColor: "#f8f8f8",
        }}
      />

      <button
        className="search-button"
        onClick={handleSearch}
        style={{
          height: "40px",
          padding: "0 14px",
          fontSize: "15px",
          borderRadius: "6px",
          border: "none",
          color: "white",
          cursor: "pointer",
        }}
      >
        🔍 검색
      </button>

      {/* <select
        className="select-box sort-select"
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
        style={{
          height: "40px",
          fontSize: "15px",
          padding: "0 10px",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      >
        <option value="최신순">최신순</option>
        <option value="인기순">인기순</option>
      </select> */}
    </div>
  );
}

export default SearchBar;
