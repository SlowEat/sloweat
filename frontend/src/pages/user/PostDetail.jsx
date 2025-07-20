import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';

import '../../layouts/user/MainLayout.css';
import Recipe from '../../components/user/RecipeCard';
import CommentSection from '../../components/user/CommentSection';

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [recipeData, setRecipeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const userId = 1; // 로그인 유저 ID (임시)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/api/recipes/${id}`);
        setRecipeData(response.data.data);
      } catch (err) {
        console.error('상세 조회 실패:', err);
        setError(true);
      } finally {
        setLoading(false); // ✅ 중복 제거하고 명확하게 처리
      }
    };

    fetchData();
  }, [id]);

  const handleEdit = () => {
    navigate(`/posts/edit/${id}`);
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm('이 게시글을 정말 삭제하시겠어요?');
    if (!confirmDelete) return;

    try {
      await axiosInstance.delete(`/api/recipes/${id}`);
      alert('게시글이 삭제되었습니다.');
      // ✅ 삭제 후 목록 페이지 이동 — 목록 페이지에서 최신 목록 조회 로직이 있으면 자동 리프레시됨
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
      <div className="postDetail-header">
        <h1 className="tap-title">게시글</h1>
        <div style={{ width: '663px' }}></div>
      </div>

      {/* 상세 카드 */}
      <div>
        <Recipe isDetail={true} data={recipeData} userId={userId} />
      </div>

      {/* 수정/삭제 버튼 */}
      <div style={{ marginTop: '20px' }}>
        <button className="recipe-submit-btn" onClick={handleEdit}>수정하기</button>
        <button
          className="recipe-submit-btn"
          style={{ marginLeft: '10px', backgroundColor: '#ff5252' }}
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
