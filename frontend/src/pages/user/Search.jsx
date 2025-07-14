import '../../layouts/user/MainLayout.css';
import NoMatch from "../../components/user/NoMatch";
import Recipe from "../../components/user/RecipeCard";
import SearchBar from '../../components/user/SearchBar';
import Filter from '../../components/user/Filter';

export default function Search() {

  return (
    <div className="main-layout-content">
      {/* Header */}
      <div className="search-header">
        <h1 className="tap-title">검색</h1>
        <SearchBar></SearchBar>
        <Filter></Filter>
      </div>
    
    {/* 검색 결과 */}
      <div>
        <Recipe></Recipe>
      </div>

    {/* 검색 전 */}
      <div>
        <NoMatch
          title="레시피를 검색해보세요 😀" 
          description="키워드나 태그를 입력하여 원하는 레시피를 찾아보세요" ></NoMatch> 
      </div>

     {/* 검색 후 */}
      <div>
        <NoMatch
          title="일치하는 레시피가 없습니다 😥" 
          description="직접 게시물을 등록해보세요!" ></NoMatch> 
      </div>
      
    </div>
  );
}
