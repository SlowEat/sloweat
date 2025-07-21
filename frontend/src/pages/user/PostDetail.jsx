import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import '../../layouts/user/MainLayout.css';
import Recipe from '../../components/user/RecipeCard';
import CommentSection from '../../components/user/CommentSection';

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [recipeData, setRecipeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const refreshRecipe = async () => {
    setError(false);
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/api/recipes/${id}`);
      setRecipeData(response.data.data); // ✅ DTO에 작성자 정보와 팔로우 여부 포함되어 있다고 가정
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
      <div className="postDetail-header" style={{ marginBottom: '1rem' }}>
        <h1 className="tap-title" style={{ margin: 0 }}>게시글</h1>
      </div>

      {/* 상세 카드 */}
      <Recipe
        isDetail={true}
        data={recipeData} // ✅ 작성자 정보 및 팔로우 상태 포함
        refreshRecipe={refreshRecipe}
      />

      {/* 버튼 영역 */}
      <div style={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: '10px',
        marginTop: '20px'
      }}>
        <button
          style={{
            padding: '6px 12px',
            fontSize: '14px',
            borderRadius: '4px',
            backgroundColor: '#ddd',
            border: 'none',
            cursor: 'pointer'
          }}
          onClick={handleBack}
        >
          ← 뒤로가기
        </button>

        <button className="recipe-submit-btn" onClick={handleEdit}>수정하기</button>
        <button
          className="recipe-submit-btn"
          style={{ backgroundColor: '#ff5252' }}
          onClick={handleDelete}
        >
          삭제하기
        </button>
      </div>

      {/* 댓글 영역 */}
      <CommentSection recipeId={id} />
    </div>
  );
}
