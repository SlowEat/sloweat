import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../layouts/user/MainLayout.css';
import NoMatch from "../../components/user/NoMatch";
import RecipeCard from "../../components/user/RecipeCard";
import SearchBar from '../../components/user/SearchBar';
import Filter from '../../components/user/Filter';

export default function Search() {
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ 뒤로가기로 돌아왔을 때 검색 결과 복원
  useEffect(() => {
    const restored = location.state?.searchResults;
    if (restored && Array.isArray(restored)) {
      setResults(restored);
      setHasSearched(true);
    }
  }, []);

  const handleSearchResults = (data) => {
    setResults(data);
    setHasSearched(true);
  };

  const handleCardClick = (recipe) => {
    const recipeId = recipe.recipeId || recipe.id;
    if (!recipeId) {
      console.error('레시피 ID가 없습니다:', recipe);
      return;
    }

    navigate(`/postdetail/${recipeId}`, {
      state: {
        from: 'search',
        searchResults: results // ✅ 상세로 결과 전달
      }
    });
  };

  return (
    <div className="main-layout-content">
      <div className="search-header">
        <h1 className="tap-title">검색</h1>
        <SearchBar onSearch={handleSearchResults} />
        <Filter onSearch={handleSearchResults} />
      </div>

      {results.length > 0 && (
        <div>
          {results.map((recipe) => (
            <div
              key={recipe.recipeId || recipe.id}
              style={{ cursor: 'pointer' }}
              onClick={() => handleCardClick(recipe)}
            >
              <RecipeCard data={recipe} />
            </div>
          ))}
        </div>
      )}

      {!hasSearched && (
        <NoMatch
          title="레시피를 검색해보세요 😀"
          description="키워드나 태그를 입력하여 원하는 레시피를 찾아보세요"
        />
      )}

      {hasSearched && results.length === 0 && (
        <NoMatch
          title="일치하는 레시피가 없습니다 😥"
          description="직접 게시물을 등록해보세요!"
        />
      )}
    </div>
  );
}
