import { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import RecipeCard from '../../components/user/RecipeCard';
// import '../../styles/user/PostEntireList.css'; // CSS 미사용

export default function PostEntireList() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortType, setSortType] = useState('latest');

  useEffect(() => {
    fetchRecipes(sortType);
  }, [sortType]);

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
      {/* 왼쪽 박스 내부: 제목과 드롭다운 충분한 간격으로 나란히 배치 */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: '4rem',  // ✅ 공백 넉넉히 주기
        marginBottom: '1.5rem'
      }}>
        <h2 style={{
          fontWeight: 'bold',
          fontSize: '1.8rem',
          margin: 0
        }}>
          전체 게시글 목록
        </h2>

        <div>
          <label htmlFor="sort" style={{ marginRight: '0.4rem', fontWeight: '500' }}>정렬 기준:</label>
          <select
            id="sort"
            value={sortType}
            onChange={handleSortChange}
            style={{ padding: '0.4rem 0.6rem', fontSize: '1rem' }}
          >
            <option value="latest">최신순</option>
            <option value="popular">인기순</option>
          </select>
        </div>
      </div>

      {/* 게시글 리스트 */}
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
