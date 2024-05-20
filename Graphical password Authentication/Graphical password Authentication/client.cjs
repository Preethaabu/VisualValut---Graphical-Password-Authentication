document.addEventListener('DOMContentLoaded', () => {
    const signinForm = document.getElementById('signin-form');
    const usernameInput = document.getElementById('username');
    const messageDiv = document.getElementById('message');
    const images = document.querySelectorAll('#image-container img');
    let selectedImages = [];
    let selectedIds = [];

    // Function to select an image
    const selectImage = (filename) => {
        const img = document.querySelector(`img[data-filename="${filename}"]`);
        const isSelected = img.classList.toggle('selected');
        const imageId = generateUniqueId(); // Generate a unique ID for the selected image
        if (isSelected) {
            selectedImages.push({ filename, id: imageId }); // Add image filename and ID to the selectedImages array
            selectedIds.push(imageId);
            // Display the generated ID
            console.log(`Image ${filename} has ID: ${imageId}`);
        } else {
            selectedImages = selectedImages.filter(img => img.filename !== filename); // Remove image filename and ID if deselected
            selectedIds = selectedIds.filter(id => id !== imageId);
        }
        checkSignInButton(); // Check if all images are selected to enable/disable Sign In button
    };

    // Function to generate a unique ID
    const generateUniqueId = () => {
        return Math.random().toString(36).substr(2, 9);
    };

    // Function to check if all images are selected
    const checkSignInButton = () => {
        const signinButton = document.getElementById('signin-button');
        signinButton.disabled = selectedImages.length !== images.length;
    };

    // Submit form
    signinForm.addEventListener('submit', async(e) => {
        e.preventDefault();
        const username = usernameInput.value;

        try {
            const response = await fetch('/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, selectedIds })
            });
            const data = await response.json();
            if (data.success) {
                // Display a pop-up box
                window.alert('Signin Successful!');
                // Optionally, redirect to a dashboard or another page
                // window.location.href = '/dashboard';
            } else {
                messageDiv.textContent = data.message;
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });

    // Add click event listener to images
    images.forEach(img => {
        img.addEventListener('click', () => {
            const filename = img.getAttribute('data-filename');
            selectImage(filename);
        });
    });
});