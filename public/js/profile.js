// Function to handle form submission for creating a new blog post
const newPostHandler = async (event) => {
    event.preventDefault();

    // Collect values from the form fields
    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();

    // Ensure all fields are filled out
    if (title && content) {
        const response = await fetch(`/api/posts`, {
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/profile'); // Redirect to profile page on success
        } else {
            alert('Failed to create post');
        }
    }
};

// Function to handle deletion of a blog post
const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/posts/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/profile'); // Redirect to profile page on success
        } else {
            alert('Failed to delete post');
        }
    }
};

// Add event listeners to forms and buttons
document
    .querySelector('.new-post-form')
    .addEventListener('submit', newPostHandler);

document
    .querySelector('.post-list')
    .addEventListener('click', delButtonHandler);
