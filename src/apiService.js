const BASE_URL = 'https://pixabay.com/api/';
const KEY = '22399279-48a424365ce07e64d37e0f0c3';

function searchImages(shearchQuery, page = 1) {
  const url = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${shearchQuery}&page=${page}&per_page=12&key=${KEY}`;
  return fetch(url)
    .then(res => res.json())
    .catch(err => console.log(err));
}

export { searchImages };
