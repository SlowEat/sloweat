import React from 'react'
import '../../styles/user/CommentCard.css'

const CommentCard = () => {
  return (
    <article className="comment-card">
      <div className="comment-card-container">
        <button className="comment-card-more-button" aria-label="더 보기">
          <img
            className="comment-card-more-icon"
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM2Yjc2N2MiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1lbGxpcHNpcy1pY29uIGx1Y2lkZS1lbGxpcHNpcyI+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMSIvPjxjaXJjbGUgY3g9IjE5IiBjeT0iMTIiIHI9IjEiLz48Y2lyY2xlIGN4PSI1IiBjeT0iMTIiIHI9IjEiLz48L3N2Zz4="
            alt="더 보기 아이콘"
          />
        </button>

        <div className="comment-card-body">
          <img
            className="comment-card-profile-image"
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="김요리 프로필 이미지"
          />
          <div className="comment-card-user-info">
            <div className="comment-card-user-meta">
              <h2 className="comment-card-username">김요리</h2>
              <span className="comment-card-user-handle">@kimcook</span>
              <span className="comment-card-separator">·</span>
              <time className="comment-card-time" dateTime="PT2H">2시간 전</time>
            </div>
            <p className="comment-card-text">
              이 레시피 너무 좋아요! 다음에도 또 공유해주세요 😋
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}

export default CommentCard
