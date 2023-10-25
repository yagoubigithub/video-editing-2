function myModel(modalId, btnId, closeId , callback) {
  const model = document.getElementById(modalId);

  // Get the button that opens the modal
  const btn = document.getElementById(btnId);

  // Get the <span> element that closes the modal
  const span = document.getElementById(closeId);

  // When the user clicks on the button, open the modal
  btn.onclick = function () {
    model.style.display = "block";
    callback()
  };

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    model.style.display = "none";
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == model) {
      model.style.display = "none";
    }
  };
  return model
}


myModel("videos-model" , "btn-open-videos" , "close-videos-modal", showVideosList)