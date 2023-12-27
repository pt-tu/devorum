import { authAxios, baseAxios } from '@/configs/axiosConfig'
import { Tag } from '@/types/post.type'

const path = 'posts/tags'

export interface NewTagProps {
  name: String
  desc?: String
}

const listTagService = async (query: string) => {
  return await authAxios.get<Tag[]>(`${path}?${query}`)
}

const updateTagService = async (data: Tag) => {
  return await baseAxios.put<Tag>(`${path}/update`, data)
}

const createTagService = async (data: NewTagProps[]) => {
  return await baseAxios.post<Tag[]>(`${path}/create`, { tags: data })
}

const deleteTagService = async (tag_id: String) => {
  return await baseAxios.delete(`${path}/delete?_id=${tag_id}`)
}

export { listTagService, updateTagService, createTagService, deleteTagService }
