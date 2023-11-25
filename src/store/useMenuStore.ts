import { createWithEqualityFn } from 'zustand/traditional'
import { shallow } from 'zustand/shallow'
import { immer } from 'zustand/middleware/immer'
import { ReactNode } from 'react'
import { persist } from 'zustand/middleware'

function getItem(
  id: string,
  title?: ReactNode,
  subTitle?: ReactNode,
  icon?: ReactNode,
  children?: NavItemProps[],
  expand: boolean = true,
  iconExpand: boolean = true,
): NavItemProps {
  return {
    id,
    title,
    subTitle,
    icon,
    children,
    path: '/',
    expand,
    iconExpand,
  } as NavItemProps
}
function getUser(id: string, title?: ReactNode, icon?: ReactNode): NavItemProps {
  return {
    id,
    title,
    icon,
    path: '/',
    iconExpand: false,
  } as NavItemProps
}

const defaulf = getItem('defaulf', null, null, null, [
  getItem('defaulf0', 'Home', 'Find the latest update'),
  getItem('defaulf1', 'Popular', 'Shots featured today by curators'),
  getItem('defaulf2', 'Following', 'Explore from your favorite person'),
])
const communities = getItem('grp1', 'Communities', null, null, [
  getItem('4', '#javascript', '82,645 Posted by this tag'),
  getItem('5', '#design', '51,354 • Trending in Bangladesh'),
  getItem('6', '#tutorial', '51,354 • Trending in Bangladesh'),
])
const tags = getItem(
  'grp2',
  'Popular Tags',
  null,
  null,
  [
    getItem('7', '#javascript', '82,645 Posted by this tag'),
    getItem('8', '#design', '51,354 • Trending in Bangladesh'),
    getItem('9', '#tutorial', '51,354 • Trending in Bangladesh'),
    getItem('10', '#javascript', '82,645 Posted by this tag'),
    getItem('11', '#design', '51,354 • Trending in Bangladesh'),
    getItem('12', '#tutorial', '51,354 • Trending in Bangladesh'),
    getItem('13', '#javascript', '82,645 Posted by this tag'),
    getItem('14', '#design', '51,354 • Trending in Bangladesh'),
    getItem('15', '#tutorial', '51,354 • Trending in Bangladesh'),
  ],
  false,
)

