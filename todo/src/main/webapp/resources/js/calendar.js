let calendar = {
    MAX_ROW: 6,
    row: null,
    cnt: 0,
    addDateElement: function (type, table, startDate, maxDate) {
        while (startDate <= maxDate) {
            if (this.cnt % 7 == 0) {
                this.row = table.insertRow();
            }
            let cell = this.row.insertCell();
            cell.innerHTML = startDate++;
            cell.className = type;
            this.cnt++;
        }
    },
    makeCalender: function (now) {
        let table = document.querySelector(".calendar");

        //초기화
        while (table.rows.length > 1) {
            table.deleteRow(table.rows.length - 1);
        }

        let currMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        let prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);

        let date = prevMonth.getDate() - prevMonth.getDay();
        this.addDateElement("prev", table, date, prevMonth.getDate());
        this.addDateElement("curr", table, 1, currMonth.getDate());
        this.addDateElement("next", table, 1, 14 - (this.cnt % 7));
    }
}