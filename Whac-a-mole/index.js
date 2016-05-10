window.onload = function() {
	t_f = false; // 作为游戏是否进行的标志
	start = document.getElementById('s_e');
	s_e.onclick = control_all;
	var radios = document.getElementsByName('hole');
	for (var i = 0; i <radios.length; i++)
		radios[i].onclick = click_it
}

//控制整个游戏的开始与结束
function control_all() {
	var text = document.getElementById('game');
	var Time = document.getElementById('time');
	var score = document.getElementById('scores');
	if (t_f == false) t_f = true;
	else t_f = false;
	//若游戏标志在进行中，生成地鼠
	if (t_f)  control_game();
	//否则，游戏结束，显示分数
	else {
		clearInterval(timer);
		Time.value = 0;
		text.value = 'Game Over'
		alert("Game Over.\nYour score is: " + score.value);	
		stopGame();
		return;
	}
	score.value = 0;
	Time.value = '30';
	timer = setInterval(change_time,1000);
}

//控制游戏的开始阶段
function control_game() {
	var text = document.getElementById('game');
	select = produce();
	text.value = 'Playing';
}

//随机生成地鼠
function produce() {
	var id = Math.ceil(Math.random() * 119) + 3;
	var select = content.childNodes[id];
	if (select.nodeType == 3) select = content.childNodes[id+1];
	select.checked = 'true';
	return select;
}

//进行加分与扣分操作
function click_it(event) {
	var score = document.getElementById('scores');
	radio = event.target;
	//若游戏结束，则地洞点了无反应
	if (t_f == false) {
		radio.checked = false;
		return;
	}
	//点中了加分，重新生成地洞
	if (radio == select) {
		b = parseInt(score.value);
		b += 1;
		score.value = b;
		control_game();
	}
	//点错扣分,地洞不变
	else {
		b = parseInt(score.value);
		b -= 1;
		score.value = b;
		select.checked = 'true';
	}
}

//游戏停止
function stopGame() {
	select.checked = false;
}

//控制时间
function change_time() {
	var text = document.getElementById('game');
	var score = document.getElementById('scores');
	var Time = document.getElementById('time');
	var t = parseInt(Time.value);
	t = t - 1;
	Time.value = t;
	if (t == 0) {
		clearInterval(timer);
		stopGame();
		alert("Game Over.\nYour score is: " + score.value);	
		text.value = 'Game Over';
		t_f = false;
	}
}