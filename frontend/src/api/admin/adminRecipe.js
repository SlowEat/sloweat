import axiosInstance from "../axiosInstance";

// 레시피 목록 조회
export const fetchAdminRecipes = async ({
  title,
  author,
  status,
  page = 0,
  size = 10,
}) => {
  const response = await axiosInstance.get(`api/admin/recipes`, {
    params: { title, author, status, page, size },
  });
  return response.data;
};

// 레시피 삭제
export const deleteAdminRecipe = async (recipeId) => {
  await axiosInstance.delete(`api/admin/recipes/${recipeId}`);
};

// 레시피 반려
export const rejectAdminRecipe = async (recipeId) => {
  await axiosInstance.post(`api/admin/recipes/${recipeId}/reject`);
};
