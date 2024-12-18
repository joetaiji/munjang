var Cal = function(divId) {

	this.divId = divId;
	this.Months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12' ];
  
	var d = new Date();  
	this.currMonth = d.getMonth();
	this.currYear = d.getFullYear();
	this.currDay = d.getDate();  
  };


	/* ----------------------------------------------------------------------------------------------------
	일간 
	---------------------------------------------------------------------------------------------------- */
  
  // Goes to next month
  Cal.prototype.nextMonth = function() {
	if ( this.currMonth == 11 ) {
	  this.currMonth = 0;
	  this.currYear = this.currYear + 1;
	}
	else {
	  this.currMonth = this.currMonth + 1;
	}
	this.showDayCurr();
  };
  
  // Goes to previous month
  Cal.prototype.previousMonth = function() {
	if ( this.currMonth == 0 ) {
	  this.currMonth = 11;
	  this.currYear = this.currYear - 1;
	}
	else {
	  this.currMonth = this.currMonth - 1;
	}
	this.showDayCurr();
  };
  
  // Show current day
  Cal.prototype.showDayCurr = function() {
	this.showDay(this.currYear, this.currMonth);
  };
  
  // Show month (year, month)
  Cal.prototype.showDay = function(y, m) {
  
	var d = new Date()
	// First day of the week in the selected month
	, firstDayOfMonth = new Date(y, m, 1).getDay()
	, firstDateOfMonth =  new Date(y, m, 1).getDate()
	// Last day of the selected month
	, lastDateOfMonth =  new Date(y, m+1, 0).getDate()
	// Last day of the previous month
	, lastDayOfLastMonth = m == 0 ? new Date(y-1, 11, 0).getDate() : new Date(y, m, 0).getDate();
  

	var html = '<div class="calendar-header"><strong class="date">' + y + '년 ' + this.Months[m] + '월</strong></div>';

	
	// Write selected month and year
	html += '<div class="item-list">';  
	// Write the days
	var i=1;
	do {
	  // Write the current day in the loop
	  var chk = new Date();
	  var chkY = chk.getFullYear();
	  var chkM = chk.getMonth();
	  
	  if (chkY == this.currYear && chkM == this.currMonth && i == this.currDay) {
		if( i == firstDateOfMonth){
			html += '<div class="start today"><button type="button" class="item"><span>' + i + '일</span></button></div>';
		}else if( i == lastDateOfMonth){
			html += '<div class="end today"><button type="button" class="item"><span>' + i + '일</span></button></div>';
		} else{
			html += '<div class="today"><button type="button" class="item"><span>' + i + '일</span></button></div>';
		}
	  } else {
		if( i == firstDateOfMonth){
			html += '<div class="start normal"><button type="button" class="item"><span>' + i + '일</span></button></div>';
		}else if( i == lastDateOfMonth){
			html += '<div class="end normal"><button type="button" class="item"><span>' + i + '일</span></button></div>';
		}else{
			html += '<div class="normal"><button type="button" class="item"><span>' + i + '일</span></button></div>';
		}
	  }
	  
  
	  i++;
	}while(i <= lastDateOfMonth);
	
	html += '</div>';
  
	// Write HTML to the div
	document.getElementById(this.divId).innerHTML = html;
  };


  /* ----------------------------------------------------------------------------------------------------
   월간 
   ---------------------------------------------------------------------------------------------------- */ 

	// Goes to next year
	Cal.prototype.nextYear = function() {	
		this.currYear = this.currYear + 1;
		this.showMonthCurr();
	};
		
	// Goes to previous year
	Cal.prototype.previousYear = function() {	
		this.currYear = this.currYear - 1;
		this.showMonthCurr();
	};

	// Show current month
	Cal.prototype.showMonthCurr = function() {
		this.showMonth(this.currYear);
	};


	Cal.prototype.showMonth = function(y) {	

	var html = '<div class="calendar-header"><strong class="date">' + y + '년 ' + '</strong></div>';

	

	// Write selected month and year
	html += '<div class="item-list">';  
	// Write the days
	var m = 1;
	do {  

		// Write the current day in the loop
		var chk = new Date();
		var chkY = chk.getFullYear();
		if (chkY == this.currYear && m == this.currMonth + 1) {
			if( m == 1){
				html += '<div class="start today"><button type="button" class="item"><span>' + m + '월</span></button></div>';
			} else if( m == 12){
				html += '<div class="end today"><button type="button" class="item"><span>' + m + '월</span></button></div>';
			} else{
				html += '<div class="today"><button type="button" class="item"><span>' + m + '월</span></button></div>';
			}
		} else {
			if( m == 1){
				html += '<div class="start normal"><button type="button" class="item"><span>' + m + '월</span></button></div>';
			} else if( m == 12){
				html += '<div class="end normal"><button type="button" class="item"><span>' + m + '월</span></button></div>';
			} else{
				html += '<div class="normal"><button type="button" class="item"><span>' + m + '월</span></button></div>';
			}
		}	 
		
		m++;
	}while(m <= 12);


	html += '</div>';
	

	// Write HTML to the div
	document.getElementById(this.divId).innerHTML = html;
	};


	/* ----------------------------------------------------------------------------------------------------
   연간 
   ---------------------------------------------------------------------------------------------------- */ 

	/* // Goes to next year
	Cal.prototype.nextYear = function() {	
		this.currYear = this.currYear + 1;
		this.showMonthCurr();
	};
		
	// Goes to previous year
	Cal.prototype.previousYear = function() {	
		this.currYear = this.currYear - 1;
		this.showMonthCurr();
	};
 */
	// Show current month
	Cal.prototype.showYearCurr = function() {
		this.showYear(this.currYear);
	};


	Cal.prototype.showYear = function(y) {	

	//html = '<div class="calendar-header"><strong class="date">' + y + '년 ' + '</strong></div>';

	// Write selected month and year
	var html = '<div class="item-list">';  
	// Write the days
	var y = 2000;
	do {  
		// Write the current day in the loop
		var chk = new Date();
		var chkY = chk.getFullYear();
		if (y == this.currYear) {			
			html += '<div class="today"><button type="button" class="item"><span>' + y + '년</span></button></div>';
		} else {
			html += '<div class="normal"><button type="button" class="item"><span>' + y + '년</span></button></div>';
		}
		y++;
	}while(y <= chkY);

	html += '</div>';

	// Write HTML to the div
	document.getElementById(this.divId).innerHTML = html;
	};
  

	//슬라이드
	function calSlide(elem){
		$sliderList = $(".calendar-wrap").find('.item-list');
		$sliderList.slick({
			infinite:false,
			centerMode: true,
			centerPadding: '45px',
			slidesToShow: 5,
			autoplay: false,  
			arrows: true,     		  
			dots:false,
			speed:100,
			responsive: [
				{
				  breakpoint: 768,
				  settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				  }
				}
			]
		}).slick('slickGoTo', $("." + elem).data("slick-index"));
	}
