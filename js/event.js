
// 상세페이지 이동
function goView(arg){
    var fm = document.srhForm;
    fm.list_no.value = arg;
    fm.act.value = "view";
    fm.submit();
}

// 목록으로 이동
function goList(){
    var fm = document.vewForm;
    fm.act.value = "list";
    fm.submit();
}

// 페이지 이동
function goPage(arg){
    var fm = document.srhForm;
    fm.nPage.value = arg;
    fm.act.value = "list";
    fm.submit();
}
