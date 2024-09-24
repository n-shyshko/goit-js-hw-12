import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import {getImages} from "./js/pixabay-api";
import {renderGallery} from "./js/render-functions";
import loadmoreButtonSwitcher from "./js/render-functions";

const refs = {
  ulGallery: document.querySelector('.js-gallery'),
  searchForm: document.querySelector('.js-form'),
  loadMoreBtn: document.querySelector('[data-action="load-more"]'),
  loader: document.querySelector('.loader')
};

  const loadMore = new loadmoreButtonSwitcher(refs.loadMoreBtn, "is-hidden");
  loadMore.hide();
  refs.searchForm.addEventListener("submit", handleSearch)

  const qParams = {
    page: 1,
    perPage: 15,
    maxPages: 0,
    searchText: '',
    orientation: "horizontal",
    safesearch: true
};

async function handleSearch (event) {
  event.preventDefault();
  refs.ulGallery.innerHTML = "";
  qParams.page = 1;
  refs.loader.classList.remove('hidden');
   loadMore.hide();

  qParams.searchText = event.currentTarget.elements.query.value
    .trim()
    .toLowerCase();

  if (qParams.searchText === "") {
    refs.loader.classList.add('hidden');
    iziToast.info({
    message:'The field cannot be empty!',
    position: 'topRight',
    timeout: 2000,
    });
   
    event.currentTarget.reset();
    return;
  }
       
  try {
    const data = await getImages(qParams);
    renderGallery(data.hits);

    if (data.hits.length === 0) {
      iziToast.error({
      message: 'Sorry, there are no images matching your search query. Please try again!',
      position: 'topRight',
      timeout: 2000,
      icon: '',
    });
    return;
  }

  qParams.maxPages = Math.ceil(
    data.totalHits / qParams.perPage
  );

    if (qParams.maxPages > 1) {
      loadMore.show();
      refs.loadMoreBtn.addEventListener('click', loadMoreHandler);

    } else {
        loadMore.hide();
      }

    } catch (error) {
    iziToast.error({
      message: `Request failed with: ${error}`,
      position: 'topRight',
      timeout: 2000,
    });

  } finally {
    event.target.reset();
    refs.loader.classList.add('hidden');
  }  
}
    
async function loadMoreHandler() {
  loadMore.hide();
  refs.loader.classList.remove('hidden');

  try {
    const images = await getImages(qParams);
    renderGallery(images.hits);
    qParams.page += 1;
  
  } catch (error) {
    iziToast.error({
      message: `Request failed with: ${error}`,
      position: 'topRight',
      timeout: 2000,
    });
  
  } finally {
    refs.loader.classList.add('hidden');
    const itemHeight = document
      .querySelector('.js-gallery')
      .getBoundingClientRect().height;

    window.scrollBy({
      top: itemHeight * 2,
      left: 0,
      behavior: 'smooth',
    });

    if (qParams.page === qParams.maxPages) {
      loadMore.hide();
      iziToast.info({
        message: 'We`re sorry, but you`ve reached the end of search results.',
        position: 'topRight',
        timeout: 2000,
        icon: '',
      });
      refs.loadMoreBtn.removeEventListener('click', loadMoreHandler);
    } else {
      loadMore.show();
    }
  }
}