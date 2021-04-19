const breedInput = document.getElementById('dog-breed');
const submitBtn = document.getElementById('submit-btn');
const dogImg = document.getElementsByClassName('dog-img');
const breedsUl = document.getElementById('breeds-ul');
const errorSection = document.getElementById('error-msg');

const fetchErrorMsg = () => {
  errorSection.classList.toggle('hidden');
}

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

    if (req.status === 404) throw new Error('Error');
    errorSection.classList = "hidden"; 
    
    const data = await req.json();
    console.log(data);

    console.log('Random dog image loaded!');
    return data.message;
  } catch (err) {
    console.log(err);
    fetchErrorMsg();
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
  const dogBreed = breedInput.value.trim().toLowerCase();
  const src = await getDogPic(dogBreed);
  renderDogImg(src);
  breedInput.value = "";
}

window.onload = () => {
  submitBtn.addEventListener('click', submitClick);
  getDogBreeds();
}


