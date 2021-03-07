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