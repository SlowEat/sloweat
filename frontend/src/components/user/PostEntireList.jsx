import { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import RecipeCard from '../../components/user/RecipeCard';
// import '../../styles/user/PostEntireList.css';

export default function PostEntireList() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance.get('/api/recipes/all')
      .then(res => {
        setRecipes(res.data.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('전체 목록 조회 실패:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="main-layout-content">목록을 불러오는 중...</div>;
  }

  if (recipes.length === 0) {
    return <div className="main-layout-content">등록된 게시글이 없습니다.</div>;
  }

  return (
    <div className="main-layout-content">
      <h2>전체 게시글 목록</h2>
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
