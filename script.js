window.onload = () => {
  
  const image = document.querySelector('.image');
  
  // input
  const blur = document.querySelector('#blur');
  const contrast = document.querySelector('#contrast');
  const hue = document.querySelector('#hue');
  const sepia = document.querySelector('#sepia');
  const opacity = document.querySelector('#opacity');
  const grayscale = document.querySelector('#grayscale');
  const saturate = document.querySelector('#saturate');
  const rotateX = document.querySelector('#rotate_x');
  const rotateY = document.querySelector('#rotate_y');
  const borderRadius = document.querySelector('#border_radius');
  const size = document.querySelector('#size');
  function resetInputToDefault() {
    blur.value = '0';
    contrast.value = '100';
    hue.value = '0';
    sepia.value = '0';
  }
  
  function uploadImage() {
    const button = document.querySelector('#input-file');
    button.addEventListener('change', function() {
      const reader = new FileReader();
      reader.readAsDataURL(this.files[0])
      const btnBox = document.querySelector(".button-box")
      const boxBody = document.querySelector(".box-body")
      boxBody.style.display="block"
      const dlBtn = document.createElement("label");
      const btnBoxNodes = btnBox.childNodes;
      btnBox.replaceChild(dlBtn, btnBoxNodes[3])
      dlBtn.textContent = "download"
      dlBtn.classList.add("button")
      dlBtn.setAttribute("onclick", "download()")
      reader.onload = function() {
        image.setAttribute('src', this.result);
        addFilterToImage();
      }
    });
  }
  
  uploadImage();
  
  function addFilterToImage() {
    const inputRange = document.querySelectorAll('.input-range');
    inputRange.forEach(input => {
      input.addEventListener('input', () => {
        let v = input.value
        input.parentElement.querySelector("span").textContent = ` : ${v}`
        image.style.filter = `
        blur(${blur.value / 100}px) 
        contrast(${contrast.value}%) 
        hue-rotate(${hue.value}deg) 
        sepia(${sepia.value}%) 
        saturate(${saturate.value}%) 
        opacity(${opacity.value}%) 
        grayscale(${grayscale.value}%) 
        `;
        image.style.transform=`
        rotateX(${rotate_x.value}deg) 
        rotateY(${rotate_y.value}deg)
        `
        image.style.borderRadius=`${borderRadius.value}px`
        image.style.width=`${size.value}%`
      });
    });
  }
  
}

function download(){
  domtoimage.toBlob(document.querySelector(".image")).then(function (blob) {
      saveAs(blob,"image")
      location.reload()
    });
}

var inputRange = document.querySelectorAll('.input-range');
inputRange.forEach(input => {
  let v = input.value
  input.parentElement.querySelector("span").textContent = ` : ${v}`
})