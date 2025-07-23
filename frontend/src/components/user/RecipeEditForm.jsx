import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import "../../styles/user/RecipeForm.css";
import "../../styles/user/Filter.css";

const RecipeEditForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    photo: null,
    duration: "",
    isPremium: false,
    tags: {
      situation: "",
      type: "",
      ingredient: "",
      method: "",
    },
  });

  const [tagOptions, setTagOptions] = useState({
    TYPE: [],
    SITUATION: [],
    INGREDIENT: [],
    METHOD: [],
  });

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await axiosInstance.get("api/recipe/tags");
        setTagOptions(res.data.data);
      } catch (err) {
        console.error("태그 불러오기 실패:", err);
        alert("태그를 불러오는 중 오류가 발생했습니다.");
      }
    };

    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/api/recipes/${id}`);
        const recipe = response.data.data;

        setFormData({
          title: recipe.title,
          content: recipe.content,
          duration: recipe.cookingTime.toString(),
          isPremium: recipe.subscribed,
          photo: null,
          tags: {
            type: recipe.type || "",
            situation: recipe.situation || "",
            ingredient: recipe.ingredient || "",
            method: recipe.method || "",
          },
        });
      } catch (error) {
        console.error("레시피 불러오기 실패:", error);
        alert("레시피 정보를 불러오지 못했습니다.");
      }
    };

    fetchTags(); // 태그 먼저 로드
    fetchData(); // 레시피 정보 로드
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFormData({ ...formData, photo: e.target.files });
    }
  };

  const handleTagChange = (e, tagCategory) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      tags: {
        ...prev.tags,
        [tagCategory]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { type, situation, ingredient, method } = formData.tags;

    if (!type || !situation || !ingredient || !method) {
      alert("태그를 모두 선택해주세요!");
      return;
    }

    const requestData = {
      title: formData.title,
      content: formData.content,
      cookingTime: parseInt(formData.duration),
      isSubscribed: formData.isPremium,
      type,
      situation,
      ingredient,
      method,
    };

    try {
      await axiosInstance.put(`/api/recipes/${id}`, requestData);
      alert("수정이 완료되었습니다!");
      navigate(`/postdetail/${id}`, {
        replace: true,
        state: location.state,
      });
    } catch (error) {
      console.error("수정 실패:", error);
      alert("게시글 수정 중 오류가 발생했습니다.");
    }
  };

  return (
    <main className="recipe-form-container">
      <form onSubmit={handleSubmit} className="recipe-form">
        <div className="recipe-form-group">
          <label>제목 *</label>
          <input
            type="text"
            name="title"
            required
            value={formData.title}
            onChange={handleInputChange}
          />
        </div>

        <div className="recipe-form-group">
          <label>내용 *</label>
          <textarea
            name="content"
            required
            rows={8}
            value={formData.content}
            onChange={handleInputChange}
            className="recipe-textarea"
          ></textarea>
        </div>

        <div className="recipe-form-group">
          <label>태그</label>
          <div className="filter-group">
            <div className="filter-group">
              {/* 동적 렌더링으로 변경 */}
              <select
                className="select-box filter-select"
                value={formData.tags.type}
                onChange={(e) => handleTagChange(e, "type")}
              >
                <option value="">종류</option>
                {tagOptions.TYPE.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>

              <select
                className="select-box filter-select"
                value={formData.tags.situation}
                onChange={(e) => handleTagChange(e, "situation")}
              >
                <option value="">상황</option>
                {tagOptions.SITUATION.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>

              <select
                className="select-box filter-select"
                value={formData.tags.ingredient}
                onChange={(e) => handleTagChange(e, "ingredient")}
              >
                <option value="">재료</option>
                {tagOptions.INGREDIENT.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>

              <select
                className="select-box filter-select"
                value={formData.tags.method}
                onChange={(e) => handleTagChange(e, "method")}
              >
                <option value="">방법</option>
                {tagOptions.METHOD.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="recipe-form-group">
          <label>소요 시간 (분)</label>
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleInputChange}
          />
        </div>

        <div className="recipe-checkbox-row">
          <input
            type="checkbox"
            name="isPremium"
            id="isPremium"
            checked={formData.isPremium}
            onChange={handleInputChange}
          />
          <label htmlFor="isPremium">프리미엄 전용</label>
        </div>

        <button type="submit" className="recipe-submit-btn">
          수정하기
        </button>
      </form>
    </main>
  );
};

export default RecipeEditForm;
