var pop_rolling = function(popContainer) {
	// 시간단위는 ms로 1000이 1초
	if (popContainer.nodeType == 1) {
		this.popContainer = popContainer;
	} else {
		this.popContainer = document.getElementById(popContainer);
	}
	this.is_rolling = false;
	this.counter = 0;
	this.pop_children = null;
	this.time_dealy = 5000; //움직이는 타임딜레이
	this.time_timer = null;
	this.time_timer_pause = null;
	this.mouseover = false;
	this.init();
}

pop_rolling.prototype.init = function() {
	var pop_children = this.popContainer.childNodes;
	for (var i=(pop_children.length-1); 0<=i; i--) {
		if (pop_children[i].nodeType != 1) {
			this.popContainer.removeChild(pop_children[i]);
		}
	}

	this.pop_children = this.popContainer.childNodes;
	var oRoll = this;

	for (var i=0; i<this.pop_children.length; i++) {
		for (var k=0; k<this.pop_children[i].childNodes.length; k++) {
			if (this.pop_children[i].childNodes[k].nodeType == 1) {
				this.pop_children[i].childNodes[k].onclick = function() {
					oRoll.moveAt(this.firstChild);
					return false;
				}
				this.pop_children[i].childNodes[k].onfocus = function() {
					oRoll.moveAt(this.firstChild);
					return false;
				}
				break;	// 첫번째 링크(A)에만 이벤트 할당
			}
		}
	}
}

pop_rolling.prototype.moveAt = function(oBtn) {
	var i = oBtn.id.substring(12);
	this.mouseover = true;
	if (!this.time_timer_pause) {
		this.counter = (i-1);
		this.move_right();
		this.pause();
	}
}

pop_rolling.prototype.move_right = function() {
	var oRoll = this;
	var nTemp = 0;
	for (var i=0, m=oRoll.pop_children.length; i<m; i++) {
		nTemp = 0;
		for (var k=0; k<this.pop_children[i].childNodes.length; k++) {
			if (this.pop_children[i].childNodes[k].nodeType == 1) {
				nTemp++;
				if (nTemp == 1) {
					var child_1 = oRoll.pop_children[i].childNodes[k].childNodes[0];	//버튼이미지
					child_1.src = child_1.src.replace(/_on.gif/gi,".gif");

					if (i == oRoll.counter) {
						child_1.src = child_1.src.replace(/.gif/gi,"_on.gif");
					}
				} else {
					var child_2 = oRoll.pop_children[i].childNodes[k].childNodes[0];	//배너이미지
					child_2.style.display = "none";
					if (i == oRoll.counter) {
						child_2.style.display = "block";
					}
				}

			}
		}
	}

	oRoll.counter++;
	if (oRoll.counter >= oRoll.pop_children.length) {
		oRoll.counter = 0;
	}
}

pop_rolling.prototype.start = function() { //롤링 시작
	var oRoll = this;
	this.stop();
	this.is_rolling = true;

	var act = function() {
		if(oRoll.is_rolling){
			oRoll.move_right();
		}
	}
	if (!this.time_timer) {
		act();	// 처음 로딩시 첫번째 버튼이 즉시 선택되도록
	}
	this.time_timer = setInterval(act,this.time_dealy);
}

pop_rolling.prototype.pause = function() { //일시 멈춤
	this.is_rolling = false;
}

pop_rolling.prototype.resume = function() { //일시 멈춤 해제
	this.is_rolling = true;
}

pop_rolling.prototype.stop = function() { //롤링을 끝냄
	this.is_rolling = false;
	if (!this.time_timer) {
		clearInterval(this.time_timer);
	}
	this.time_timer = null;
}

































