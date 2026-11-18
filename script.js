document.addEventListener("DOMContentLoaded", () => {
  const profileUpload = document.getElementById("profileUpload");
  const profileImage = document.getElementById("profileImage");

  // 1. Check if there is already a saved picture in localStorage when any page loads
  const savedImage = localStorage.getItem("profilePicture");
  if (savedImage && profileImage) {
    profileImage.src = savedImage;
  }

  // 2. Listen for when you select a new file to upload
  if (profileUpload && profileImage) {
    profileUpload.addEventListener("change", function (event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          const base64Image = e.target.result;
          
          // Update the image on the page immediately
          profileImage.src = base64Image;
          
          // Save it to localStorage so it stays saved across tabs and sessions
          try {
            localStorage.setItem("profilePicture", base64Image);
          } catch (error) {
            console.error("Image file is too large for localStorage storage limit.", error);
          }
        };
        reader.readAsDataURL(file);
      }
    });
  }
});