var Time;
img_result = document.getElementById('show-re');
window.onload = function() {
	num = 0; // 当前图案
	count_or = false;
	div_num = 4;  // 分块数目
	count = 0; // 步数
	s_n = false;
	topp = 352 - 352/div_num; // 记录空格位置
	left = 352 - 352/div_num;
	img_src = ""; // 储存用户传进来的文件的地址
	//获取HTML元素
	puzzle = document.getElementById('content');
	control = document.getElementById('start');
	harder = document.getElementById('harder');
	result = document.getElementById("result");
	time = document.getElementById('time');
	change = document.getElementById('change');
	file = document.getElementById('upload');

	file.onchange = getPath; // 用户上传图片
	create_div(puzzle);  // 创造拼图
	control.onclick = controlGame; // 控制游戏
	change.onclick = on_change_image;  // 更换图片
	harder.onclick = getHardorEasy;		//控制游戏难度
	document.onkeydown = button_control;  //对用户的键盘输入进行反馈
	
}

//对键盘输入进行反馈
function button_control(ev) {
	ev = ev || event;
	if (ev.keyCode == 83) {
		controlGame();
	} // 用户按了S键
	if (ev.keyCode == 67) {
		on_change_image();
	} // 用户按了C键
	if (ev.keyCode == 68) {
		getHardorEasy.call(harder);
	} // 用户按了D键
	if (ev.keyCode == 38) {
		move_top();
		//向上移
	}
	if (ev.keyCode == 37) {
		move_left();
		//向左移
	}
	if (ev.keyCode == 39) {
		move_right();
		//向右移
	}
	if (ev.keyCode == 40) {
		move_bottom();
		//向下移
	}
}

//鼠标按上移键的操作
function move_top() {
	if (!s_n) return;
	if (topp >= 352 - 352/div_num - 1 && topp <= 352 - 352/div_num + 1) {
		return;
	}
	else {
		var l = left, t = topp + 352/div_num;
		for (var i = 1; i < div_num * div_num; i++) {
			var id;
			if (div_num == 4) {
				id = "d" + i;
			}
			else {
				id = 'dd' + i;
			}
			var div_node = document.getElementById(id);
			var div_left = div_node.offsetLeft, div_top = div_node.offsetTop;
			if (div_left <= l + 4 && div_left >= l - 4 && div_top <= t + 4 && div_top >= t - 4) {
				div_node.style.top = topp + 'px', div_node.style.left = left + 'px';
				topp = div_top, left = div_left;
				count++;
				result.value = count;
				setTimeout(win_game,250);
				break;
			}
		}
	}
}

//鼠标按左移键的操作
function move_left() {
	if (!s_n) return;
	if (left >= 352 - 352/div_num - 1 && left <= 352 - 352/div_num + 1) {
		return;
	}
	else {
		var l = left + 352/div_num, t = topp;
		for (var i = 1; i < div_num * div_num; i++) {
			var id;
			if (div_num == 4) {
				id = "d" + i;
			}
			else {
				id = 'dd' + i;
			}
			var div_node = document.getElementById(id);
			var div_left = div_node.offsetLeft, div_top = div_node.offsetTop;	
			if (div_left <= l + 4 && div_left >= l - 4 && div_top <= t + 4 && div_top >= t - 4) {
				div_node.style.top = topp + 'px', div_node.style.left = left + 'px';
				topp = div_top, left = div_left;
				count++;
				result.value = count;
				setTimeout(win_game,250);
				break;
			}
		}
	} 
}

//鼠标按下移键的操作
function move_bottom() {
	if (!s_n) return;
	if (topp >= 1 && topp <= 0) {
			return;
	}
	else {
		var l = left, t = topp - 352/div_num;
		for (var i = 1; i < div_num * div_num; i++) {
			var id;
			if (div_num == 4) {
				id = "d" + i;
			}
			else {
				id = 'dd' + i;
			}
			var div_node = document.getElementById(id);
			var div_left = div_node.offsetLeft, div_top = div_node.offsetTop;
			if (div_left <= l + 4 && div_left >= l - 4 && div_top <= t + 4 && div_top >= t - 4) {
				div_node.style.top = topp + 'px', div_node.style.left = left + 'px';
				topp = div_top, left = div_left;
				count++;
				result.value = count;
				setTimeout(win_game,250);
				break;
			}
		}
	} 
}

