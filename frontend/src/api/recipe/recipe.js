// src/api/subscriptionApi.js
import axiosInstance from '../axiosInstance';


// [HOME 탭] - 전체 불러오기(최신순)
export const getAllPosts = async () =>{
   const res = axiosInstance.get('api/recipes/all');
   return (await res).data.data;
}

