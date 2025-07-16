// import { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
//
// import '../../layouts/user/MainLayout.css';
// import Recipe from "../../components/user/RecipeCard";
// import CommentSection from '../../components/user/CommentSection';
//
// export default function PostDetail() {
//   const { id } = useParams();                     // URL에서 글 ID 추출
//   const navigate = useNavigate();
//   const [recipeData, setRecipeData] = useState(null);  // 서버에서 받은 상세 데이터
//   const [loading, setLoading] = useState(true);         // 로딩 상태
//
//   useEffect(() => {
//     axios.get(`http://localhost:8080/api/recipes/${id}`)
//       .then(res => {
//         setRecipeData(res.data);
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error('상세 조회 실패:', err);
//         setLoading(false);
//       });
//   }, [id]);
//
//   const handleEdit = () => {
//     navigate(`/postedit/${id}`);
//   };
//
//   const handleDelete = async () => {
//     const confirmDelete = window.confirm('이 게시글을 정말 삭제하시겠어요?');
//     if (!confirmDelete) return;
//
//     try {
//       await axios.delete(`http://localhost:8080/api/recipes/${id}`);
//       alert('게시글이 삭제되었습니다.');
//       navigate('/postentirelist'); // ✅ 목록 페이지로 이동 (예: 게시글 리스트 화면)
//     } catch (error) {
//       console.error('삭제 실패:', error);
//       alert('삭제 중 오류가 발생했습니다.');
//     }
//   };
//
//   if (loading) {
//     return <div className="main-layout-content">로딩 중...</div>;
//   }
//
//   if (!recipeData) {
//     return <div className="main-layout-content">데이터를 불러오지 못했습니다.</div>;
//   }
//
//   return (
//     <div className="main-layout-content">
//       {/* 상단 타이틀 */}
//       <div className="postDetail-header">
//         <h1 className="tap-title">게시글</h1>
//         <div style={{ width: '663px' }}></div>
//       </div>
//
//       {/* 상세 카드 */}
//       <div>
//         <Recipe isDetail={true} data={recipeData} />
//       </div>
//
//       {/* 수정/삭제 버튼 */}
//       <div style={{ marginTop: '20px' }}>
//         <button
//           className="recipe-submit-btn"
//           onClick={handleEdit}
//         >
//           수정하기
//         </button>
//         <button
//           className="recipe-submit-btn"
//           style={{ marginLeft: '10px', backgroundColor: '#ff5252' }}
//           onClick={handleDelete}
//         >
//           삭제하기
//         </button>
//       </div>
//
//       {/* 댓글 */}
//       <CommentSection recipeId={id} />
//     </div>
//   );
// }

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import '../../layouts/user/MainLayout.css';
import Recipe from '../../components/user/RecipeCard';
import CommentSection from '../../components/user/CommentSection';

export default function PostDetail() {
  const { id } = useParams();              // URL에서 게시글 ID 추출
  const navigate = useNavigate();

  const [recipeData, setRecipeData] = useState(null); // 상세 게시글 정보
  const [loading, setLoading] = useState(true);       // 로딩 상태
  const [error, setError] = useState(false);          // 에러 상태

  // ✅ ID 변경 또는 페이지 진입 시 최신 데이터 요청
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/recipes/${id}`);
        setRecipeData(response.data);
        setLoading(false);
      } catch (err) {
        console.error('상세 조회 실패:', err);
        setError(true);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // 🔧 게시글 수정 페이지로 이동
  const handleEdit = () => {
    navigate(`/posts/edit/${id}`); // ✅ 경로 구조에 맞게 수정
  };

  // 🔧 게시글 삭제 처리 후 목록으로 이동
  const handleDelete = async () => {
    const confirmDelete = window.confirm('이 게시글을 정말 삭제하시겠어요?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8080/api/recipes/${id}`);
      alert('게시글이 삭제되었습니다.');
      navigate('/posts/entirelist'); // ✅ 경로 구조에 맞게 수정
    } catch (error) {
      console.error('삭제 실패:', error);
      alert('삭제 중 오류가 발생했습니다.');
    }
  };

  // 🧭 로딩 중 표시
  if (loading) {
    return <div className="main-layout-content">로딩 중...</div>;
  }

  // ❗ 에러 발생 시 안내 메시지
  if (error || !recipeData) {
    return <div className="main-layout-content">데이터를 불러오지 못했습니다.</div>;
  }

  // ✅ 상세 페이지 렌더링
  return (
    <div className="main-layout-content">
      {/* 페이지 상단 타이틀 */}
      <div className="postDetail-header">
        <h1 className="tap-title">게시글</h1>
        <div style={{ width: '663px' }}></div>
      </div>

      {/* 레시피 상세 카드 */}
      <div>
        <Recipe isDetail={true} data={recipeData} />
      </div>

      {/* 수정/삭제 버튼 */}
      <div style={{ marginTop: '20px' }}>
        <button className="recipe-submit-btn" onClick={handleEdit}>
          수정하기
        </button>
        <button
          className="recipe-submit-btn"
          style={{ marginLeft: '10px', backgroundColor: '#ff5252' }}
          onClick={handleDelete}
        >
          삭제하기
        </button>
      </div>

      {/* 댓글 섹션 */}
      <CommentSection recipeId={id} />
    </div>
  );
}
