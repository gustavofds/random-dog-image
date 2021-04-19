const breedInput = document.getElementById('dog-breed');
const submitBtn = document.getElementById('submit-btn');
const dogImg = document.getElementsByClassName('dog-img');
const breedsUl = document.getElementById('breeds-ul');

const getDogBreeds = async function() {
  try {  
    const req = await fetch(
      `https://dog.ceo/api/breeds/list/all`
    );
    
    const data = await req.json();

    Object.keys(data.message).forEach((dogBreed) => {
      const li = document.createElement('li');
      li.innerText = dogBreed;
      breedsUl.appendChild(li);
    });
    
  } catch (err) {
    console.log(err);
    throw err;
  }
}

const getDogPic = async (dogBreed) => {
  try {  
    const req = await fetch(
      `https://dog.ceo/api/breed/${dogBreed}/images/random`
    );
    
    const data = await req.json();
    console.log(data);

    console.log('Random dog image loaded!');
    return data.message;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

const renderDogImg = function(src) {
  console.log(src);
  dogImg[0].src = src;
  document.getElementById('img-section').classList = "";
}

const submitClick = async function(e) {
  e.preventDefault();
  console.log(breedInput.value);
  const src = await getDogPic(breedInput.value);
  renderDogImg(src);
  breedInput.value = "";
}

window.onload = () => {
  submitBtn.addEventListener('click', submitClick);
  getDogBreeds();
}


