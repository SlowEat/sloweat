import { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import RecipeCard from '../../components/user/RecipeCard';
// import '../../styles/user/PostEntireList.css';

export default function PostEntireList() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortType, setSortType] = useState('latest'); // ✅ 정렬 상태 추가

  useEffect(() => {
    fetchRecipes(sortType);
  }, [sortType]); // ✅ 정렬 기준 변경 시 재요청

  const fetchRecipes = (sort) => {
    setLoading(true);
    axiosInstance.get(`/api/recipes/all?sort=${sort}`)
      .then(res => {
        setRecipes(res.data.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('전체 목록 조회 실패:', err);
        setLoading(false);
      });
  };

  const handleSortChange = (e) => {
    setSortType(e.target.value);
  };

  if (loading) {
    return <div className="main-layout-content">목록을 불러오는 중...</div>;
  }

  if (recipes.length === 0) {
    return <div className="main-layout-content">등록된 게시글이 없습니다.</div>;
  }

  return (
    <div className="main-layout-content">
      <h2>전체 게시글 목록</h2>

      {/* ✅ 정렬 선택 드롭다운 */}
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="sort">정렬 기준: </label>
        <select id="sort" value={sortType} onChange={handleSortChange}>
          <option value="latest">최신순</option>
          <option value="popular">인기순</option>
        </select>
      </div>

      <div className="recipe-list-container">
        {recipes.map(recipe => (
          <RecipeCard
            key={recipe.recipeId}
            data={recipe}
            isDetail={false}
          />
        ))}
      </div>
    </div>
  );
}
