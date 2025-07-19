import React, { useState } from 'react';
import axiosInstance from '../../api/axiosInstance'; // ✅ 수정된 부분
import '../../styles/user/Filter.css';

function Filter({ onSearch }) {
  const [typeFilter, setTypeFilter] = useState('');
  const [situationFilter, setSituationFilter] = useState('');
  const [materialFilter, setMaterialFilter] = useState('');
  const [methodFilter, setMethodFilter] = useState('');
  const [sortOption, setSortOption] = useState('최신순');

  const handleFilterSearch = async () => {
    if (!typeFilter || !situationFilter || !materialFilter || !methodFilter) {
      alert('모든 필터를 선택해주세요!');
      return;
    }

    try {
      const response = await axiosInstance.get('/api/recipes/search', {
        params: {
          type: typeFilter,
          situation: situationFilter,
          ingredient: materialFilter,
          method: methodFilter
        }
      });

      onSearch(response.data.data);
    } catch (error) {
      console.error('필터 검색 실패:', error);
      alert('검색 중 오류가 발생했습니다.');
      onSearch([]);
    }
  };

  return (
    <div className="filter-container">
      <div className="filter-group">
        <select className="select-box filter-select" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
          <option value="">종류</option>
          <option value="한식">한식</option>
          <option value="양식">양식</option>
          <option value="중식">중식</option>
        </select>

        <select className="select-box filter-select" value={situationFilter} onChange={(e) => setSituationFilter(e.target.value)}>
          <option value="">상황</option>
          <option value="혼밥">혼밥</option>
          <option value="파티">파티</option>
          <option value="야식">야식</option>
        </select>

        <select className="select-box filter-select" value={materialFilter} onChange={(e) => setMaterialFilter(e.target.value)}>
          <option value="">재료</option>
          <option value="파스타">파스타</option>
          <option value="닭고기">닭고기</option>
          <option value="계란">계란</option>
        </select>

        <select className="select-box filter-select" value={methodFilter} onChange={(e) => setMethodFilter(e.target.value)}>
          <option value="">방법</option>
          <option value="굽기">굽기</option>
          <option value="끓이기">끓이기</option>
          <option value="볶기">볶기</option>
        </select>
      </div>

      <div className="filter-actions">
        <button className="search-button" onClick={handleFilterSearch}>필터 검색</button>
      </div>

      <select className="select-box sort-select" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
        <option value="최신순">최신순</option>
        <option value="인기순">인기순</option>
        <option value="평점순">평점순</option>
      </select>
    </div>
  );
}

export default Filter;
