import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import '../../layouts/user/MainLayout.css'
import Profile from '../../components/user/Profile'
import MyPageTabNavigation from '../../components/user/MyPageTabNavigation'
import Recipe from "../../components/user/RecipeCard"
import CommentCard from '../../components/user/CommentCard'

export default function UserPage() {
  const { id } = useParams() // 예: /user/3 → id = '3'
  const [activeTab, setActiveTab] = useState('posts')

  const isFollowing = true 
  const isPremium = true 

  return (
    <div className="main-layout-content">
      <div className="mypage-header">
        <h1 className="tap-title">프로필</h1>

        {/* 다른 사람 프로필 */}
        <Profile isMine={false} isPremium={isPremium} initialFollowing={isFollowing} />
        
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
