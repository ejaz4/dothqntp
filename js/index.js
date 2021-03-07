fetch('/components/backgrounds.json').then((response) => {
  if (response.status == 200){
    response.json().then((data)=>{
      const randomNum = Math.floor(getRandomArbitrary(0, data.length - 1));
      console.log(randomNum);
      console.log(data[randomNum]);
      document.getElementById("background-css").innerText = `
      .page{
          background-image: url('/images/unsplash/${data[randomNum].id}.jpeg');
      }
      `
      getImageLightness(`/images/unsplash/${data[randomNum].id}.jpeg`,function(brightness){
        console.log(brightness);
        if (brightness > 120){
          document.getElementById("text-css").innerText = `
          :root{
                    --backg-text-color: black;
                    --backg-text-color-rgb: 0;
                }
      `
        }
      });
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
    document.getElementsByClassName("time--a2")[0].innerText = `${days[d.getDay()]}, ${nth} ${months[d.getMonth()]}`
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
    document.getElementsByClassName("page")[0].setAttribute("style","");
    document.getElementsByClassName("page")[0].setAttribute("class","page page-in");
}
/* Set Time Tick */
setInterval(timetick, 995);
timetick();

const slideEverything = (arg) =>{
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

        var imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
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