import { months, days } from './constants.js';
import { getOrdinalNum } from './tools.js';

class NewTab {
  _pageElement = document.getElementsByClassName("page")[0]
  _backgroundElement = document.getElementsByClassName("background")[0]

  _timeElement = document.getElementsByClassName("time--a1")[0]
  _dateElement = document.getElementsByClassName("time--a2")[0]

  getData() {
    try {
      return JSON.parse(document.getElementById("APP_DATA").innerHTML);
    } catch(e) {
      console.error(e);
      return {}
    }
  }

  doTimeTick() {
    const d = new Date();
    const nth = getOrdinalNum(d.getDate());

    this._timeElement.innerText = `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
    this._dateElement.innerText = `${days[d.getDay()]}, ${nth} ${months[d.getMonth()]}`
  }

  /* TODO: this needs a major refractor */
  onSettingsClick() {
    document.getElementsByClassName('widgets')[0].setAttribute('class','widgets widgets-slide');
    let arightelems = Array.from(document.getElementsByClassName("top-right"));
    arightelems.forEach((item) => {
        const t = item.getAttribute("class");
        item.setAttribute("class", t + ' slidden');
        item.setAttribute("slide","aslidden");
    });
    let brightelems = Array.from(document.getElementsByClassName("center-right"));
    brightelems.forEach((item) => {
        const t = item.getAttribute("class");
        item.setAttribute("class", t + ' slidden');
        item.setAttribute("slide","cslidden");
    });
    let crightelems = Array.from(document.getElementsByClassName("bottom-right"));
    crightelems.forEach((item) => {
        const t = item.getAttribute("class");
        item.setAttribute("class", t + ' slidden');
        item.setAttribute("slide","cslidden");
    });
    document.getElementsByClassName("settings-closed")[0].setAttribute("class","settings");
  }

  constructor() {
    const { bg } = this.getData();

    const image = new Image();
    image.src = `/images/unsplash/${bg.id}.jpeg`

    image.addEventListener("load", () => {
      this._pageElement.style.opacity = 1;
      this._pageElement.classList.add("page");

      this._backgroundElement.style.backgroundImage = `linear-gradient(0deg,rgba(0, 0, 0, 0.5) 0%,rgba(255, 255, 255, 0) 50%,rgba(0, 0, 0, 0.5) 100%),url(/images/unsplash/${bg.id}.jpeg)`;
      this._backgroundElement.classList.add("bg-ready");
    })

    setInterval(() => this.doTimeTick(), 995);
    this.doTimeTick();
  }
}

window.ntp = new NewTab();