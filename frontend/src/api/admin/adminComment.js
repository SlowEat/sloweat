import axiosInstance from "../axiosInstance";

// 댓글 목록 조회
export const fetchAdminComments = async ({
  content,
  author,
  status,
  page = 0,
  size = 10,
}) => {
  const response = await axiosInstance.get(`api/admin/comments`, {
    params: { content, author, status, page, size },
  });
  return response.data;
};

// 댓글 삭제
export const deleteAdminComment = async (commentId) => {
  await axiosInstance.delete(`api/admin/comments/${commentId}`);
};

// 댓글 반려
export const rejectAdminComment = async (commentId) => {
  await axiosInstance.post(`api/admin/comments/${commentId}/reject`);
};
