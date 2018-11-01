let miniCalender = {
    today: new Date(),
    currentDay: null,
    drawCalendar: function (table, date, line, setElement) {
        //초기화
        while (table.rows.length > 1) {
            table.deleteRow(table.rows.length - 1);
        }
        
        date.setDate(date.getDate() - date.getDay());
    
        let row;
        let cnt = 0;
        while(cnt < line * 7) {
            if(cnt % 7 == 0) {
               row = table.insertRow();
            }
            //insert element
            let cell = row.insertCell();
            cell.innerHTML = date.getDate();
    
            date.setDate(date.getDate()+1);
            cnt++;
        }
    },
}

let calendar = {
    today: new Date(),
    currentDay: null,
    dateElement: document.querySelector("date_template"),

    _formatTemplate: function(str, data) {
        Object.keys(data).forEach((key) => {
            str = replaceAll(str, "{" + key + "}", data[key]);
        });
        return str;
    }
}