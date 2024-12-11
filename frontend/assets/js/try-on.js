document.getElementById("try-on-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const fileInput = document.getElementById("upload-image");
    const file = fileInput.files[0];

    if (!file) {
        alert("Please upload an image!");
        return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
        // Show a loading indicator or disable the form
        const response = await fetch("https://api.example.com/ai-try-on", {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            throw new Error("Failed to process the image. Please try again.");
        }

        const result = await response.json();

        // Display the processed image
        const resultSection = document.getElementById("result-section");
        const processedImage = document.getElementById("processed-image");

        processedImage.src = result.processedImageUrl; // Adjust according to the API response
        resultSection.style.display = "block";

    } catch (error) {
        alert(error.message);
    }
});
