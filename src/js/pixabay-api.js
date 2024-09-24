import axios from 'axios';

export async function getImages({searchText, page, perPage }) {
  const response = (
    await axios.get(`https://pixabay.com/api/`, {
      params: {
        key: '45306533-f7c4428500ee3898e492b2a2f',
        page: page,
        per_page: perPage,
        q: searchText,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    })
  ).data;
  return response;
 
}
