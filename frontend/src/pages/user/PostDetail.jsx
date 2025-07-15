// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
//
// import '../../layouts/user/MainLayout.css';
// import Recipe from "../../components/user/RecipeCard";
// import CommentSection from '../../components/user/CommentSection';
//
// export default function PostDetail() {
//   const { id } = useParams();             // URL에서 글 ID 추출
//   const [recipeData, setRecipeData] = useState(null);  // 상세 데이터 상태 저장
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
//       {/* Header */}
//       <div className="postDetail-header">
//         <h1 className="tap-title">게시글</h1>
//         <div style={{ width: '663px' }}></div>
//       </div>
//
//       {/* 게시글 상세 */}
//       <div>
//         <Recipe isDetail={true} data={recipeData} />
//       </div>
//
//       {/* 댓글 섹션 */}
//       <CommentSection recipeId={id} />
//     </div>
//   );
// }

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import '../../layouts/user/MainLayout.css';
import Recipe from "../../components/user/RecipeCard";
import CommentSection from '../../components/user/CommentSection';

export default function PostDetail() {
  const { id } = useParams();                     // URL에서 글 ID 추출
  const [recipeData, setRecipeData] = useState(null);  // 서버에서 받은 상세 데이터
  const [loading, setLoading] = useState(true);         // 로딩 상태

  useEffect(() => {
    axios.get(`http://localhost:8080/api/recipes/${id}`) // 백엔드 요청
      .then(res => {
        setRecipeData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('상세 조회 실패:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="main-layout-content">로딩 중...</div>;
  }

  if (!recipeData) {
    return <div className="main-layout-content">데이터를 불러오지 못했습니다.</div>;
  }

  return (
    <div className="main-layout-content">
      {/* 상단 타이틀 */}
      <div className="postDetail-header">
        <h1 className="tap-title">게시글</h1>
        <div style={{ width: '663px' }}></div>
      </div>

      {/* 상세 카드 */}
      <div>
        <Recipe isDetail={true} data={recipeData} />
      </div>

      {/* 댓글 */}
      <CommentSection recipeId={id} />
    </div>
  );
}