//鼠标按右移键的操作
function move_right() {
	if (!s_n) return;
	if (left >= 0 && left <= 1) {
		return;
	}
	else {
		var l = left - 352/div_num, t = topp;
		for (var i = 1; i < div_num * div_num; i++) {
			var id;
			if (div_num == 4) {
				id = "d" + i;
			}
			else {
				id = 'dd' + i;
			}
			var div_node = document.getElementById(id);
			var div_left = div_node.offsetLeft, div_top = div_node.offsetTop;
			if (div_left <= l + 4 && div_left >= l - 4 && div_top <= t + 4 && div_top >= t - 4) {	
				div_node.style.top = topp + 'px', div_node.style.left = left + 'px';
				topp = div_top, left = div_left;
				count++;
				result.value = count;
				setTimeout(win_game,250);
				break;
			}
		}
	} 
}

//创造拼图
function create_div(puzzle) {
	left = 352 - 352/div_num;
	topp = 352 - 352/div_num;
	for (var i = 1;i <= div_num; i++)
		for (var j = 1; j <= div_num; j++) {
			if (i == div_num && j == div_num) continue;
			new_div = document.createElement('div');
			id = document.createAttribute('id');
			if (div_num == 4) {
				id.value = 'd' + (j+ div_num * (i-1));  //给拼图一个id
				new_div.setAttribute('class', 'p4'); //为拼图提供类名
			}
			else if (div_num == 5) {
				id.value = 'dd' + (j+ div_num * (i-1));	
				new_div.setAttribute('class', 'p5');
			}
			new_div.setAttributeNode(id);
			puzzle.appendChild(new_div);
		}
		if (img_src != "") {
			for (var i = 1; i < div_num * div_num; i++) {
				if (div_num == 4) {
					id = 'd' + i;
				}
				else id = 'dd' + i;
				div_node = document.getElementById(id);
				img_result = document.getElementById('show-re');
				div_node.style.backgroundImage = "url(" + img_src + ")";
				img_result.style.backgroundImage = "url(" + img_src + ")";
			}
		}
	change_image();
}

//删除拼图
function delete_div(puzzle) {
	//根据id来删除拼图
	for (var i = 1; i < div_num * div_num; i++) {
		if (div_num == 4)  id = 'd' + i;
		else id = 'dd' + i;
		child = document.getElementById(id);
		puzzle.removeChild(child);
	}
}

//开始游戏
function start_game() {
	puzzle = document.getElementById('content');
	for (var i = 0; i < div_num * div_num - 1; i++) {
		var div_node = puzzle.childNodes[i+1];
		var len = 352/div_num;
		// 移动拼图
		div_node.onclick = function(div_node) {
			return function() {
				if (s_n) {
					/*若游戏开始，判断用户该点击是否有效*/
					var t = div_node.offsetTop, l = div_node.offsetLeft;		
					if (l <= Math.ceil(left)  + 3&& l >= Math.ceil(left) - 3 && t <= Math.ceil(topp + len)+3&& t >= Math.ceil(topp + len)-3) {
						div_node.style.top = topp + "px";
						div_node.style.left = left + "px";
						topp = t;
						left = l;
						count++;
					}
					if (l <= Math.ceil(left) + 3&& l >= Math.ceil(left) - 3 && t <= Math.ceil(topp - len)+3 && t >= Math.ceil(topp - len) - 3) {
						div_node.style.top = topp + "px";
						div_node.style.left = left + "px";
						topp = t;
						left = l;
						count++;
					}
					if (t <= Math.ceil(topp) + 3&& t >= Math.ceil(topp) - 3 && l <= Math.ceil(left + len)+3 && l >= Math.ceil(left + len) -3) {
						div_node.style.top = topp + "px";
						div_node.style.left = left + "px";
						topp = t;
						left = l;
						count++;
					}
					if (t <= Math.ceil(topp) + 3&& t >= Math.ceil(topp) -3 && l <= Math.ceil(left - len)+3 && l >= Math.ceil(left-len) - 3) {
						div_node.style.top = topp + "px";
						div_node.style.left = left + "px";
						topp = t;
						left = l;
						count++;
					}		
					result.value = count; //更新步数
					win_game();
				}
			}
		}(div_node)
	}
}

