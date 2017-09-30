import 'bootstrap/js/dist/dropdown';

function shuffleArray(array) {
    for (let i = array.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [array[i - 1], array[j]] = [array[j], array[i - 1]];
    }
}

function createImage(imageMetadata, sidebar) {
    const sidebarImgContainer = document.createElement('div');
    const sidebarImg = document.createElement('img');

    sidebarImg.src = imageMetadata.path;
    sidebarImgContainer.classList = "sidebar-item";
    sidebarImgContainer.appendChild(sidebarImg);

    sidebar.appendChild(sidebarImgContainer);
}

function addImagesToSidebar(imagesMetadata, sidebar, mainContentHeight) {
  let totalHeight = 0;

  shuffleArray(imagesMetadata);

  let nextIndex = 0;

  while(true) {
    if(nextIndex === (imagesMetadata.length - 1)) {
      nextIndex = 0;
    } else {
      nextIndex++;
    }

    let randomImage = imagesMetadata[nextIndex];

    totalHeight += randomImage.height;

    if(totalHeight > mainContentHeight) {
      break;
    }
    createImage(randomImage, sidebar);
  }
}

function createSidebars(imagesMetadata) {
  const mainContentHeight = document.getElementsByClassName("main-content")[0].offsetHeight;
  const leftSidebar = document.getElementsByClassName('sidebar--left')[0];
  const rightSidebar = document.getElementsByClassName('sidebar--right')[0];

  leftSidebar.style.height = mainContentHeight + "px";
  rightSidebar.style.height = mainContentHeight + "px";

  addImagesToSidebar(imagesMetadata, leftSidebar, mainContentHeight);
  addImagesToSidebar(imagesMetadata, rightSidebar, mainContentHeight);
}

fetch('./assets/data/imageMetadata.json')
  .then(response => response.json())
  .then(createSidebars).catch(err => console.log(err));
