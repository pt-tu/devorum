import { baseAxios } from '@/configs/axiosConfig'
import { Comment } from '@/types/comment.type'

const path = 'posts/comments'

export const createCommentService = (data: Partial<Comment>) => baseAxios.post<Comment>(`${path}/`, data)
export const listCommentsService = (postId: string) => baseAxios.get<Comment[]>(`${path}/${postId}`)
export const updateCommentService = (id: string, data: Partial<Comment>) => baseAxios.put(`${path}/${id}`, data)
export const deleteCommentService = (id: string) => baseAxios.delete(`${path}/${id}`)
export const toggleVoteCommentService = (id: string) => baseAxios.put(`${path}/${id}/vote`)
