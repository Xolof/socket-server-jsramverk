let getTime = function () {
   let dateObj = new Date();
   let year = dateObj.getFullYear();
   let day = dateObj.getDate() < 10 ? "0" + dateObj.getDate() : dateObj.getDate();
   let month = (parseInt(dateObj.getMonth()) + 1) < 10 ? "0" + (parseInt(dateObj.getMonth()) + 1) : (parseInt(dateObj.getMonth()) + 1) ;
   let hours = dateObj.getHours() < 10 ? "0" + dateObj.getHours() : dateObj.getHours();
   let minutes = dateObj.getMinutes() < 10 ? "0" + dateObj.getMinutes() : dateObj.getMinutes();
   let seconds = dateObj.getSeconds() < 10 ? "0" + dateObj.getSeconds() : dateObj.getSeconds();

   return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

module.exports = {
    getTime
}
