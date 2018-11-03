let mainCalendar = {
    table: document.querySelector(".cal_area .calendar"),
    dateText: document.querySelector(".header .date_wrap .date"),
    dateElement: document.querySelector("#dateTemplete").innerText,
    startDate: null,
    initialize: function () {
        this.drawCalendar(new Date());
        this.setEventListener();
    },
    setEventListener: function () {
        this.table.addEventListener("click", function (evt) {

            if (evt.target.className == "todo") {
                let id = evt.target.querySelector(".id").value;

                requestAjax({
                    url: "./schedule/" + id,
                    method: "GET",
                    success: function (response) {
                        let resultJson = JSON.parse(response);

                        data = {};
                        data.id = resultJson.id;
                        data.title = resultJson.title;
                        data.description = resultJson.description;
                        data.priority = resultJson.priority;
                        data.date = resultJson.date;

                        infoForm.showPopup(data);
                    }
                });
                return;
            }
            if (evt.target.nodeName !== "TD") {
                return;
            }
            

            let date = evt.target.dataset;

            registerForm.showPopup(new Date(date.year, date.month - 1, date.date));

        });
    },
    drawCalendar: function (date) {
        //초기화
        while (this.table.rows.length > 1) {
            this.table.deleteRow(this.table.rows.length - 1);
        }

        date.setDate(date.getDate() - date.getDay());
        let temp = new Date(date);
        this.setDateText(temp);
        let s = new Date(date);
        this.startDate = new Date(date);

        miniCalendar.markDate(s);

        let row;
        let cnt = 0;
        while (cnt < 28) {
            if (cnt % 7 == 0) {
                row = this.table.insertRow();
                row.className = "date_row";
            }

            let y = date.getFullYear();
            let m = date.getMonth();
            let d = date.getDate();

            let cell = row.insertCell();
            cell.setAttribute("data-year", y);
            cell.setAttribute("data-month", m + 1);
            cell.setAttribute("data-date", d);

            let data = {};
            data.val = date.getDate();
            data.id = date.yyyy_mm_dd();
            cell.innerHTML = formatTemplate(this.dateElement, data);

            date.setDate(date.getDate() + 1);
            cnt++;
        }

        requestAjax({
            url: "./schedule/" + s.yyyymmdd() + "/" + temp.yyyymmdd(),
            method: "GET",
            success: function (response) {
                let resultJson = JSON.parse(response);
                let temp = document.querySelector("#scheduleTemplate").innerText;
                

                resultJson.forEach(function (val) {
                    let todoList = document.querySelector(".id_" + val.date).querySelector(".todo_list");    

                    data = {};
                    data.id = val.id;
                    data.title = val.title;
                    todoList.innerHTML += formatTemplate(temp, data);
                });
            }
        });
    },
    setDateText: function (date) {
        let text = "";
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let prev = date.getDate();
        text += year + "년 " + month + "월";

        date.setDate(date.getDate() + 27);
        let val = date.getDate();

        if (val < prev) {
            text += " - ";
        }
        if (year != date.getFullYear()) {
            text += date.getFullYear() + "년 ";
        }
        if (val < prev) {
            let next = date.getMonth() + 1;
            text += next + "월";
        }

        this.dateText.innerHTML = text;
    }
}


let miniCalendar = {
    table: document.querySelector(".info_area .calendar"),
    prevButton: document.querySelector(".date .button_wrap .prevButton"),
    nextButton: document.querySelector(".date .button_wrap .nextButton"),
    dateText: document.querySelector(".date .cal_date"),
    month: null,
    year: null,
    day: null,
    displayDate: null,
    initialize: function () {
        this.setEventListener();
        this.drawCalendar(new Date());
    },
    setEventListener: function () {
        this.table.addEventListener("click", function (evt) {
            if (evt.target.classList.contains("td_element") == false) {
                return;
            }

            let date = evt.target.dataset;
            let displayDate = new Date(date.year, date.month, date.date);

            mainCalendar.drawCalendar(displayDate);
        }.bind(this));

        this.prevButton.addEventListener("click", function () {
            this.drawCalendar(new Date(this.year, this.month - 1, 1));
            this.markDate(mainCalendar.startDate);
        }.bind(this));

        this.nextButton.addEventListener("click", function () {
            this.drawCalendar(new Date(this.year, this.month + 1, 1));
            this.markDate(mainCalendar.startDate);
        }.bind(this));
    },
    drawCalendar: function (date) {
        this.year = date.getFullYear();
        this.month = date.getMonth();
        this.day = date.getDate();

        this.setDateText(date);

        //초기화
        while (this.table.rows.length > 1) {
            this.table.deleteRow(this.table.rows.length - 1);
        }

        date.setDate(date.getDate() - date.getDay());

        this.displayDate = new Date(date);

        let row;
        let cnt = 0;
        while (cnt < 42) {
            if (cnt % 7 == 0) {
                row = this.table.insertRow();
                row.className = "date_row";
            }

            let cell = row.insertCell();
            cell.setAttribute("data-year", date.getFullYear());
            cell.setAttribute("data-month", date.getMonth());
            cell.setAttribute("data-date", date.getDate());
            cell.classList.add("td_element");
            cell.classList.add("id_" + date.yyyymmdd());
            cell.innerHTML = date.getDate();

            date.setDate(date.getDate() + 1);
            cnt++;
        }
    },
    setDateText: function (date) {
        let month = date.getMonth() + 1;
        this.dateText.innerHTML = date.getFullYear() + "년 " + month + "월";
    },
    markDate: function(date) {
        let temp = new Date(date);
        let dt = new Date(this.displayDate);
        
        let cnt = 0;
        while(cnt < 42) {
            let td = document.querySelector(".info_area .cal .calendar .id_" + dt.yyyymmdd());
            if(td.classList.contains("mark_date") == true) {
                td.classList.remove("mark_date");
            }

            cnt++;
            dt.setDate(dt.getDate()+1);
        }

        cnt = 0;
        while(cnt < 28) {
            let td = document.querySelector(".info_area .cal .calendar .id_" + temp.yyyymmdd());
            if(td != null) {
                td.classList.add("mark_date");    
            }

            temp.setDate(temp.getDate() + 1);
            cnt++;
        }

    }
}

let todoList = {
    list: document.querySelector(".info_area .all .list"),

    initialize: function () {
        this.setEventListener();

        this.updateList();
    },
    setEventListener: function () {
        this.list.addEventListener("click", function (evt) {
            if (evt.target.className == "element") {
                let id = evt.target.dataset.id;

                requestAjax({
                    url: "./schedule/" + id,
                    method: "GET",
                    success: function (response) {
                        let resultJson = JSON.parse(response);

                        data = {};
                        data.id = resultJson.id;
                        data.title = resultJson.title;
                        data.description = resultJson.description;
                        data.priority = resultJson.priority;
                        data.date = resultJson.date;

                        infoForm.showPopup(data);
                    }
                });
            }
        }.bind(this));
    },
    updateList: function() {
        requestAjax({
            url: "./schedule",
            method: "GET",
            success: function (response) {
                let resultJson = JSON.parse(response);
                let list = document.querySelector(".info_area .all .list");
                let template = document.querySelector("#listTemplate").innerText;

                resultJson.forEach(function (val) {
                    data = {};
                    data.id = val.id;
                    data.title = val.title;
                    
                    list.innerHTML += formatTemplate(template, data);
                });
            }
        });
    }
}