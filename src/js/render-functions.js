import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import "../css/styles.css";

const gallery = document.querySelector('ul.js-gallery');
const galleryModal = new SimpleLightbox('ul.js-gallery a', {
  className: 'js-lightbox',
  overlayOpacity: 0.8,
  captionsData: 'alt',
  captionDelay: 250,
});

export function renderGallery(mpdata) {
  const markup = mpdata
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<li class="gallery-item">
	<a class="gallery-link" href="${largeImageURL}">
		<img
			class="gallery-image"
			src="${webformatURL}"
			alt="${tags}"
			/>
    <div class="image-stats">
  <p>Likes
${likes}</p>
  <p> Views<br>${views}</p>
  <p>Comments<br>${comments}</P>
  <p>Dowloads<br>${downloads}</P>
</div>
	</a>
</li>`
    )
    .join('');
    gallery.insertAdjacentHTML('beforeend', markup);
    galleryModal.refresh();
  }

export default class loadmoreButtonSwitcher {
    constructor(buttonEL, hiddenClass) {
      this.buttonEL = buttonEL;
      this.hiddenClass = hiddenClass;
    }
  
    hide() {
      this.buttonEL.classList.add(this.hiddenClass);
    }
  
    show() {
      this.buttonEL.classList.remove(this.hiddenClass);
    }
  
    disable() {
      this.buttonEL.disabled = true;
    }
  
    enable() {
      this.buttonEL.disabled = false;
    }
  }

