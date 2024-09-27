const imgInput = document.getElementById("bannerImage");

imgInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  console.log(file);
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const bannerImgContainer = document.getElementById("bannerImgContainer");
      const uploadedImage = document.getElementById("uploaded-img");
      if (bannerImgContainer) {
        bannerImgContainer.style.backgroundImage = `url(${e.target.result})`;
      }
      if (uploadedImage) {
        uploadedImage.src = e.target.result;
      }
    };
    reader.readAsDataURL(file);
  }
});
