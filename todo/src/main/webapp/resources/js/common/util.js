function formatTemplate(str, data) {
    Object.keys(data).forEach((key) =>{
      str = replaceAll(str, "{" + key + "}", data[key]);
    });
    return str;
}

function replaceAll(str, searchStr, replaceStr) {
    return str.split(searchStr).join(replaceStr);
}

Date.prototype.yyyymmdd = function() {
    var mm = this.getMonth() + 1;
    var dd = this.getDate();
  
    return [this.getFullYear(),
            (mm>9 ? '' : '0') + mm,
            (dd>9 ? '' : '0') + dd
           ].join('');
};