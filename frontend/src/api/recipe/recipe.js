// src/api/subscriptionApi.js
import axiosInstance from '../axiosInstance';


// 전체 게시글 (페이지네이션 적용)
export const getAllPosts = async (page) => {
  const res = await axiosInstance.get(`api/recipes/all?page=${page}&size=10`);
  return res.data.data; // 페이징 정보(content, last 등)를 담고 있는 data 객체 반환
};

// 팔로잉 게시글 (페이지네이션 적용)
export const getFollowingPosts = async (page) => {
  const res = await axiosInstance.get(`api/recipes/following?page=${page}&size=10`);
  return res.data.data; // 페이징 정보(content, last 등)를 담고 있는 data 객체 반환
};