//判断是否游戏结束
function win_game() {
	if (!s_n) return;
	puzzle = document.getElementById('content');
	var len = 352/div_num;
	for (var i = 0; i < div_num * div_num - 1; i++) {
		var div_node = puzzle.childNodes[i+1];
		var t = div_node.offsetTop, l = div_node.offsetLeft;
		// 判断拼图是否在正确的位置
		if (t > (Math.floor((i/div_num)) * len) + 3 || t < (Math.floor((i/div_num)) * len) - 3 || 
			l > ((i % div_num) * len + 3) || l < (i % div_num) * len - 3) {
			return;
		}
	}
	/*游戏结束，重置游戏状态以及时间，步数*/
	alert("恭喜你赢得游戏" + "并且花了" + time.value + "秒，走了" + result.value +"步，再接再厉哦");
	s_n = false;
	count = 0;
	result.value = 0;
	clearTimeout(Time);
	time = document.getElementById('time');
	time.value = 0;
}

//将拼图打乱
function divide_puzzle() {
	s_n = true;
	//给拼图提供有一个class,使移动的时候不会有动画延迟，来解决一系列问题
	for (var p = 1; p < div_num * div_num; p++) {
		var id;
		if (div_num == 4) id = "d" + p;
		else id = "dd" + p;
		div_node = document.getElementById(id);
		div_node.className += " c";
	}
	//随机走两百步来打乱拼图的顺序
	for (var i = 0; i < 200; i++) {
		var index = Math.floor(Math.random()* 4);
		if (index == 0) {
			move_bottom();
		}
		if (index == 1) {
			move_left();
		}
		if (index == 2) {
			move_right();
		}
		if (index == 3) {
			move_top();
		}
	}
	count = 0;
	result.value = 0;
	//删除一开始的类，使拼图恢复动画效果
	for (var p = 1; p < div_num * div_num; p++) {
		var id;
		if (div_num == 4) id = "d" + p;
		else id = "dd" + p;
		div_node = document.getElementById(id);
		div_node.className = div_node.className.slice(0, div_node.className.length - 2);
	}
}

//控制游戏
function controlGame() {
	if (s_n) {
		//复原
		clearInterval(Time);
		delete_div(puzzle);
		create_div(puzzle);
		count = 0;
		control.innerHTML = "开始游戏";
		result.value = "0";
		time.value = 0;
		s_n = false;
		return;
	}
	control.innerHTML = "复原";
	clearInterval(Time);
	count_or = !count_or;
	if (count_or) {
		time.value = 0;
		Time = setInterval(countTime, 1000);
	}
	else {
		time.value = 0;
		Time = setInterval(countTime, 1000);
	}
	count = 0;
	result.value = "0";
	//重新生成拼图
	delete_div(puzzle);
	create_div(puzzle);
	//分发版块
	divide_puzzle();
	//开始游戏
	start_game();
}

function countTime() {
	//计时
	v = parseInt(time.value);
	v++;
	time.value = v;
}

function getHardorEasy() {
	//控制游戏难度
	control.innerHTML = "开始游戏";
	s_n = false;
	time.value = 0;
	clearInterval(Time);
	result.value = '0';
	count = 0;
	delete_div(puzzle);
	if (div_num == 5) {
		div_num--;
		this.innerHTML = "增加难度";
	}
	else  {
		div_num++;
		this.innerHTML = '降低难度';
	}
	create_div(puzzle);
	topp = 352 - 352/div_num;
	left = 352 - 352/div_num;
}

