document.addEventListener("DOMContentLoaded", initialize);

let btn = document.querySelector(".test");
btn.addEventListener("click", function() {
    console.log("clicked");

    requestAjax({
        url: "./schedule/",
        method: "GET",
        contentType: "application/json;charset=utf-8",
        data: {
            "date": "2018-03"
        },
        success: function(response) {
            console.log(response);
            alert("예약이 완료되었습니다.");
        }
    });

});

function initialize() {
    mainPage.initialize();
}

let popup = {
    window: document.querySelector(".popup"),
    background: document.querySelector(".background"),
    submitButton: document.querySelector(".popup .submit_button"),
    initialize: function() {

    },
    setEventListener: function() {
        


    },
    showPopup: function(date) {

    }
}

let mainPage = {
    miniCalendar: {
        _this: null,
        _that: null,
        table: document.querySelector(".info_area .calendar"),
        prevButton: document.querySelector(".date .button_wrap .prevButton"),
        nextButton: document.querySelector(".date .button_wrap .nextButton"),
        dateText: document.querySelector(".date .cal_date"),
        month: null,
        year: null,
        initialize: function() {
            console.log("miniCalendar init");
            _this = this.miniCalendar;
            _that = this;
            _this.setEventListener();
            _this.drawCalendar(new Date());
        },
        setEventListener: function() {
            _this.table.addEventListener("click", function(evt) {
                if(evt.target.nodeName !== "TD") {
                    return;
                }
                
                let date = evt.target.dataset;
                _that.displayDate = new Date(date.year, date.month, date.date);
                
                this.mainCalendar.drawCalendar(_that.displayDate);

            }.bind(_that));

            _this.prevButton.addEventListener("click", function() {
                _this.drawCalendar(new Date(_this.year, _this.month - 1, 1));
            }.bind(this));

            _this.nextButton.addEventListener("click", function() {
                console.log(_this);
                console.log(this);
                _this.drawCalendar(new Date(_this.year, _this.month + 1, 1));
            }.bind(this));
        },
        drawCalendar: function (date) {
            console.log("miniCal Date : " + date);
            _this.year = date.getFullYear();
            _this.month = date.getMonth();

            _this.setDateText(date);

            //초기화
            while (_this.table.rows.length > 1) {
                _this.table.deleteRow(_this.table.rows.length - 1);
            }
            
            date.setDate(date.getDate() - date.getDay());
        
            let row;
            let cnt = 0;
            while(cnt < 42) {
                if(cnt % 7 == 0) {
                   row = _this.table.insertRow();
                }

                let cell = row.insertCell();
                cell.setAttribute("data-year", date.getFullYear());
                cell.setAttribute("data-month", date.getMonth());
                cell.setAttribute("data-date", date.getDate());
                cell.innerHTML = date.getDate();
        
                date.setDate(date.getDate()+1);
                cnt++;
            }
        },
        setDateText: function(date) {
            let month = date.getMonth() + 1;
            console.log("setDateText in miniCal : " + date.getFullYear() + "년 " + month + "월");
            _this.dateText.innerHTML = date.getFullYear() + "년 " + month + "월";
        }
    },//end of miniCalendar
    mainCalendar: {
        _this: null,
        _that: null,
        table: document.querySelector(".cal_area .calendar"),
        dateElement: document.querySelector("#dateTemplete").innerText ,
        initialize: function() {
            _this = this.mainCalendar;
            _that = this;

            _this.drawCalendar(new Date());
        },
        setEventListener: function() {
            _this.table.addEventListener("click", function(evt){
                if(evt.target.nodeName !== "TD") {
                    return;
                }

                

            });
        },
        drawCalendar: function (date) {
            console.log("drawCalendar in mainCalendar : " + date);
            //초기화
            while (this.table.rows.length > 1) {
                this.table.deleteRow(this.table.rows.length - 1);
            }
            
            date.setDate(date.getDate() - date.getDay());
            let temp = new Date(date);
        
            let row;
            let cnt = 0;
            while(cnt < 28) {
                if(cnt % 7 == 0) {
                   row = this.table.insertRow();
                   row.className = "date_row";
                }

                let cell = row.insertCell();
                cell.setAttribute("data-year", date.getFullYear());
                cell.setAttribute("data-month", date.getMonth());
                cell.setAttribute("data-date", date.getDate());

                let data = {};
                data.val = date.getDate();
                cell.innerHTML = formatTemplate(this.dateElement, data);
        
                date.setDate(date.getDate()+1);
                cnt++;
            }

            requestAjax({
                url: "./schedule/" + temp.yyyymmdd(),
                method: "GET",
                success: function (response) {
                    let resultJson = JSON.parse(response);
                    console.log("response : " + response);
                    console.log("resultJson.items : " + resultJson.items);

                    resultJson.forEach(function(val) {
                        console.log("val : " + val);
                    });

                }
            });
        },

    },//end of mainCalendar
    nowDate: null,
    displayDate: null,

    initialize: function() {
        nowDate = new Date();
        this.displayDate = nowDate;

        this.mainCalendar.initialize.bind(this)();

        this.miniCalendar.initialize.bind(this)();
    },
    addEventListener: function() {
        //this.miniCalendar.initialize();
    }

}
