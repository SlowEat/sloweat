import { useState } from 'react';
import '../../layouts/user/MainLayout.css';
import NoMatch from "../../components/user/NoMatch";
import RecipeCard from "../../components/user/RecipeCard";
import SearchBar from '../../components/user/SearchBar';
import Filter from '../../components/user/Filter';

export default function Search() {
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false); // 검색 실행 여부

  const handleSearchResults = (data) => {
    setResults(data);
    setHasSearched(true);
  };

  return (
    <div className="main-layout-content">
      {/* Header */}
      <div className="search-header">
        <h1 className="tap-title">검색</h1>
        <SearchBar onSearch={handleSearchResults} />
{/*         <Filter /> */}
        <Filter onSearch={handleSearchResults} />

      </div>

      {/* 검색 결과가 있을 경우 */}
      {results.length > 0 && (
        <div>
          {results.map((recipe) => (
            <RecipeCard key={recipe.recipeId} data={recipe} />
          ))}
        </div>
      )}

      {/* 검색 전 */}
      {!hasSearched && (
        <NoMatch
          title="레시피를 검색해보세요 😀"
          description="키워드나 태그를 입력하여 원하는 레시피를 찾아보세요"
        />
      )}

      {/* 검색 후 결과 없음 */}
      {hasSearched && results.length === 0 && (
        <NoMatch
          title="일치하는 레시피가 없습니다 😥"
          description="직접 게시물을 등록해보세요!"
        />
      )}
    </div>
  );
}
