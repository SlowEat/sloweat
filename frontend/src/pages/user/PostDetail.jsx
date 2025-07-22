import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import '../../layouts/user/MainLayout.css';
import Recipe from '../../components/bookmark/BookmarkItem';
import CommentSection from '../../components/user/CommentSection';
import BookmarkModal from "../../components/bookmark/BookmarkModal";

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [recipeData, setRecipeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // 북마크 관련 상태
  const [recipeId, setRecipeId] = useState();
  const [isBookmarkModalOpen, setIsBookmarkModalOpen] = useState(false);

  // 북마크 모달 관련 함수
  const openBookmarkModal = () => setIsBookmarkModalOpen(true);
  const closeBookmarkModal = () => {
    setIsBookmarkModalOpen(false);
    // 모달 닫힐 때 데이터 새로고침하여 북마크 상태 업데이트
    refreshRecipe();
  };

  const refreshRecipe = async () => {
    setError(false);
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/api/recipes/${id}`);
      const data = response.data.data;

      console.log('✅ 게시글 상세 API 응답:', data);

      // BookmarkItem에서 요구하는 형태로 데이터 변환
      const enhancedData = {
        ...data,
        isBookmarked: data.bookmarked,
        isLiked: data.liked,
        isFollowing: data.following,
        isMyPost: data.myPost,
        // userId가 null인 경우를 대비해 임시 처리
        userId: data.userId || data.authorId || 'unknown'
      };

      setRecipeData(enhancedData);
    } catch (err) {
      console.error('상세 조회 실패:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshRecipe();
  }, [id]);

  const handleBack = () => {
    const from = location.state?.from;
    const searchResults = location.state?.searchResults;

    if (from === 'search' && Array.isArray(searchResults)) {
      navigate('/search', { state: { searchResults } });
    } else if (from === 'entire') {
      navigate('/posts/entirelist');
    } else {
      navigate(-1);
    }
  };

  const handleEdit = () => {
    navigate(`/posts/edit/${id}`);
  };

  const handleDelete = async () => {
    const confirm = window.confirm('이 게시글을 정말 삭제하시겠어요?');
    if (!confirm) return;

    try {
      await axiosInstance.delete(`/api/recipes/${id}`);
      alert('게시글이 삭제되었습니다.');
      navigate('/posts/entirelist');
    } catch (error) {
      console.error('삭제 실패:', error);
      alert('삭제 중 오류가 발생했습니다.');
    }
  };

  if (loading) {
    return <div className="main-layout-content">로딩 중...</div>;
  }

  if (error || !recipeData) {
    return <div className="main-layout-content">데이터를 불러오지 못했습니다.</div>;
  }

  return (
    <div className="main-layout-content">
      {/* 상단 제목 영역 */}
      <div className="post-header">
        <h1 className="tap-title" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <button
            onClick={handleBack}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '18px',
              color: '#555',
              cursor: 'pointer',
              padding: '2px 4px',
              borderRadius: '4px',
              transition: 'background 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = '#f0f0f0'}
            onMouseOut={(e) => e.currentTarget.style.background = 'none'}
          >
            ←
          </button>
          게시글
        </h1>


      {/* BookmarkItem 컴포넌트를 사용한 상세 카드 */}
      <Recipe
        recipe={recipeData}
        openBookmarkModal={openBookmarkModal}
        setSelectedRecipeId={setRecipeId}
        refreshRecipe={refreshRecipe}
      />



      {/* 댓글 영역 */}
      <CommentSection recipeId={id} />

      {/* 북마크 추가 모달 */}
      {isBookmarkModalOpen && (
        <BookmarkModal
          isOpen={isBookmarkModalOpen}
          onClose={closeBookmarkModal}
          recipeId={recipeId}
        />
      )}
    </div>
  </div>
  );
}