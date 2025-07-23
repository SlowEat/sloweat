import React, { useEffect, useState } from "react";
import "./RecipeManagement.css";
import {
  fetchAdminRecipes,
  deleteAdminRecipe,
  rejectAdminRecipe,
} from "../../../api/admin/adminRecipe"; // AdminRecipe 관련 API 함수 임포트

// 페이지 번호 목록 계산 + 블록 단위 페이징 구현 함수
const getPaginationRange = (currentPage, totalPages, blockSize = 5) => {
  const currentBlock = Math.floor(currentPage / blockSize);
  const startPage = currentBlock * blockSize;
  const endPage = Math.min(startPage + blockSize, totalPages);

  const range = [];
  for (let i = startPage; i < endPage; i++) {
    range.push(i);
  }

  return {
    range,
    hasPrevBlock: startPage > 0,
    hasNextBlock: endPage < totalPages,
    prevBlockPage: startPage - 1,
    nextBlockPage: endPage,
  };
};

const RecipeManagement = () => {
  // 게시물, 페이징 상태
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0); // 현재 페이지
  const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수

  // 검색 및 필터 상태
  const [filterStatus, setFilterStatus] = useState("전체");
  const [searchType, setSearchType] = useState("title"); // 제목 or 작성자
  const [searchKeyword, setSearchKeyword] = useState("");

  // 영어 -> 한글 상태 매핑
  const statusMap = {
    NONE: "정상",
    REQUEST: "신고됨",
    APPROVE: "신고승인",
    REJECT: "신고반려",
  };

  // 한글 -> 영어 상태 매핑
  const reverseStatusMap = {
    전체: null,
    정상: "NONE",
    신고됨: "REQUEST",
    신고승인: "APPROVE",
    신고반려: "REJECT",
  };

  // 레시피 목록 조회 API 호출
  const loadRecipes = async (
    page = 0,
    keyword = searchKeyword,
    type = searchType,
    status = filterStatus
  ) => {
    try {
      const response = await fetchAdminRecipes({
        title: type === "title" ? keyword : undefined,
        author: type === "author" ? keyword : undefined,
        status: reverseStatusMap[status] ?? undefined,
        page: page,
        size: 9, // 페이지당 나타날 게시글 수
      });
      setPosts(response.content || []); // Page 객체에서 content만 사용
      setTotalPages(response.totalPages);
      setPage(page);
    } catch (err) {
      console.error("레시피 목록 로딩 실패", err);
    }
  };

  // 날짜 포맷 함수(yyyy-mm-dd)
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toISOString().split("T")[0]; // yyyy-mm-dd
  };

  // 상태 필터 변경 시, 첫 페이지로 초기화 후 새로 불러옴
  useEffect(() => {
    setPage(0); // 페이지 초기화
    loadRecipes(0, searchKeyword, searchType, filterStatus);
  }, [filterStatus]);

  // 상태 필터 드롭다운 변경 핸들러
  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  // 삭제 버튼 클릭 시 API 호출 및 새로고침
  const handleDelete = async (recipeId) => {
    try {
      await deleteAdminRecipe(recipeId);
      alert("삭제 완료");
      loadRecipes(0, searchKeyword, searchType, filterStatus);
    } catch (err) {
      console.error("삭제 실패", err);
    }
  };

  // 반려 버튼 클릭 시 API 호출 및 새로고침
  const handleReject = async (recipeId) => {
    try {
      await rejectAdminRecipe(recipeId);
      alert("반려 처리 완료");
      loadRecipes(0, searchKeyword, searchType, filterStatus);
    } catch (err) {
      console.error("반려 처리 실패", err);
    }
  };

  // 검색 버튼 클릭 시 검색 조건 반영하여 재조회
  const handleSearch = () => {
    setPage(0); // 검색 시 페이지 초기화
    loadRecipes(0, searchKeyword, searchType, filterStatus);
  };

  // 페이지 블록 정보 가져오기
  const { range, hasPrevBlock, hasNextBlock, prevBlockPage, nextBlockPage } =
    getPaginationRange(page, totalPages, 5);

  return (
    <div className="recipe-wrapper">
      <div className="recipe-content-box">
        <div className="recipe-page-header">
          <h1 className="recipe-page-title">게시물 관리</h1>
          <div className="recipe-search">
            <select
              className="recipe-search-type"
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
            >
              <option value="title">제목</option>
              <option value="author">작성자</option>
            </select>
            <input
              type="text"
              placeholder="검색어 입력"
              className="recipe-search-input"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <button className="recipe-search-button" onClick={handleSearch}>
              검색
            </button>
          </div>
        </div>

        {/* 상태 필터 드롭다운 */}
        <div className="recipe-filter-bar">
          <div className="recipe-section-title">게시물 목록</div>
          <select
            className="recipe-status-filter"
            value={filterStatus}
            onChange={handleFilterChange}
          >
            <option value="전체">전체</option>
            <option value="정상">정상</option>
            <option value="신고됨">신고됨</option>
            <option value="신고승인">신고승인</option>
            <option value="신고반려">신고반려</option>
          </select>
        </div>

        {/* 테이블 헤더 */}
        <section className="recipe-table">
          <div className="recipe-grid recipe-table-header">
            <span>ID</span>
            <span>제목</span>
            <span>작성자</span>
            <span>작성일</span>
            <span>신고수</span>
            <span>상태</span>
            <span>작업</span>
          </div>

          {/* 게시물 목록 */}
          {posts.map((post) => (
            <div className="recipe-grid recipe-table-row" key={post.id}>
              <span>{post.id}</span>
              <p>{post.title}</p>
              <span>{post.author}</span>
              <span>{formatDate(post.createdAt)}</span>
              <span>
                <span
                  className={`recipe-badge ${
                    post.reportCount > 0 ? "reported" : "normal"
                  }`}
                >
                  {post.reportCount}
                </span>
              </span>
              <span>
                <span
                  className={`recipe-badge ${
                    post.status === "NONE"
                      ? "status-normal"
                      : post.status === "REQUEST"
                      ? "status-reported"
                      : post.status === "APPROVE"
                      ? "status-approved"
                      : post.status === "REJECT"
                      ? "status-rejected"
                      : ""
                  }`}
                >
                  {statusMap[post.status] || post.status}{" "}
                  {/* 영어 → 한글 매핑 표시 */}
                </span>
              </span>
              <span>
                <div className="recipe-action-wrapper">
                  {/* 신고됨 상태일 때만 삭제/반려 버튼 표시 */}
                  {post.status === "REQUEST" ? (
                    <>
                      <button
                        className="recipe-delete-btn"
                        onClick={() => handleDelete(post.id)}
                      >
                        삭제
                      </button>
                      <button
                        className="recipe-reject-btn"
                        onClick={() => handleReject(post.id)}
                      >
                        반려
                      </button>
                    </>
                  ) : (
                    <span className="recipe-action-placeholder">-</span>
                  )}
                </div>
              </span>
            </div>
          ))}
        </section>

        {/* 페이징 버튼 */}
        <div className="recipe-pagination">
          {/* 맨 처음 페이지 */}
          <button
            className="recipe-page-btn"
            disabled={page === 0}
            onClick={() =>
              loadRecipes(0, searchKeyword, searchType, filterStatus)
            }
          >
            &laquo;
          </button>

          {/* 이전 블록으로 */}
          <button
            className="recipe-page-btn"
            disabled={!hasPrevBlock}
            onClick={() =>
              loadRecipes(
                prevBlockPage,
                searchKeyword,
                searchType,
                filterStatus
              )
            }
          >
            &lt;
          </button>

          {/* 현재 블록 내 페이지 목록 */}
          {range.map((p) => (
            <button
              key={p}
              className={`recipe-page-btn ${p === page ? "active" : ""}`}
              onClick={() =>
                loadRecipes(p, searchKeyword, searchType, filterStatus)
              }
            >
              {p + 1}
            </button>
          ))}

          {/* 다음 블록으로 */}
          <button
            className="recipe-page-btn"
            disabled={!hasNextBlock}
            onClick={() =>
              loadRecipes(
                nextBlockPage,
                searchKeyword,
                searchType,
                filterStatus
              )
            }
          >
            &gt;
          </button>

          {/* 마지막 페이지로 */}
          <button
            className="recipe-page-btn"
            disabled={page === totalPages - 1}
            onClick={() =>
              loadRecipes(
                totalPages - 1,
                searchKeyword,
                searchType,
                filterStatus
              )
            }
          >
            &raquo;
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeManagement;
