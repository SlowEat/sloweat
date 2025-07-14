import React, { useState } from 'react';
import '../../styles/user/Filter.css';

function Filter() {
  // State for each select box
  const [typeFilter, setTypeFilter] = useState('종류');
  const [situationFilter, setSituationFilter] = useState('상황');
  const [materialFilter, setMaterialFilter] = useState('재료');
  const [methodFilter, setMethodFilter] = useState('방법');
  const [sortOption, setSortOption] = useState('최신순');

  return (
    <div className="filter-container">
      <div className="filter-group">
        <select 
          className="select-box filter-select"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="종류">종류</option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
        </select>
        
        <select 
          className="select-box filter-select"
          value={situationFilter}
          onChange={(e) => setSituationFilter(e.target.value)}
        >
          <option value="상황">상황</option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
        </select>
        
        <select 
          className="select-box filter-select"
          value={materialFilter}
          onChange={(e) => setMaterialFilter(e.target.value)}
        >
          <option value="재료">재료</option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
        </select>
        
        <select 
          className="select-box filter-select"
          value={methodFilter}
          onChange={(e) => setMethodFilter(e.target.value)}
        >
          <option value="방법">방법</option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
        </select>
      </div>
      
      <select 
        className="select-box sort-select"
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
      >
        <option value="최신순">최신순</option>
        <option value="인기순">인기순</option>
        <option value="평점순">평점순</option>
      </select>
    </div>
  );
}

export default Filter;
