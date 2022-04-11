const imageUploadEl = document.querySelector('#image');
let fileUrl;
let circleUrl;

const listingFormHandler = async (event) => {
  event.preventDefault();
  const title = document.getElementById('title').value.trim();
  const description = document.getElementById('description').value.trim();
  const plants = document.getElementById('plants').value.trim();
  const pets = document.getElementById('pets').value.trim();
  const contact = document.getElementById('contact').value.trim();

  if (title && description && contact) {
    const newListing = { title, description, plants, pets, contact, fileUrl, circleUrl };
    console.log(newListing);
    const response = await fetch('/api/listings/addlisting', {
      method: 'POST',
      body: JSON.stringify({ title, description, plants, pets, contact, fileUrl, circleUrl }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      alert('Listing added successfuly!');
      document.location.replace('/listings');
    } else {
      alert('Failed to add listing.');
    }
  }
};

document.querySelector('.listing-form').addEventListener('submit', listingFormHandler);

imageUploadEl.addEventListener('change', async (event) => {
  const file = event.target.files[0];
  const formData = new FormData();
  const config = {
    withCredentials: true
  };
  formData.append("file", file);
  const { data } = await axios.post('/api/listings/upload', formData, config);
  console.log('Data: ', data);
  fileUrl = `https://res.cloudinary.com/dfamiaufc/image/upload/${data.photoUrl}`;
  circleUrl = `https://res.cloudinary.com/dfamiaufc/image/upload/ar_1:1,b_rgb:ffffff,bo_1px_solid_rgb:ffffff,c_fill,g_auto,r_max,w_300/${data.photoUrl}`;
  console.log(fileUrl, circleUrl);
});


