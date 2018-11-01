document.addEventListener("DOMContentLoaded", initialize);





function initialize() {
    let now = new Date();
    let currMonth = new Date(now.getFullYear(), now.getMonth(), 0);

    miniCalender.drawCalendar(document.querySelector(".info_area .calendar"), currMonth, 6);
    //calendar.drawCalendar(document.querySelector(".cal_area .calendar"), currMonth, 4);
}


let d = new Date();
console.log("d : " + d);

d.setDate(d.getDate() - d.getDay());
console.log(d);







