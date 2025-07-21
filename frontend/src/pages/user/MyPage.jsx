import {useEffect, useState} from 'react'
import '../../layouts/user/MainLayout.css'
import MyProfile from '../../components/user/MyProfile'
import MyPageTabNavigation from '../../components/user/MyPageTabNavigation'
import CommentCard from '../../components/user/CommentCard'
import api from "../../api/axiosInstance";
import BookmarkItem from "../../components/bookmark/BookmarkItem";
import BookmarkModal from "../../components/bookmark/BookmarkModal";
import './MyPage.css';

export default function MyPage() {
  const [activeTab, setActiveTab] = useState('posts');
  const [myRecipes, setMyRecipes] = useState([]);
  const [myComments, setMyComments] = useState([]);
  const [selectedRecipeId, setSelectedRecipeId] = useState();

    // 게시물 탭 조회
   const fetchMyRecipes = async () => {
        const response = await api.get(`/api/mypage/recipes`);
        let data = response.data;

        const recipes = data.map(item => ({
            ...item,
            chefName: item.nickname,
            username: item.localEmail,
        }));

       setMyRecipes(recipes);
    };

    // 댓글 탭 조회
    const fetchMyComments = async () => {
        const response = await api.get(`/api/mypage/comments`);
        let data = response.data;

        const comments = data.map(item => ({
            ...item,
            chefName: item.nickname,
            username: item.localEmail,
        }));

        setMyComments(comments);
    };

    useEffect(() => {
        if (activeTab === 'posts') {
            fetchMyRecipes();
        }else{
            fetchMyComments();
        }
    }, [activeTab]);

    //북마크 추가 모달
    const [isBookmarkModalOpen, setIsBookmarkModalOpen] = useState(false);
    const openBookmarkModal = () => setIsBookmarkModalOpen(true);
    const closeBookmarkModal = () => setIsBookmarkModalOpen(false);

  return (
    <div className="main-layout-content">
      <div className="mypage-header">
        <h1 className="tap-title">마이페이지</h1>
        <MyProfile/>
        <MyPageTabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* 탭에 따라 콘텐츠 변경 - 게시글 */}
      <div>
          {activeTab === 'posts' && myRecipes.map(recipe => (
                <BookmarkItem
                    key={recipe.recipeId}
                    recipe={recipe}
                    isDetail={false}
                    openBookmarkModal={openBookmarkModal}
                    setSelectedRecipeId = {setSelectedRecipeId}
                />
          ))}
      </div>

      {/* 탭에 따라 콘텐츠 변경 - 댓글 */}
      <div>
        {activeTab === 'comments' && myComments.map(comment => (
            <CommentCard comment={comment} />
        ))}
      </div>

        {/* 북마크 추가 모달 */}
        <div>

        </div>
        { isBookmarkModalOpen && selectedRecipeId && (
            <BookmarkModal isOpen={isBookmarkModalOpen} onClose={closeBookmarkModal} recipeId={selectedRecipeId}/>
        )}
    </div>
  )
}
