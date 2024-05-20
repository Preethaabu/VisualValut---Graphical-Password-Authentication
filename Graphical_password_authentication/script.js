document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');
    const loginForm = document.getElementById('loginForm');

    // Function to handle image selection
    const selectImages = (containerId) => {
        const images = document.querySelectorAll(`#${containerId} img`);

        images.forEach(image => {
            image.addEventListener('click', () => {
                image.classList.toggle('selected');
            });
        });
    };

    // Image selection for signup form
    selectImages('imageContainer');

    // Image selection for login form
    selectImages('loginImageContainer');

    // Signup form submission
    signupForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const selectedImages = Array.from(document.getElementById('imageContainer').querySelectorAll('img.selected')).map(img => img.alt);

        try {
            const response = await fetch('/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, selectedImages }),
            });
            if (response.ok) {
                console.log('Signup successful.');
            } else {
                console.error('Signup failed.');
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    });

    // Login form submission
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const username = document.getElementById('loginUsername').value;
        const selectedImages = Array.from(document.getElementById('loginImageContainer').querySelectorAll('img.selected')).map(img => img.alt);

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, selectedImages }),
            });
            if (response.ok) {
                console.log('Login successful.');
            } else {
                console.error('Login failed.');
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    });
});
