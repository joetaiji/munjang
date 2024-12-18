var count_num =0;
var btn_px=0;
var btn_num;
var btn_ul;
$(document).ready(function(){
	function btn_start(){
		defaultMar = 16;
		btn_ul=$("div.bannerList>ul");
		btn_li=$("div.bannerList>ul>li");
		btn_ul.attr("top", "0");
		btn_ul.css({"width":"10000px","position":"absolute"});

		btn_num = btn_li.length;
		btn_ul.attr("total", btn_li.size());
		btn_li.each(function (){
			$(this).clone().appendTo($(btn_ul));
		});

		btn_ul.hover(function(){
			  btn_stop();
		  },function(){
			  btn_stop();
			  btn_move();
		  });

		  btn_move();
	}

	btn_start();
});

function banner_check(){
	if(count_num == btn_num){
			btn_px = 0;
			count_num = 0;
		}
	  if ($("div.bannerList>ul:animated").size()) return false;
	  var width = btn_li.eq(count_num).width();
	  var pos = (parseInt(btn_ul.attr("top"))+1);
	  var mar = pos * defaultMar;
	  	btn_px += width+defaultMar;
		btn_ul.attr("top", pos);
		btn_ul.animate({
	      left: ((btn_px * -1) + "px")
	    }, 500
	      ,function() {
	          var pos = parseInt($("div.bannerList>ul").attr("top"));
	          var total = parseInt($("div.bannerList>ul").attr("total"));
	          if (pos>=total) {
	              $("div.bannerList>ul").attr("top", 0);
	              $("div.bannerList>ul").css("left", "0px");
	          }
	      }
	  );
		count_num++;
}

function btn_prev(){
	btn_stop();
	banner_check();
}

function btn_next(){
  btn_stop();
  if ($("div.bannerList>ul:animated").size()) return false;
  var width = btn_li.eq(count_num-1).width();
  var pos = (parseInt(btn_ul.attr("top"))+1)-2;
  var mar = pos * defaultMar;

	if(pos>=0) {
		btn_px -= width+defaultMar;
		count_num--;
		btn_ul.attr("top", pos);
		btn_ul.animate({
			left: ((btn_px * -1) + "px")
		}, 500
			,function() {
				var pos = parseInt(btn_ul.attr("top"));
				var total = parseInt(btn_ul.attr("total"));
				if (pos>=total) {
					btn_ul.attr("top", 0);
					btn_ul.css("left", "0px");
				}
			}
		);

	}else{
		alert("첫번째 배너입니다.");
	}
}

function btn_stop(){
	clearInterval(btn_ul.attr("timer"));
}
function btn_move(){
	btn_stop();
	btn_ul.attr("timer", setInterval(banner_check, 5000));
}

$(function(){
	$(".tabTxt:gt(0)").hide();
	$(".tabMenu ul.tab li").click(function(){
		$(".tabMenu ul.tab li").each(function(){
			$(this).attr("class","");
			$(".tabTxt").hide();
		});
		$(this).attr("class","selected");
		var tabTxt_on = $(this).children().attr("href");
		$(tabTxt_on).show();
	});
});