download_btn.addEventListener("click", () => {
  download_btn.innerText = "downloading ...";

  const theDiv = videoContainer.cloneNode(true);

  theDiv.style.background = "transparent";
  theDiv.getElementsByTagName("canvas")[0].remove();

  const data = [];
  let count = 0;
  texts.map((text) => {
    text.myDrag.style.border = "0";

    html2canvas(text.myDrag, { backgroundColor: null }).then((mynewCanvas) => {
      const textData = {
        to: text.to,
        from: text.from,
       imgBase64: mynewCanvas.toDataURL(),
        left: text.myDrag.offsetLeft * scaleW,
        top: text.myDrag.offsetTop * scaleH,
      };

      data.push(textData);
      count++;
      if (count > texts.length - 1) {
        const file = JSON.parse(localStorage.getItem("file"));

        fetch(
          `http://localhost:3000/api/merge`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },

            body: JSON.stringify({
              data,
              file,
            }),
          },
          50000
        )
          .then((response) => response.json())
          .then((result) => {
            download_btn.innerText = "download";
            if (result.success) {
              const a = document.createElement("a");
              document.body.appendChild(a);
              a.download = "output.mp4";
              a.href = "./download";
              a.click();
            }
          });
      }
    });
  });

  document.getElementById("trash").innerHTML = "";
  document.getElementById("trash").appendChild(theDiv);

  // html2canvas(theDiv, { backgroundColor: null }).then((mynewCanvas) => {
  //   theContext.clearRect(0, 0, theCanvas.width, theCanvas.height);
  //   theContext.drawImage(
  //     mynewCanvas,
  //     0,
  //     0,
  //     mynewCanvas.width,
  //     mynewCanvas.height,
  //     0,
  //     0,
  //     theCanvas.width,
  //     theCanvas.height
  //   );

  //   const file = JSON.parse(localStorage.getItem("file"));

  //   fetch(
  //     `http://localhost:3000/api/merge`,
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Accept: "application/json",
  //       },

  //       body: JSON.stringify({
  //         imgBase64: theCanvas.toDataURL(),
  //         from,
  //         to,
  //         file,
  //       }),
  //     },
  //     50000
  //   )
  //     .then((response) => response.json())
  //     .then((result) => {
  //       download_btn.innerText = "download";
  //       if (result.success) {
  //         const a = document.createElement("a");
  //         document.body.appendChild(a);
  //         a.download = "output.mp4";
  //         a.href = "./download";
  //         a.click();
  //       }
  //     });
  // });
});
