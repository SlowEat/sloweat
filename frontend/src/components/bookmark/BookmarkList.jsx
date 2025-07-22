import { useEffect, useState } from 'react';
import api from '../../api/axiosInstance';
import {useParams} from "react-router-dom";
import BookmarkItem from "./BookmarkItem";
import BookmarkModal from "./BookmarkModal";
import NoMatch from "../../components/user/NoMatch";
import '../../layouts/user/MainLayout.css';

export default function BookmarkList() {
  const [recipes, setRecipes] = useState([]);
  const [recipeId, setRecipeId] = useState();
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


  //북마크 추가 모달
  const [isBookmarkModalOpen, setIsBookmarkModalOpen] = useState(false);
  const openBookmarkModal = () => setIsBookmarkModalOpen(true);
  const closeBookmarkModal = () => setIsBookmarkModalOpen(false);

    console.log('[BookmarkItem]', recipes);


  if (recipes.length === 0) {
    return (
      <div className="main-layout-content">
        <div style={{width : '665px'}}>
          <h1 className="tap-title">{collectionName} 컬렉션의 북마크</h1>
          <BookmarkListHeader></BookmarkListHeader>
        </div>
        <div className="recipe-list-container">
            <NoMatch title={'생성된 북마크가 없습니다 😥'} description={'게시물을 추가해 나만의 컬렉션을 완성해보세요'}></NoMatch>
        </div>
      </div>
    )
  }


  return (
    <div className="main-layout-content">
      <div clasName="mypage-header">
          <h1 className="tap-title">{collectionName} 컬렉션</h1>
          <BookmarkListHeader count={recipes.length}></BookmarkListHeader>
          <div className="recipe-list-container">
            {recipes.map(recipe => (
              <BookmarkItem
                key={recipe.recipeId}
                recipe={recipe}
                isDetail={false}
                openBookmarkModal={openBookmarkModal}
                setSelectedRecipeId={setRecipeId}/>
          ))}    
      </div>
        {/* 북마크 추가 모달 */}
        { isBookmarkModalOpen &&
          <BookmarkModal isOpen={isBookmarkModalOpen} onClose={closeBookmarkModal} recipeId={recipeId}/>
        }
      </div>
    </div>

  );
}

function BookmarkListHeader({count}) {
  return (
    <div className="collection-header">
      <section className="collection-stats">
        <img
          src="https://c.animaapp.com/uCLj7VDt/img/frame-1.svg"
          alt="Bookmark icon"
          className="bookmark-icon"
        />
        <p className="bookmark-count">
          <span className="count">{count || 0}</span>
          <span>개의 북마크</span>
        </p>
      </section>
    </div>
  );
}