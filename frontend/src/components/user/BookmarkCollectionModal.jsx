import React from "react";
import "../../styles/user/BookmarkCollectionModal.css";

const BookmarkCollectionModal = () => {
  return (
    <div className="screen">
      <div className="div">
        <div className="view">
          <div className="overlap">
            <div className="overlap-group">
              <div className="text-wrapper">북마크 컬렉션에 저장</div>
              {/* 북마크 아이콘 이모지 */}
              <span className="frame" role="img" aria-label="북마크" style={{ fontSize: 28, marginLeft: 12 }}>🔖</span>
            </div>
            <div className="overlap-group-wrapper">
              <div className="overlap-group-2">
                <div className="rectangle" />
                <div className="overlap-2">
                  <div className="text-wrapper-2">크림파스타 레시피</div>
                  <div className="text-wrapper-3">12개 항목</div>
                </div>
                <div className="rectangle-2" />
              </div>
            </div>
            <div className="overlap-wrapper">
              <div className="overlap-group-2">
                <div className="rectangle" />
                <div className="overlap-group-3">
                  <div className="text-wrapper-2">간단 요리</div>
                  <div className="text-wrapper-3">15개 항목</div>
                </div>
                <div className="rectangle-2" />
              </div>
            </div>
            <div className="div-wrapper">
              <div className="overlap-group-2">
                <div className="rectangle-3" />
                <div className="overlap-group-4">
                  <div className="text-wrapper-2">이탈리안 요리</div>
                  <div className="text-wrapper-3">6개 항목</div>
                </div>
                <div className="rectangle-2" />
              </div>
            </div>
            <div className="view-2">
              <div className="overlap-3" style={{ display: "flex", alignItems: "center" }}>
                {/* 새 컬렉션 아이콘 이모지 */}
                <span className="img" role="img" aria-label="새 컬렉션" style={{ fontSize: 24, marginRight: 8 }}>➕</span>
                <div className="text-wrapper-4">새 컬렉션 만들기</div>
              </div>
            </div>
            <div className="overlap-4">
              <div className="view-3">
                <div className="overlap-5">
                  <div className="text-wrapper-5">취소</div>
                </div>
              </div>
              <div className="view-4">
                <div className="overlap-6">
                  <div className="text-wrapper-6">저장하기</div>
                </div>
              </div>
            </div>
            <div className="view-5">
              <div className="overlap-7">
                <div className="rectangle-4" />
                <div className="text-wrapper-7">다이어트 요리</div>
                <div className="text-wrapper-8">8개 항목</div>
                <div className="frame-wrapper">
                  {/* 요리 아이콘 이모지 */}
                  <span className="frame-2" role="img" aria-label="요리" style={{ fontSize: 18 }}>🍲</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="view-wrapper">
          <div className="view-6">
            <div className="overlap-8">
              <div className="text-wrapper-9">컬렉션 이름</div>
              <div className="view-7">
                <div className="overlap-group-5">
                  <div className="text-wrapper-10">만들기</div>
                </div>
              </div>
              <div className="view-8">
                <div className="overlap-9">
                  <div className="text-wrapper-11">취소</div>
                </div>
              </div>
              <div className="view-9">
                <div className="overlap-10">
                  <div className="text-wrapper-12">
                    새 컬렉션 이름을 입력하세요
                  </div>
                </div>
              </div>
              {/* 입력란 옆의 아이콘 이모지 */}
              <span className="image" role="img" aria-label="컬렉션" style={{ fontSize: 22, marginLeft: 8 }}>🗂️</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookmarkCollectionModal;
