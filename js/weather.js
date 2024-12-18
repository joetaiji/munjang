function getLocation(nx, ny, dongEnName){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();
    var hours = today.getHours();
    var minutes = today.getMinutes();
 
    if(minutes < 30){
        // 30분보다 작으면 한시간 전 값
        hours = hours - 1;
        if(hours < 0){
            // 자정 이전은 전날로 계산
            today.setDate(today.getDate() - 1);
            dd = today.getDate();
            mm = today.getMonth()+1;
            yyyy = today.getFullYear();
            hours = 23;
        }
    }
    if(hours < 10) { hours='0'+hours; }
    if(mm<10) { mm='0'+mm; }
    if(dd<10) { dd='0'+dd; } 
 
    var _nx = nx,
    _ny = ny,
    apikey = "Nn3OrSl%2FDgCocide0iBdIXHRDWJc%2FhNBq57GIHBIX5dQ3AorhiKy6NOMT%2FiJfJjUxr41EZbg6wQk5FnrPf7qog%3D%3D",
    today = yyyy+""+mm+""+dd,
    basetime = hours + "00",
    fileName = "http://newsky2.kma.go.kr/service/SecndSrtpdFrcstInfoService/ForecastGrib";
    fileName += "?ServiceKey=" + apikey;
    fileName += "&base_date=" + today;
    fileName += "&base_time=" + basetime;
    fileName += "&nx=" + _nx + "&ny=" + _ny;
    fileName += "&pageNo=1&numOfRows=10";

	var contentText = document.getElementById('content');
	contentText.innerHTML = dongEnName + fileName;
}