const SAMPLE_RIGHT = [
  getItem(
    'right',
    'Recent users',
    null,
    null,
    [
      getUser('1', 'Adam', 'https://i.pinimg.com/736x/5f/41/7d/5f417d36c3bf96c163ce0e75dcf506a9.jpg'),
      getUser(
        '2',
        'Eva',
        'data:image/jpeg;base64,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',
      ),
      getUser('3', 'Jack', 'https://i.pinimg.com/originals/77/dd/eb/77ddeb4a58b84158e1e883bde8df6f38.jpg'),
      getUser('4', 'Naruto', 'https://i.pinimg.com/originals/1c/9a/36/1c9a363ef685b8b3531fd42ce95cfe6f.jpg'),
      getUser('5', 'Sak', 'https://i.pinimg.com/564x/df/1a/af/df1aaf42142a28b911993720a6c82e65.jpg'),
      getUser('6', 'Adam', 'https://i.pinimg.com/736x/5f/41/7d/5f417d36c3bf96c163ce0e75dcf506a9.jpg'),
      getUser(
        '7',
        'Eva',
        'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTExMVFhUXFxcVFxUVFRUVFRUVFRUXFxUVFRUYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OFRAPFSsdFRkrKysrKystLS0rLSsrLS0rNS0tKystLSstLTctLSstNzctLS0tKzQrLSs3LSs3KysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAEAAECAwUGBwj/xAA+EAACAQIDBgMGAggFBQAAAAAAAQIDEQQhMQUSQVFhcROBkQYiobHB8DLRBxQjQlKSouEVJGKy8WNyo8Li/8QAGAEBAQEBAQAAAAAAAAAAAAAAAAECAwT/xAAeEQEBAQEBAAMAAwAAAAAAAAAAARECMQMSIQQyQf/aAAwDAQACEQMRAD8A5Z9BWJWEed6VuFxFsnoHxqcTHkGYetlYD0L9Hs70qq5TT/mj/wDJ1kTiP0cVM60f+x/GS+p28TnfW54hUT3W1rZ/IxsHtiNRJT92S15Pqnw7G/JnH7XwUYuM6UluTe70jLl2+QdvjnPUsvrpKJc2UUpFwcU1nlweXqeMVYbrceTa9Mj2RM8k25DdxFZcqk/TebRrljpPA/hNCmZ2CeSD6bNJBMZE8OUpluHZFGXCqLyAbhUJZEZXUHr3NDZ373kZuHeRoYF5PuWJWxgM6kO6NtzMPZT/AGi6Jv4M1JTyOk8Y/wBWxkVV6mRBTKq1TIK2qWi7L5AE5XnbqHp2XkYuFq3qX5XZrpmNeTfNegNVlL+L+lDVKoPUqjUS3pfxf0xECeMIK8IaGHIM5O5SIwdmK4yYHb/o2r/t6i50/lKP5noSZ5b+jup/m7J605/R/Q9Ri8jHTU8XRZxG18HOFSUbO0pNxtpK7yt1zsdojldvbQlvzpNfhkpQlo4+6nbrqSPR/H3bI28NdfULWgDhqu9GL/ijGXqrh0EHC+mkzy32uhbF1eri/wCaEW/i2eoVGeb+3cbYm/OnF+l4/Q1GOgOCfuoNiA4P8K7BiZpF28W0GCuRfRYUbvBKlkAKQXfIlSiKDyD8LLIzaTDqMshGa2dkz95v/T8zVlUVjD2bLV9gqpVNxkVOqUVKlwaVUh4gHV7QqbtOT6fPIw9lTV5N25ZlWI2g5U2m+KAoVLRNWpI3quKjzh6oEqY2P8UPVHP4ioA1JDTHQfrMf4o+q/MRze8ONPq87ZBj3Is5uyLZFkpFUmB0XsDUtjqfVTX9Ej1uJ437G1LY2g/9dvVNfU9kvxM9RqLEY22sLQnNKUt2pa+TScovJXvk3l3NeLOZ9ptnzqVrwV/2cW1dcJSWV+6MO3wzevca+4lZLRJJdkrIJozAMDTao001ZqKTT1VkFRYcr7V1bXujz/8ASBD9pSlzhJfyyv8A+x3lZnEfpCj7tF9ai/2P6Gp6zfGHhX7q7BSYJhn7q7F6Z0ZTmwikwNvNBUGRRMXmFt5AMHmFXJQVSYXCWQFTYRCQZa2BqWHqVwShMpqSNRka6pGVUF3yNWfusqCHWyI1K/ADp1NDMnK7b5u5NWRrVKgPUmBbw28TV+oq4ga/UQ2r9XEEWh7jMNIyINFjRFlgO9nZWxVB/wDVh/uR7S2eH7Pnu1acuU4v0kj3CS/sY7WJx0MT2kx06U6Uo2d4zi09HnB8PI2aUsjJ2jiqaqyp1mnCUIyjvLJSTlfPhfLPoYdvh/t5onA1XUpxm1beWmuja+hfYWA8LcSptOOdkpX6vPz+JbKIY69qqo8kcf7fR/YwfKpb1hL8jr6iOW9uI/5a/KpB/CS+pZ6xfHK0NF2Lt4ooaLsWnRmGk80GU2At5oNpvJhVtF5hiYHh9Qm4BVNl0ZA9PQsQYo2lUKpTKoT1IORdQTvka0vdZUpDVZZMaIynaL7AVy7ESyB0zKxO4zYzY1ytQ+8IjcQVxzGFcdRArbEWeGLw2BGErZnu8Jb0IyXFJ+qPC/DfI9i9msVvUYRvmowXnuoz0saEHqZHtBsh1kpQaUop5PRp52vwf5mxNWk+ple0OIlCjvQk4tSjmuuXmjFd/hvU7n19Z2ytnVYeG3D8NW7tKOUZJJvXT3UdVNZHE4PblZQlJyTs4axjo21LTyO03g3/ACOepZ9lFQ5r2wp3wtXo4P8A8kV9TpqqMjbWClVpVKcU25Rsu6aa+RZ681efU1ki+NGTV7dfv1On2f7F1FnWlGEe93a3I6rA7Iw1NL3d5W1l9/djtjluPK/Ck5JGtHAz3Ut18W/K/wCZ6G9mYeUlJUY3Xf5ffAIkorSKXZcORcPs8+p7JqJP3X6ff2iX6jNWy1v8DvZVXYqnFPVImH2cbDDtZWz+2QkrHaQwqu3urUeeApP8VJd0TDXE3yItnXYn2cpyX7OTi+F8158TmcfgZ0pbsln5DEUJjTkV3GlIi4qxM80ipSK6sveYrkFikNchvDbwVZvCKt8QXXM7omxNkWVVlK7YVGBDC6Fqpt6APFJcDp/Zna3hVkpq8JRSduGSs/JnKzVg+jkB7D4cakU08gfF4VRi3ZyS1Vk7rs9TjvZ/a7g0r5Hc4LHRmupjG5cYlLCUVeLpwtle0Y2ktYvrwZqqcLEMRh4J6+XJXvZdNQLE42MckTF661o1ZRtdsBq4+K/C7GJjNot8TLq4t8zcYrbxm0rPUFltkxatZsGqNl/Wa7LDbbVh1tpXzZxcakuRhbf286d4xeej78jUZel1/aKnH95ebFT28paP0PDtm1K+JqK0JVLytZNpdrrTLj6npmxdgLD5ylJvk5XUfzf2i3T8dlRx0nmaWGx3M57DVsrXD6XRhl0Mc80wbaWDjVjZpbyyTejXJtFGFrWClWT1A4DG4Zwk07X6ZrpZgcmd5tLYcar3ouz5PTuc9jdgzg7vPsZsXXLuPvMshTudHQ2BKUr2tx+/U18HsSENVdjF1xkMHJ8Ptl8dkzekXY76GEXJehfDDpcC4mvPP8Dq/wALHPQ/BEMNeBNCSJ2HUTLonh2bOHp5XsY+Hj7y7nTU6T3UiUYOIWYfVjZj4zASve11x+pfPDt3uuJFUYapaSs/mbtPaUo6PMwoYSSknZtXzsFzdkFdHS2y52cspWt3to/iB7XxD3XKObWaXPoc5Wxjg4O+Tl80zWjV3kXE1zFH2shN2d1waeqfJrVG5haimlJO6Zy3tH7OTnU36ds9U8s/4k+B0uwsFKhRjGTvLNvpfoayM7WzgcNHetJ90bcNmUtM/gcJW24oy91Nu+r0ZoYX2yST32k49cuz6li3i+ug2jshuLUH35pHGw9g6TqKVWrNq7bhkt7vLVI6rBbdnNbyi0nzTWXZg2MxDk7oOY7BUaNGChSpRhFcIr5vVjznF6mTHEvQnFt/f3YDQiktAyliDJhLqviT8bz++g1HR4WuT8azMDD4sLpV7gdTg64XKmp5MwMJXaNbCYjmUWSw1tCFgnxUxSimXE1XGJZGKKJSaLadYirfCQhvHQhg+e7DpEoonYw6mpZNPk7nX7PxNOaVnbmnqcmkSUnHNMYO8hTjboO8PG33wyOWwO2HkpM2MPtK6avo7+q0+BlrU8RFR0MfFSuHYvFJoy5SIlZG2X7q739DW2XjFKMXzSMnbDBvZ/EWbp9bq7Wj1+NzfLNdm6ytla/xM7aEZyi92ST52uiyLt1fTTzGqvmaxNcdOFSm2qklLNNNKy43+hobC2ZTjJ1nFNuW8t7NR6paXLtsRUotWRZga2Stp95GsbvdsdRTx0bZq/ZFcpwbvaX59gGhiFyCVUlwsTHJdTpQ0tL4u3cudHo7dyqhUmnmaEbSVmvT8iDPm7aNebKZSfNeq/MsxDs7fPJf1XRUoL95NdVp9b+RlRWFi3r6/epp4dW59zPw8OUk1y0b8n9A2nUNRGlSqI1MLUyuYuFg3m8l63NWm1YsStKnUCIVDLg7l9KVjbOCqlVFCxCTHmwecl0M1oR+tIQF4z5CIPIHAfdLGRuZx1RSHY4xRCS5FlOs438iLEZFyxTZPxAFxHU7EwU7Td7GRh57laEne1912zefTuaWMndmZXTWaya4muUsdpQkrZfEjXq2M7Zm0N6Cu8wTbWJbW7DV8eR0YB7bxPiJwi3msms96zSsCbMwtWlmp+TzXYM2Vs9xgk8rXt0vmw/9XWg1uUqO0bfjjbqjXwWIUlk7ozIYVEqWDcW3G652JqXHRU5pass/XFwz6r6GJRw74tsNhCyt8eRLWcHRxN8t6/SX0vr6l0VySfNaP4ZPtYxtO5OOK3fy/vwM6uNhRjlqn6+i0fkHYajleTuuC/v9GZGDr72b0/qy4vhJLt6GrSrXV7+f5rh3KjTUtOC4DqpmBeLzy/IJpQv2LqDKFXM0acgCnRSdwykaF7mgOtJBqiVVqF1/YAG/QYs/w7v6CIPKLjNlSmPcxrqmxiLYiB2xJjNlU6wE7orlVRU58itsCVSafDzAKyDpoEqFgnsuSu4t9Ua9PDq5z1NNTTXM6PCVTcc6KVDIi6ARCRba5KaGp07BcYIZRJJkWk420KKlS5OrU6gtSelxSLbcSNOCm7cFr16XKa0r2US/DR3e/EmDTjJK1sraF9OrndefJmaqpdTqkGzh6m95cPyCo1uX33MinVs8g5Vl+Lyfc1KjVhWCqNaxk0anIvjPjfMuo3aeIuEt30MTD1PtGnQr5GhfmIbxkIDxDeHuREzk6lcVxmRbAacijVlkmVICchlEm0MgIVGCzCKrBajArhL3jZwZgOXvZM2cLVdtPibYrXpzL41TPpt6v4FqqkQb4xGVUFVZDSxKQBF+ZTXqLRA8qzZOkgL6SsWKRTBFu6Fh2+RONUZRehRXlmlwMq0aVa+fAJwlT3s3k8n56GZTk7BdN6ArZp1bZafmXQqNgLlo+LS/5C6D4tpfMsrI2k2uJo4OquJkwd3kn5hNKdnqaiNzxOwjN/Weo5oeTDkmiLOTqaTID3GuBCaIbpbIiwHGkydiuoAPUkDVCybKamgAWIlnc1Nn4jJXMmpKzXc28LTTSNsX0dGrkPZsVOBJZEQnSGUeYUlcdUgYHUblkLoIjAeVNcgYWHvYIUX5FcLLLMucrAQkuRDwrO7XmEEGjKlBFsKmhToPBPoFH+Je3RL/AJCaM/MzZSzsvu2QVQlbL7+8gjXjd6uxdTgu4BSqWCKU7GogzwOginflzXqxwPOZMhKQ9RlZl0OPYSQ7AiQZYyLAS0Ka7LpPIGrADsoqMurOzBqjABxDzN3ZdVOKObxUzU2BVysdM/HLf101JF0oFFBhaRlSpwaL6cLldPLmXwu+AVGSsRlLzCFQIyp9CIoSRN9x1HqLcIqGfkWwK3HoTjkBO4yixox5kt63ECyGSt8RKvZ+gPVnJ2sidGn5viFatKeV+LCYR0+7GdQqWC6da4ZHbvYQLvCA4iyFuHOwxVWP71+6uF0dsP8Aej5rP4G7y1OmvujNA9HaMJfvLzy+YSpJmcaQaIssZFkFdTQpZfPRlAAuIeZnYyuoq3HkF4mpnZa/IHjs9PN39TfMY6rKUWzT2S7Ms/w9dSVHDbjvmbrDoMNI0aUjFwlZM06MjDTQgWRYNCRapEF2ozuQjIdsBxOJHeQnMlVVVqWFGdyUgZysyKJbTHWRWr62H32DE73JKZVCPUfjkBbTkExr8ACcrE6E7q4MaHi9xA/iCBjz1lchCO1YU1dPI0tkaDiM1uNZEWIRitG59mDMQiDNjq+4YhCOs8c76dkZiEENhfxG1hxCM1RsS2HAQiC+BRVEIBpEkIRKqurqVcRCIsS4skhCDS2JbS4iEGVcdPIrgIRKooQhER//2Q==',
      ),
      getUser('8', 'Jack', 'https://i.pinimg.com/originals/77/dd/eb/77ddeb4a58b84158e1e883bde8df6f38.jpg'),
      getUser('9', 'Naruto', 'https://i.pinimg.com/originals/1c/9a/36/1c9a363ef685b8b3531fd42ce95cfe6f.jpg'),
      getUser('10', 'Sak', 'https://i.pinimg.com/564x/df/1a/af/df1aaf42142a28b911993720a6c82e65.jpg'),
      getUser('11', 'Adam', 'https://i.pinimg.com/736x/5f/41/7d/5f417d36c3bf96c163ce0e75dcf506a9.jpg'),
      getUser(
        '12',
        'Eva',
        'data:image/jpeg;base64,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',
      ),
      getUser('13', 'Jack', 'https://i.pinimg.com/originals/77/dd/eb/77ddeb4a58b84158e1e883bde8df6f38.jpg'),
      getUser('14', 'Naruto', 'https://i.pinimg.com/originals/1c/9a/36/1c9a363ef685b8b3531fd42ce95cfe6f.jpg'),
      getUser('15', 'Sak', 'https://i.pinimg.com/564x/df/1a/af/df1aaf42142a28b911993720a6c82e65.jpg'),
    ],
    true,
    false,
  ),
]

export const useMenuStore = createWithEqualityFn<MenuState & MenuActions>()(
  immer(
    persist(
      (set) => ({
        items: [defaulf, communities, tags],
        users: SAMPLE_RIGHT,
        isSelected: 'default0',
        toggleExpand: (id) =>
          set((state) => ({
            items: state.items.map((item) =>
              item.id === id && item.iconExpand ? { ...item, expand: !item.expand } : item,
            ),
          })),
        setIsSelected: (id) => set((state) => {
          state.isSelected = id
        }),
      }),
      {
        name: 'menu-store',
      },
    ),
  ),
  shallow,
)

export type NavItemProps = {
  id: string
  title: ReactNode
  subTitle?: ReactNode
  icon?: ReactNode
  children?: NavItemProps[]
  path: string
  expand: boolean
  iconExpand: boolean
}
interface MenuState {
  items: NavItemProps[]
  users: NavItemProps[]
  isSelected: string
}
interface MenuActions {
  toggleExpand: (id: string) => void
  setIsSelected: (id: string) => void
}
