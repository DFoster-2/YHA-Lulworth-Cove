var slideIndex1 = 1;
var slideIndex2 = 1;

function fetchImages(folderPath, galleryId) {
  fetch(folderPath)
    .then(response => response.text())
    .then(data => {
      var gallery = document.getElementById(galleryId);
      var images = data.split('\n').filter(Boolean);
      images.forEach(function(imagePath) {
        var img = document.createElement('img');
        img.src = imagePath;
        gallery.appendChild(img);
      });
      showDivs(slideIndex1, 'slideshow1', 'controls1');
      showDivs(slideIndex2, 'slideshow2', 'controls2');
    })
    .catch(error => {
      console.error('Failed to fetch images:', error);
    });
}

fetchImages('/images1.txt', 'imageGallery1');
fetchImages('/images2.txt', 'imageGallery2');

function showDivs(n, slideshowId, controlsId) {
  var x = document.querySelectorAll("#" + slideshowId + " .gallery img");
  if (!x || x.length === 0) {
    console.error("No slides found for " + slideshowId);
    return;
  }

  var dots = document.querySelectorAll("#" + slideshowId + " .slide-indicators .indicator");
  var controls = document.getElementById(controlsId);

  if (n > x.length) {
    n = x.length;
    controls.querySelector(".control-btn:last-child").style.display = "none";
  } else if (n < 1) {
    n = 1;
    controls.querySelector(".control-btn:first-child").style.display = "none";
  } else {
    controls.querySelector(".control-btn:first-child").style.display = "block";
    controls.querySelector(".control-btn:last-child").style.display = "block";
  }

  x.forEach((img, index) => {
    img.style.display = (index === n - 1) ? "block" : "none";
  });

  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === n - 1);
  });
}

function plusDivs(n, slideshowId, controlsId) {
  var slideIndex = slideshowId === 'slideshow1' ? slideIndex1 : slideIndex2;
  slideIndex += n;

  if (slideIndex < 1) {
    slideIndex = 1;
  } else if (slideIndex > document.querySelectorAll("#" + slideshowId + " .gallery img").length) {
    slideIndex = document.querySelectorAll("#" + slideshowId + " .gallery img").length;
  }

  showDivs(slideIndex, slideshowId, controlsId);

  if (slideshowId === 'slideshow1') {
    slideIndex1 = slideIndex;
  } else {
    slideIndex2 = slideIndex;
  }
}

document.querySelectorAll('.gallery-container').forEach(function(container, index) {
  var slideIndicatorsContainer = container.querySelector(".slide-indicators");
  var slides = container.querySelectorAll(".gallery img");

  if (!slides || slides.length === 0) {
    console.error("No slides found in " + container.id);
    return;
  }

  for (var i = 0; i < slides.length; i++) {
    var indicator = document.createElement("span");
    indicator.classList.add("indicator");
    if (i === 0) {
      indicator.classList.add("active");
    }
    indicator.setAttribute("onclick", "showDivs(" + (i + 1) + ", '" + container.id + "', 'controls" + (index + 1) + "')");
    slideIndicatorsContainer.appendChild(indicator);
  }


  if (container.id === 'slideshow1') {
    slideIndex1 = 1;
    showDivs(slideIndex1, container.id, 'controls' + (index + 1));
  } else {
    slideIndex2 = 1;
    showDivs(slideIndex2, container.id, 'controls' + (index + 1));
  }
});
