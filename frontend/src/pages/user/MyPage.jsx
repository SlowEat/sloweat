import { useState } from 'react'
import '../../layouts/user/MainLayout.css'
import MyProfile from '../../components/user/MyProfile'
import MyPageTabNavigation from '../../components/user/MyPageTabNavigation'
import Recipe from "../../components/user/RecipeCard"
import CommentCard from '../../components/user/CommentCard'

export default function MyPage() {
  const [activeTab, setActiveTab] = useState('posts')

  return (
    <div className="main-layout-content">
      <div className="mypage-header">
        <h1 className="tap-title">마이페이지</h1>
        <MyProfile/>
        <MyPageTabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* 탭에 따라 콘텐츠 변경 - 게시글 */}
      <div>
        {activeTab === 'posts' && (
          <>
            <Recipe />
            <Recipe />
            <Recipe />
          </>
        )}
      </div>

      {/* 탭에 따라 콘텐츠 변경 - 댓글 */}
      <div>
        {activeTab === 'comments' && (
          <>
            <CommentCard></CommentCard>
            <CommentCard></CommentCard>
          </>
        )}
      </div>
    </div>
  )
}
