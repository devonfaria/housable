const imageUploadEl = document.querySelector('#image');
let fileUrl;

const listingFormHandler = async (event) => {
  event.preventDefault();
  console.log('Creating form');
  const title = document.getElementById('title').value.trim();
  const description = document.getElementById('description').value.trim();
  const plants = document.getElementById('plants').value.trim();
  const pets = document.getElementById('pets').value.trim();
  const contact = document.getElementById('contact').value.trim();
  const circleUrl = document.getElementById('circle-url').value.trim();
  const userId = document.getElementById('user-id').value.trim();


  if (title && description && contact && userId) {
    const newListing = { title, description, plants, pets, contact, fileUrl, circleUrl, userId };
    console.log(newListing);
    const response = await fetch('/api/listings/addlisting', {
      method: 'POST',
      body: JSON.stringify({ title, description, plants, pets, contact, fileUrl, circleUrl, userId }),
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
  fileUrl = data.photoUrl;
});