function on_change_image() {
	control.innerHTML = "开始游戏";
	//更换图片
	img_src = "";
	s_n = false;
	clearInterval(Time);
	result.value = 0;
	count = 0;
	delete_div(puzzle);
	create_div(puzzle);
	topp = 352 - 352/div_num;
	left = 352 - 352/div_num;
	time.value = 0;
	if (num < 2) {
		num++;
		change_image();
	}
	else {
		num = 0;
		change_image();
	}
}

function change_image() {
	if (num == 1) {
		//换到第一张图
		for (var i = 0; i < div_num * div_num - 1; i++) {
			cname = puzzle.childNodes[i+1].className;
			if (cname.indexOf(" ") != -1) {
				cname = cname.slice(0, cname.indexOf(" "));
			}
			cname += " " + "p_1";
			puzzle.childNodes[i+1].className = cname;
			show_image = document.getElementById('show-re');
			show_image.className = 'p_1';
			show_image.style.backgroundImage = puzzle.childNodes[i+1].style.backgroundImage;
		}
		return;
	}
	else if (num == 2) {
		//换到第二张图
		for (var i = 0; i < div_num * div_num - 1; i++) {
			cname = puzzle.childNodes[i+1].className;
			if (cname.indexOf(" ") != -1) {
				cname = cname.slice(0, cname.indexOf(" "));
			}
			cname += " " + "p_2";
			puzzle.childNodes[i+1].className = cname;	
			show_image = document.getElementById('show-re');
			show_image.className = 'p_2';
			show_image.style.backgroundImage = puzzle.childNodes[i+1].style.backgroundImage;		
		}
		return;
	}
	else {
		//换到初始图
		for (var i = 0; i < div_num * div_num - 1; i++) {
			cname = puzzle.childNodes[i+1].className;
			if (cname.indexOf(" ") != -1) {
				cname = cname.slice(0, cname.indexOf(" "));
			}
			puzzle.childNodes[i+1].className = cname;		
			show_image = document.getElementById('show-re');
			show_image.className = 'p_3';
			show_image.style.backgroundImage = puzzle.childNodes[i+1].style.backgroundImage;	
		}

	}
}

 function getPath() {  
 	//IE
	if(window.navigator.userAgent.indexOf("MSIE")>=1) { 
		this.select(); 
		var path = document.selection.createRange().text; // 获取路径
		for (var i = 1; i < div_num * div_num; i++) {
				if (div_num == 4) {
					id = 'd' + i;
				}
				else id = 'dd' + i;
				div_node = document.getElementById(id);
				img_src = path;
				div_node.style.backgroundImage = "url(" + path + ")";
			}
		img_result = document.getElementById('show-re');
		img_result.style.backgroundImage = "url(" + path + ")";
		s_n = false;
		clearInterval(Time);
		count = 0;
		time.value = 0;
		result.value = 0;
		delete_div(puzzle);
		create_div(puzzle);
		control.innerHTML = '开始游戏';
	} 
	//其他
	else {
		var f = this.files[0];  // 获取用户上传的图片
		var reader = new FileReader(); 
		reader.onload = function(e){ 
			for (var i = 1; i < div_num * div_num; i++) {
				if (div_num == 4) {
					id = 'd' + i;
				}
				else id = 'dd' + i;
				div_node = document.getElementById(id);
				img_src = e.target.result;
				img_result = document.getElementById('show-re');
				img_result.style.backgroundImage = "url(" + e.target.result + ")";
				div_node.style.backgroundImage = "url(" + e.target.result + ")";
			}
		}
		reader.readAsDataURL(f); // 读取图片
		this.value = "";
		s_n = false;
		clearInterval(Time);
		count = 0;
		time.value = 0;
		result.value = 0;
		delete_div(puzzle);
		create_div(puzzle);
		control.innerHTML = '开始游戏';
	}
}