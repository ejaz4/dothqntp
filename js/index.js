let globalvar = {};

fetch('/components/backgrounds.json').then((response) => {
  if (response.status == 200){
    response.json().then((data)=>{
      const randomNum = Math.floor(getRandomArbitrary(0, data.length - 1));
      console.log(data[randomNum]);
      fetch(`/images/unsplash/${data[randomNum].id}.jpeg`).then((response) => {

        if (response.status == 200) { response.blob().then((buffer) => {

          globalvar["wallpaperURL"] = URL.createObjectURL(buffer);

          document.getElementById("background-css").innerText = `
          .page{
            background-image: url('${globalvar["wallpaperURL"]}');
          }`;

          getImageLightness(`${globalvar["wallpaperURL"]}`,function(brightness){

            console.log(brightness)
            if (brightness > 3){
              document.getElementById("text-css").innerText = `
                :root{
                    --backg-text-color: black;
                    --backg-text-color-rgb: 0;
                }`
            }
      });
      document.getElementsByClassName("page")[0].setAttribute("style","");
      document.getElementsByClassName("page")[0].setAttribute("class","page page-in");
        }) }
      })
    })
  }
})

const getRandomArbitrary = (min, max) => {
    return Math.random() * (max - min) + min;
}

const timetick = () => {

    const d = new Date();
    const nth = getOrdinalNum(d.getDate());

    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ];

    const days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ];

    document.getElementsByClassName("time--a1")[0].innerText = `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
    const t2 = document.getElementsByClassName("time--a2")[0];
    if (settings["locale"].startsWith("en")){
      t2.innerText = `${days[d.getDay()]}, ${nth} ${months[d.getMonth()]}`;
    }
    if (settings["locale"].startsWith("ja")){ t2.innerHTML = `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日 (${flsestrings[days[d.getDay()]].ja})`; }
    if (settings["locale"].startsWith("sv")){ t2.innerHTML = `${flsestrings[days[d.getDay()]].sv}, ${d.getDate()} ${flsestrings[months[d.getMonth()]].sv}`;}
}

const getOrdinalNum = (number) => {
  let selector;

  if (number <= 0) {
    selector = 4;
  } else if ((number > 3 && number < 21) || number % 10 > 3) {
    selector = 0;
  } else {
    selector = number % 10;
  }

  return number + ['th', 'st', 'nd', 'rd', ''][selector];
};

const loadcall = () => {
  console.log("");
}
/* Set Time Tick */
setInterval(timetick, 995);
const flseLoadcall = () => {
  timetick();
}

const slideEverything = (arg) => {
    document.getElementsByClassName('widgets')[0].setAttribute('class','widgets widgets-slide');
    let arightelems = document.getElementsByClassName("top-right");
    Array.prototype.forEach.call(arightelems, function(item) {
        const t = item.getAttribute("class");
        item.setAttribute("class", t + ' slidden');
        item.setAttribute("slide","aslidden");
    });
    let brightelems = document.getElementsByClassName("center-right");
    Array.prototype.forEach.call(brightelems, function(item) {
        const t = item.getAttribute("class");
        item.setAttribute("class", t + ' slidden');
        item.setAttribute("slide","cslidden");
    });
    let crightelems = document.getElementsByClassName("bottom-right");
    Array.prototype.forEach.call(crightelems, function(item) {
        const t = item.getAttribute("class");
        item.setAttribute("class", t + ' slidden');
        item.setAttribute("slide","cslidden");
    });
    document.getElementsByClassName("settings-closed")[0].setAttribute("class","settings");
    if (document.getElementsByClassName("settings-comp")[0].getAttribute("datainside") != "1"){
      setTimeout(() => {
    fetch('/components/settings.html').then((response) => {
      if (response.status == 200){
        response.text().then((data) => {
          document.getElementsByClassName("settings-comp")[0].innerHTML = data;
          document.getElementsByClassName("settings-comp")[0].setAttribute("datainside", "1")
          document.getElementsByClassName("settings-loading")[0].setAttribute("style","opacity: 0; transition: opacity 0.3s ease; padding: 20px 35px 0px 0px;");
          setTimeout(() => document.getElementsByClassName("settings-loading")[0].setAttribute("style","display: none;"), 
          300);
          setTimeout(() => document.getElementsByClassName("settings-comp")[0].setAttribute("style","opacity: 1; transition: opacity 0.3s ease;"),
          300);

        });
      }
    });
  }, 300);
  }
}

function getImageLightness(imageSrc,callback) {
    var img = document.createElement("img");
    img.src = imageSrc;
    img.style.display = "none";
    document.body.appendChild(img);

    var colorSum = 0;

    img.onload = function() {
        // create canvas
        var canvas = document.createElement("canvas");
        canvas.width = this.width;
        canvas.height = this.height;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(this,0,0);

        var imageData = ctx.getImageData(0,0,300,200);
        var data = imageData.data;
        var r,g,b,avg;

        for(var x = 0, len = data.length; x < len; x+=4) {
            r = data[x];
            g = data[x+1];
            b = data[x+2];

            avg = Math.floor((r+g+b)/3);
            colorSum += avg;
        }

        var brightness = Math.floor(colorSum / (this.width*this.height));
        callback(brightness);
    }
}

window.addEventListener("beforeunload", () => {
  URL.revokeObjectURL(globalvar["wallpaperURL"]);
})