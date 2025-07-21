import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import RecipeCard from '../../components/user/RecipeCard';

export default function PostEntireList() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortType, setSortType] = useState('latest');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const PAGE_GROUP_SIZE = 5;
  const startPage = Math.floor(currentPage / PAGE_GROUP_SIZE) * PAGE_GROUP_SIZE;
  const endPage = Math.min(startPage + PAGE_GROUP_SIZE - 1, totalPages - 1);

  useEffect(() => {
    const currentUserId = 1; // ✅ 실제 로그인 유저 ID를 받아와야 함
    fetchRecipes(currentPage, sortType, currentUserId);
  }, [currentPage, sortType]);

  const fetchRecipes = (page, sort, userId) => {
    setLoading(true);
    axiosInstance.get(`/api/recipes/all`, {
      params: {
        page: page,
        size: 10,
        sort: sort,
        userId: userId // ✅ 사용자 ID 포함
      }
    })
      .then(res => {
        setRecipes(res.data.data.content); // ✅ 응답 DTO에서 작성자 정보와 팔로잉 상태 포함
        setTotalPages(res.data.data.totalPages);
        setLoading(false);
      })
      .catch(err => {
        console.error('전체 목록 조회 실패:', err);
        setLoading(false);
      });
  };

  const handleSortChange = (e) => {
    setSortType(e.target.value);
    setCurrentPage(0);
  };

  const handleCardClick = (recipeId) => {
    navigate(`/postdetail/${recipeId}`, {
      state: { from: 'entire' }
    });
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return <div className="main-layout-content">목록을 불러오는 중...</div>;
  }

  if (recipes.length === 0) {
    return <div className="main-layout-content">등록된 게시글이 없습니다.</div>;
  }

  return (
    <div className="main-layout-content">
      {/* 헤더 + 정렬 */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: '4rem',
        marginBottom: '1.5rem'
      }}>
        <h2 style={{ fontWeight: 'bold', fontSize: '1.8rem', margin: 0 }}>
          전체 게시글 목록
        </h2>

        <div>
          <label htmlFor="sort" style={{ marginRight: '0.4rem', fontWeight: '500' }}>정렬 기준:</label>
          <select
            id="sort"
            value={sortType}
            onChange={handleSortChange}
            style={{ padding: '0.4rem 0.6rem', fontSize: '1rem' }}
          >
            <option value="latest">최신순</option>
            <option value="popular">인기순</option>
          </select>
        </div>
      </div>

      {/* 게시글 리스트 */}
      <div className="recipe-list-container">
        {recipes.map(recipe => (
          <div
            key={recipe.recipeId}
            style={{ cursor: 'pointer' }}
            onClick={() => handleCardClick(recipe.recipeId)}
          >
            <RecipeCard data={recipe} isDetail={true} />
          </div>
        ))}
      </div>

      {/* 페이지 버튼 그룹 */}
      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        {totalPages > 1 && (
          <>
            {/* ◀ 이전 그룹 */}
            {startPage > 0 && (
              <button
                onClick={() => handlePageClick(startPage - 1)}
                style={pageButtonStyle}
              >
                ◀
              </button>
            )}

            {/* 현재 그룹 페이지 번호 */}
            {[...Array(endPage - startPage + 1)].map((_, i) => {
              const pageNumber = startPage + i;
              return (
                <button
                  key={pageNumber}
                  onClick={() => handlePageClick(pageNumber)}
                  style={{
                    ...pageButtonStyle,
                    fontWeight: currentPage === pageNumber ? 'bold' : 'normal',
                    backgroundColor: currentPage === pageNumber ? '#eee' : '#fff'
                  }}
                >
                  {pageNumber + 1}
                </button>
              );
            })}

            {/* ▶ 다음 그룹 */}
            {endPage < totalPages - 1 && (
              <button
                onClick={() => handlePageClick(endPage + 1)}
                style={pageButtonStyle}
              >
                ▶
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// 페이지 버튼 스타일
const pageButtonStyle = {
  margin: '0 0.3rem',
  padding: '0.5rem 0.8rem',
  border: '1px solid #ccc',
  cursor: 'pointer'
};
