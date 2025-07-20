import { useEffect, useState } from 'react';
import api from '../../api/axiosInstance';
import {useParams} from "react-router-dom";
import BookmarkItem from "./BookmarkItem";

export default function BookmarkList() {
  const [recipes, setRecipes] = useState([]);
  const { collectionId, collectionName } = useParams();

  const fetchRecipes = async () => {
      const response = await api.get(`/api/bookmarks/${collectionId}`);
      let bookmarkList = response.data;

      const updatedData = bookmarkList.map(item => ({
          ...item,
          chefName: item.nickname,
          username: item.localEmail,
      }));

      setRecipes(updatedData);
  }

  useEffect(() => {
      fetchRecipes();
  }, []);

  if (recipes.length === 0) {
    return <div className="main-layout-content">등록된 게시글이 없습니다.</div>;
  }

  return (
    <div className="main-layout-content">
      <h2>{collectionName} 컬렉션의 북마크</h2>
      <div className="recipe-list-container">
        {recipes.map(recipe => (
          <BookmarkItem
            key={recipe.recipeId}
            data={recipe}
            isDetail={false}
          />
        ))}
      </div>
    </div>
  );
}
