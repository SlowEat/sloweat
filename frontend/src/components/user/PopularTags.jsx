import React from 'react'
import '../../styles/user/PopularTags.css'

const PopularTags = () => {
  const tags = [
    { id: 1, name: '#크림파스타' },
    { id: 2, name: '#다이어트' }
  ]

  return (
    <main className="popular-tag-box" data-model-id="119:49-frame">
      <section className="popular-tag-view">
        <div className="popular-tag-overlap">
          <h1 className="popular-tag-title">인기 태그</h1>
          <ul className="popular-tag-list">
            {tags.map((tag) => (
              <li key={tag.id} className="popular-tag-item">
                <div className="popular-tag-container">
                  <span className="popular-tag-text">{tag.name}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}

export default PopularTags