var js_rolling = function(box){
	if(box.nodeType==1){
		this.box = box;
	}else{
		this.box = document.getElementById(box);
	}
	this.is_rolling = false;
	this.mouseover_pause = true;
	this.direction = 1;
	this.children =	null;
	this.move_gap = 1;
	this.time_dealy = 100;
	this.time_dealy_pause = 1000;
	this.time_timer=null;
	this.time_timer_pause=null;
	this.mouseover=false;
	this.init();
	this.set_direction(this.direction);
}
js_rolling.prototype.init = function(){
	this.box.style.position='relative';
	this.box.style.overflow='hidden';
	var children = this.box.childNodes;
	for(var i=(children.length-1);0<=i;i--){
		if(children[i].nodeType==1){
			children[i].style.position='relative';
		}else{
			this.box.removeChild(children[i]);
		}
	}
	var thisC=this;

	this.box.onmouseover=function(){
		if(!thisC.mouseover_pause){	return;	}
		thisC.mouseover=true;
		if(!thisC.time_timer_pause){
			thisC.pause();
		}
	}
	this.box.onmouseout=function(){
		if(!thisC.mouseover_pause){return;}
		thisC.mouseover=false;
		if(!thisC.time_timer_pause){
			thisC.resume();
		}
	}	
}
js_rolling.prototype.set_direction = function(direction){
	this.direction=direction;
	if(this.direction==2 ||this.direction==4){
		this.box.style.whiteSpace='nowrap';
	}else{
		this.box.style.whiteSpace='normal';
	}
	var children = this.box.childNodes;
	for(var i=(children.length-1);0<=i;i--){
			if(this.direction==1){
				children[i].style.display='block';
			}else if(this.direction==2){
				children[i].style.textlign='right';
				children[i].style.display='inline';
			}else if(this.direction==3){
				children[i].style.display='block';
			}else if(this.direction==4){
				children[i].style.display='inline';
			}
	}
	this.init_element_children();	
}
js_rolling.prototype.init_element_children = function(){
	var children = this.box.childNodes;
	this.children = children;
	for(var i=(children.length-1);0<=i;i--){
			if(this.direction==1){
				children[i].style.top='0px';
			}else if(this.direction==2){
				children[i].style.left='-'+this.box.firstChild.offsetWidth+'px';
			}else if(this.direction==3){
				children[i].style.top='-'+this.box.firstChild.offsetHeight+'px';
			}else if(this.direction==4){
				children[i].style.left='0px';
			}
	}
}
js_rolling.prototype.act_move_up = function(){
	for(var i = 0,m=this.children.length;i<m;i++){
		var child = this.children[i];
		child.style.top=(parseInt(child.style.top)-this.move_gap)+'px';
	}
	if((this.children[0].offsetHeight+parseInt(this.children[0].style.top))<=0){
		this.box.appendChild(this.children[0]);
		this.init_element_children();
		this.pause_act();		
	}
}
js_rolling.prototype.move_up = function(){
	if(this.direction!=1&&this.direction!=3){return false;}
	this.box.appendChild(this.children[0]);
	this.init_element_children();
	this.pause_act();	
}
js_rolling.prototype.act_move_down = function(){
	for(var i = 0,m=this.children.length;i<m;i++){
		var child = this.children[i];
		child.style.top=(parseInt(child.style.top)+this.move_gap)+'px';
	}
	if(parseInt(this.children[0].style.top)>=0){
		this.box.insertBefore(this.box.lastChild,this.box.firstChild);
		this.init_element_children();
		this.pause_act();	
	}
}
js_rolling.prototype.move_down = function(){
	if(this.direction!=1&&this.direction!=3){return false;}	
	this.box.insertBefore(this.box.lastChild,this.box.firstChild);
	this.init_element_children();
	this.pause_act();
}
js_rolling.prototype.act_move_left = function(){
	for(var i = 0,m=this.children.length;i<m;i++){
		var child = this.children[i];
		child.style.left=(parseInt(child.style.left)-this.move_gap)+'px';
	}
	if((this.children[0].offsetWidth+parseInt(this.children[0].style.left))<=0){
		this.box.appendChild(this.box.firstChild);
		this.init_element_children();
		this.pause_act();		
	}
}
js_rolling.prototype.move_left = function(){
	if(this.direction!=2&&this.direction!=4){return false;}		
	this.box.appendChild(this.box.firstChild);
	this.init_element_children();
	this.pause_act();		
}
js_rolling.prototype.act_move_right = function(){
	for(var i = 0,m=this.children.length;i<m;i++){
		var child = this.children[i];
		child.style.left=(parseInt(child.style.left)+this.move_gap)+'px';
	}
	
	if(parseInt(this.box.lastChild.style.left)>=0){
		this.box.insertBefore(this.box.lastChild,this.box.firstChild);
		this.init_element_children();
		this.pause_act();		
	}
}
js_rolling.prototype.move_right = function(){
	if(this.direction!=2&&this.direction!=4){return false;}			
	this.box.insertBefore(this.box.lastChild,this.box.firstChild);
	this.init_element_children();
	this.pause_act();
}
js_rolling.prototype.start = function(){ //濡ㅻ쭅 �쒖옉
	var thisC = this;
	this.stop();
	this.is_rolling = true;
	var act = function(){
		if(thisC.is_rolling){
			if(thisC.direction==1){thisC.act_move_up();}
			else if(thisC.direction==2){thisC.act_move_right();}
			else if(thisC.direction==3){thisC.act_move_down();}
			else if(thisC.direction==4){thisC.act_move_left();}
		}
	}
	this.time_timer = setInterval(act,this.time_dealy);
}
js_rolling.prototype.pause_act = function(){ //�쇱떆 �숈옉
	if(this.time_dealy_pause){
		var thisC = this;
		var act = function(){thisC.resume();thisC.time_timer_pause=null;}
		if(this.time_timer_pause){clearTimeout(this.time_timer_pause);}
		this.time_timer_pause = setTimeout(act,this.time_dealy_pause);
		this.pause();
	}
}
js_rolling.prototype.pause = function(){ //�쇱떆 硫덉땄
	this.is_rolling = false;
}
js_rolling.prototype.resume = function(){ //�쇱떆 硫덉땄 �댁젣
	if(!this.mouseover){
		this.is_rolling = true;
	}
}
js_rolling.prototype.stop = function(){ //濡ㅻ쭅�� �앸깂
	this.is_rolling = false;
	if(this.time_timer !=null){
		clearInterval(this.time_timer);
		this.time_timer = null;
	}
	
}