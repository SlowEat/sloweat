
# Sloweat
<blockquote>멋쟁이사자처럼 백엔드 부트캠프 15기 세미프로젝트</blockquote>
<div>
  <img width="800" height="897" alt="image" src="https://github.com/user-attachments/assets/ef0621a4-9a30-4ed0-b35e-38abcbb9e7b8" />
</div>
<br>

## 🖥️ 프로젝트 소개
**개발기간 : 2025.07.08 ~ 2025.07.22**
- Sloweat은 저속노화를 위한 맞춤형 레시피를 공유하고, 유료 구독을 통해 프리미엄 식단 콘텐츠를 즐길 수 있는 <mark>**SNS 기반 식단 플랫폼**</mark>입니다.
- 좋아요, 북마크, 팔로우, 댓글 등 소셜 커뮤니티 기능을 구현하였습니다. 
<br> 

## 🦁 팀원 구성 및 역할 분배
<table>
  <thead>
    <tr>
      <th>이름</th>
      <th>담당 역할</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td align="center"><a href="https://github.com/sihwan0816" target="_blank"><b>김시환</b></a></td>
      <td align="center">댓글 조회/저장/수정/삭제 등 댓글 전반</td>
    </tr>
    <tr>
      <td align="center"><a href="https://github.com/kang1979" target="_blank"><b>강병찬</b></a></td>
      <td align="center">구독/결제/유료 구독 기능 전반</td>
    </tr>
    <tr>
      <td align="center"><a href="https://github.com/Rix01" target="_blank"><b>이채린</b></a></td>
      <td align="center">관리자 권한 게시글, 댓글, 회원, 결제 관리 및 통계/매출 기능</td>
    </tr>
    <tr>
      <td align="center"><a href="https://github.com/ssong7890" target="_blank"><b>송지원</b></a></td>
      <td align="center">게시글 조회/저장/수정/삭제 등 게시글 전반</td>
    </tr>
    <tr>
      <td align="center"><a href="https://github.com/his8457" target="_blank"><b>황인선</b></a></td>
      <td align="center">팔로잉/팔로우, 컬렉션/북마크 관련 기능 전반</td>
    </tr>
    <tr>
      <td align="center"><a href="https://github.com/jihyun0616" target="_blank"><b>황지현</b></a></td>
      <td align="center">회원가입, 로그인/로그아웃, 개인정보 변경 등 사용자 관리 전반</td>
    </tr>
  </tbody>
</table>
<br> 


## 🚀 Tech Stacks
<table>
  <thead>
    <tr>
      <th>카테고리</th>
      <th>기술스택</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>프론트엔드</td>
      <td>
        <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">
        <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
        <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white">
        <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
      </td>
    </tr>
    <tr>
      <td>백엔드</td>
      <td>
        <img src="https://img.shields.io/badge/springboot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white">
        <img src="https://img.shields.io/badge/java-007396?style=for-the-badge&logo=java&logoColor=white">
        <img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white">
        <img src="https://img.shields.io/badge/Hibernate-59666C?style=for-the-badge&logo=Hibernate&logoColor=white">
      </td>
    </tr>
    <tr>
      <td>기타</td>
      <td>
        <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
        <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
        <img src="https://img.shields.io/badge/Discord-7289DA?style=for-the-badge&logo=discord&logoColor=white">
        <img src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white">
        <img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white">
        <img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white">
      </td>
    </tr>
  </tbody>
</table>
<br> 

## 📁 프로젝트 구조
<pre>
  <code>
📦 backend
├── src
│   ├── main
│   │   ├── java
│   │   │   └── com.sloweat
│   │   │       ├── common       # 공통 유틸, 설정
│   │   │       ├── domain       # 도메인별 엔티티/서비스/리포지토리
│   │   │       ├── global       # 전역 설정
│   │   │       └── SloweatApplication.java
│   │   └── resources            # application.yml 등 설정 파일
│   └── test                    # 테스트 코드

📦 frontend
├── public
├── src
│   ├── api           # Axios API 함수
│   ├── assets        # 정적 리소스
│   ├── components    # 재사용 컴포넌트
│   ├── constants     # 상수 정의
│   ├── img           # 이미지 파일
│   ├── layouts       # 공통 레이아웃
│   ├── pages         # 라우팅되는 페이지
│   ├── routes        # 라우터 설정
│   ├── styles        # CSS
│   ├── utils         # 유틸 함수
│   ├── App.js
│   └── index.js
  </code>
</pre>
<br> 

## ⭐ 주요 기능
### 👤 일반 사용자
| 구분                             | 세부 기능                                                                            |
| ------------------------------ | -------------------------------------------------------------------------------- |
| **회원가입 / 로그인** <br>(JWT 기반 인증) | - 아이디/닉네임 중복 확인 <br> - 비밀번호 유효성 검증 <br> - 권한에 따른 라우팅 처리                          |
| **게시글**                        | - 게시글 CRUD <br> - 게시글 좋아요 <br> - 게시글 북마크 <br> - 게시글 신고 <br> - 게시글 검색 (키워드/태그/정렬) |
| **댓글**                         | - 댓글 CRUD <br> - 댓글 좋아요 <br> - 댓글 신고                                             |
| **컬렉션**                        | - 컬렉션 생성 <br> - 이름 수정 <br> - 삭제                                                  |
| **설정 - 개인정보 수정**               | - 프로필 사진 변경 <br> - 닉네임/한줄소개 변경 <br> - 회원 탈퇴                                      |
| **설정 - 구독/결제**                 | - 광고/배너 기반 결제 유도 <br> - 아임포트 결제 연동 <br> - 결제 내역 확인 <br> - 결제 방법 변경 <br> - 환불 요청  |
| **마이페이지**                      | - 내가 쓴 게시글/댓글 조회 <br> - 내 팔로워/팔로잉 조회                                             |
| **기타**                         | - 유저 간 팔로우/언팔로우 <br> - 팔로우 추천 기능 <br> - 인기 태그 추천 기능                              |


### 👤 관리자
| 구분         | 세부 기능                                                       |
| ---------- | ----------------------------------------------------------- |
| **게시글 관리** | - 게시글 검색 (제목/작성자) <br> - 신고된 글 삭제/반려 <br> - 게시글 상태별 필터링     |
| **댓글 관리**  | - 댓글 검색 (내용/작성자) <br> - 신고된 댓글 삭제/반려 <br> - 댓글 상태별 필터링      |
| **회원 관리**  | - 회원 상태 (활성/정지/탈퇴) 변경 <br> - 닉네임 검색 <br> - 상태별 필터링          |
| **결제 관리**  | - 환불 요청 승인/거절 <br> - 결제 상태별 필터링                             |
| **통계 리포트** | - 총 매출, 유료 회원 수, 전체 회원 수 <br> - 최근 6개월 월별 매출 및 가입자 수 그래프 제공 |
<br>

## 🎥 시연 영상 및 발표자료
🔗 [[YOUTUBE] 시연영상](https://youtu.be/eCW4iJP33mM)<br>
🔗 [Sloweat_발표자료](https://github.com/user-attachments/files/21379071/_SlowEat_ver2.0.pdf)
<br>


