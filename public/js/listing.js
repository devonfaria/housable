const listingFormHandler = async (event) => {
  event.preventDefault();

  const title = document.getElementById('title').value.trim();
  const description = document.getElementById('description').value.trim();
  const plants = document.getElementById('plants').value.trim();
  const pets = document.getElementById('pets').value.trim();
  const contact = document.getElementById('contact').value.trim();
  const fileUrl = document.getElementById('file-url').value.trim();
  const circleUrl = document.getElementById('circle-url').value.trim();
  const userId = document.getElementById('user-id').value.trim();

  if (title && description && contact && userId) {
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
