// src/pages/user/PostEntireList.jsx

import { useEffect, useState } from 'react';
import axios from 'axios';
import RecipeCard from '../../components/user/RecipeCard'; // 카드 컴포넌트 재사용
// import '../../styles/user/PostEntireList.css'; // 필요한 경우 스타일 분리

export default function PostEntireList() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8080/api/recipes/all')
      .then(res => {
        setRecipes(res.data);
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
