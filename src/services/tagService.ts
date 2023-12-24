import { authAxios, baseAxios } from '@/configs/axiosConfig'
import { Tag } from '@/types/post.type'

const path = 'posts/tags'

interface NewTagProps {
  name: String
  desc?: String
}

const listTagService = async () => {
  return await authAxios.get<Tag[]>(`${path}`)
}

const updateTagService = async (data: Tag) => {
  return await baseAxios.put<Tag>(`${path}/update`, data)
}

const createTagService = async (data: NewTagProps[]) => {
  return await baseAxios.post<Tag[]>(`${path}/create`, data)
}

const deleteTagService = async (tag_id: String) => {
  return await baseAxios.delete(`${path}/delete`, { tag_id })
}

export {}
