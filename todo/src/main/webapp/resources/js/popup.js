let registerForm = {
    window: document.querySelector(".register_form"),
    background: document.querySelector(".background"),
    
    id: document.querySelector(".register_form .from_wrap .form .id"),
    title: document.querySelector(".register_form .from_wrap .form .title"),
    description: document.querySelector(".register_form .from_wrap .form .description"),
    priority: document.querySelector(".register_form .from_wrap .form .priority"),
    dateText: document.querySelector(".register_form .from_wrap .form .date_text"),

    closeButton: document.querySelector(".register_form .close_button"),
    submitButton: document.querySelector(".register_form .from_wrap .button_area .submit_button"),

    initialize: function() {
        this.setEventListener();
    },
    setEventListener: function() {
        this.background.addEventListener("click", function() {
            this.hidePopup();
        }.bind(this));

        this.closeButton.addEventListener("click", function() {
            this.hidePopup();
        }.bind(this));

        this.submitButton.addEventListener("click", this.submit.bind(this));
    },
    showPopup: function(date) {
        this.id.value = "";
        this.title.value = "";
        this.dateText.value = "";
        this.description.value = "";

        if(date) {
            this.dateText.value = date.yyyy_mm_dd();
        }

        this.window.style.display = "block";
        this.background.style.display = "block";
    },
    modifyPopup: function(dataObject) {
        this.id.value = dataObject.id;
        this.title.value = dataObject.title;
        this.dateText.value = dataObject.date;
        this.description.value = dataObject.description;
        
        this.window.style.display = "block";
        this.background.style.display = "block";
    },
    hidePopup: function() {
        this.window.style.display = "none";
        this.background.style.display = "none";
    },
    submit: function() {
        let data = {};
        data.id = this.id.value;
        data.title = this.title.value;
        data.date = this.dateText.value;
        data.description = this.description.value;
        data.priority = Array.from(document.getElementsByName("priority")).find(r => r.checked).value;

        requestAjax({
            url: "./schedule",
            method: "POST",
            contentType: "application/json;charset=utf-8",
            data: data,
            success: function(response) {
                console.log(response);
                alert("완료되었습니다.");
                registerForm.hidePopup();
                mainCalendar.drawCalendar(new Date(data.date));
                todoList.updateList();
            }
        });

    }
};

let infoForm = {
    window: document.querySelector(".info_form"),
    background: document.querySelector(".background"),
    id: document.querySelector(".info_form .form_wrap .id"),
    title: document.querySelector(".info_form .form_wrap .form .title"),
    date: document.querySelector(".info_form .form_wrap .form .date"),
    priority: document.querySelector(".info_form .form_wrap .form .priority"),
    description: document.querySelector(".info_form .form_wrap .form .description"),
    
    closeButton: document.querySelector(".info_form .close_button"),
    modifyButton: document.querySelector(".info_form .form_wrap .button_area .modify_button"),
    initialize: function() {
        this.setEventListener();
    },
    setEventListener: function() {
        this.background.addEventListener("click", function() {
            this.hidePopup();
        }.bind(this));

        this.closeButton.addEventListener("click", function() {
            this.hidePopup();
        }.bind(this));
        
        this.modifyButton.addEventListener("click", function() {
            this.hidePopup();

            let param = {};
            param.id = this.id.value;
            param.title = this.title.innerText;
            param.date = this.date.innerText;
            param.priority = this.priority.innerText;
            param.description = this.description.innerText;

            this.hidePopup();
            registerForm.modifyPopup(param);
        }.bind(this));
    },
    showPopup: function(dataObject) {
        console.log("?/??????????????");
        if(!dataObject) {
            //this.dateText.value = date.yyyy_mm_dd();
        }

        this.id.value = dataObject.id;
        this.title.innerText = dataObject.title;
        this.date.innerText = dataObject.date;
        this.description.innerText = dataObject.description;
        this.priority.innerText = dataObject.priority;

        this.window.style.display = "block";
        this.background.style.display = "block";
    },
    hidePopup: function() {
        this.window.style.display = "none";
        this.background.style.display = "none";
    }
};

let alertForm = {
    window: document.querySelector(".alert_form"),
    background: document.querySelector(".background"),
    list: document.querySelector(".alert_form .form_wrap .list"),
    closeButton: document.querySelector(".alert_form .close_button"),

    initialize: function() {
        this.setEventListener();

        this.getAlertList();
    },
    setEventListener: function() {
        this.closeButton.addEventListener("click", function() {
            this.hidePopup();
        }.bind(this));

        this.background.addEventListener("click", function() {
            this.hidePopup();
        }.bind(this));

        /*
        this.list.addEventListener("click", function(evt) {
            if(evt.target.className == "element") {
                console.log("clicked");
                let id = evt.target.dataset.id;

                requestAjax({
                    url: "./schedule/" + id,
                    method: "GET",
                    success: function (response) {
                        let resultJson = JSON.parse(response);
                        console.log(response);

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
        });*/
    },
    showPopup: function() {
        this.window.style.display = "block";
        this.background.style.display = "block";
    },
    hidePopup: function() {
        this.window.style.display = "none";
        this.background.style.display = "none";
    },
    getAlertList: function() {
        requestAjax({
            url: "./today/" + new Date().yyyymmdd(),
            method: "GET",
            success: function (response) {
                let resultJson = JSON.parse(response);
                console.log(response.length);
                if(response.length == 0) {
                    return;
                }

                let list = document.querySelector(".alert_form .form_wrap .list");
                let template = document.querySelector("#listTemplate").innerText;

                let res = resultJson.map(function (val) {
                    console.log("val : " + val.date);

                    data = {};
                    data.id = val.id;
                    data.title = val.title;

                    val.alert = true;
                    
                    list.innerHTML += formatTemplate(template, data);

                    return val;
                });
                console.log("res :")
                res.forEach(function (val) {
                    console.log("v :" + val.id);
                    console.log("v :" + val.alert);
                });

                requestAjax({
                    url: "./schedule",
                    method: "PUT",
                    contentType: "application/json;charset=utf-8",
                    data: res,
                    success: function (response) {
                        console.log("put succ");
                    }
                });
                alertForm.showPopup();
            }
        });



    }
};