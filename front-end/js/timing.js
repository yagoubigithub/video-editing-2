// /***************************************************************************************** */
// const timing = document.getElementById("timing");

// const time = document.getElementById("time");
// const timing_left = document.getElementById("timing-left");
// const timing_right = document.getElementById("timing-right")
// let original_width = 0;
// let original_x = 0;
// let original_y = 0;
// let original_mouse_x = 0;
// let original_mouse_y = 0;
// let minwidth = 100;

// timing_right.addEventListener('mousedown', function (e) {
//   e.preventDefault()
//   window.addEventListener('mousemove', resize)
//   window.addEventListener('mouseup', () => {
//     window.removeEventListener('mousemove', resize)
//   })

//   function resize(e) {

//     if (w - e.pageX + 200 <= 0) {
//       return
//     }

//     if (e.pageX - timing.getBoundingClientRect().left <= minwidth) return

//     timing.style.width = e.pageX - timing.getBoundingClientRect().left + 'px';
//     to = (e.pageX - 200) / one_second
//     time.innerHTML = new Date(from * 1000).toISOString().substring(14, 19) + "---" + new Date(to * 1000).toISOString().substring(14, 19)

//   }

// })

// timing_left.addEventListener('mousedown', function (e) {
//   e.preventDefault()
//   original_width = parseFloat(getComputedStyle(timing, null).getPropertyValue('width').replace('px', ''));
//   original_x = timing.getBoundingClientRect().left;

//   original_mouse_x = e.pageX;
//   original_mouse_y = e.pageY;
//   window.addEventListener('mousemove', resize)
//   window.addEventListener('mouseup', () => {
//     window.removeEventListener('mousemove', resize)
//   })

//   function resize(e) {

//     if (e.pageX - original_mouse_x < 0) {
//       return
//     }
//     if (original_width - (e.pageX - original_mouse_x) <= minwidth) return

//     timing.style.width = original_width - (e.pageX - original_mouse_x) + 'px'
//     timing.style.left = (e.pageX - original_mouse_x) + 'px'

//     from = (e.pageX - original_mouse_x) / one_second

//     time.innerHTML = new Date(from * 1000).toISOString().substring(14, 19) + "---" + new Date(to * 1000).toISOString().substring(14, 19)

//   }

// })

function addTiming(orignal_from, orignal_to, id) {
  const timing = document.createElement("div");
  timing.className = "timing";

  const time = document.createElement("div");
  time.className = "time";
  const timing_left = document.createElement("div");
  timing_left.className = "timing-left";
  const timing_right = document.createElement("div");
  timing_right.className = "timing-right";

  timing.style.width = one_second * 3 + "px";


  timing.style.left = one_second*orignal_from + "px"
  time.innerHTML =
    new Date(orignal_from * 1000).toISOString().substring(14, 19) +
    "---" +
    new Date(orignal_to * 1000).toISOString().substring(14, 19);
  timing.append(timing_left, time, timing_right);

  let original_width = 0;
  let original_x = 0;
  let original_y = 0;
  let original_mouse_x = 0;
  let original_mouse_y = 0;
  let minwidth = 100,
  from = 0,
  to = 3;


  timing_right.addEventListener("mousedown", function (e) {
    e.preventDefault();
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", () => {
      window.removeEventListener("mousemove", resize);
    });

    function resize(e) {
      if (w - e.pageX + 200 <= 0) {
        return;
      }

      if (e.pageX - timing.getBoundingClientRect().left <= minwidth) return;

      timing.style.width = e.pageX - timing.getBoundingClientRect().left + "px";

      to = (e.pageX - 200) / one_second;
      texts = texts.map((text) => {
        if (text.id === id) {
          time.innerHTML =
            new Date(text.from * 1000).toISOString().substring(14, 19) +
            "---" +
            new Date(to * 1000).toISOString().substring(14, 19);
          return {
            ...text,
            to,
          };
        }
        return text;
      });
    }
  });

  timing_left.addEventListener("mousedown", function (e) {
    e.preventDefault();
    original_width = parseFloat(
      getComputedStyle(timing, null).getPropertyValue("width").replace("px", "")
    );
    original_x = timing.getBoundingClientRect().left;

    original_mouse_x = e.pageX;
    
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", () => {
      orignal_from = from;
      orignal_to = to;
      window.removeEventListener("mousemove", resize);
    });

    function resize(e) {
      if (e.pageX - original_mouse_x < 0) {
        return;
      }
      if (original_width - (e.pageX - original_mouse_x) <= minwidth) return;

      timing.style.width = original_width - (e.pageX - original_mouse_x) + "px";

      timing.style.left =  ((e.pageX  -  original_mouse_x) + orignal_from * one_second)+ "px";

      from = orignal_from + (e.pageX - original_mouse_x) / one_second;

      
      console.log("from=" + from);
      console.log("left=" + ((e.pageX  -  original_mouse_x) + orignal_from * one_second));
      
      texts = texts.map((text) => {
        if (text.id === id) {
          time.innerHTML =
            new Date(from * 1000).toISOString().substring(14, 19) +
            "---" +
            new Date(text.to * 1000).toISOString().substring(14, 19);
          return {
            ...text,
            from,
          };
        }
        return text;
      });
    }
  });

  document.getElementById("timing-container").append(timing);
}
