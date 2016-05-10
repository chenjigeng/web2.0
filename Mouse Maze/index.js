window.onload = function() {
	c_n = true; // 游戏是否进行中的标志
	id = "" // 储存当前变红的那个墙的ID
	count = 0; 
	S = document.getElementById('start');
	all = document.getElementById('all');
	S.onmouseover = function() {
		result = document.getElementById('show-result');
		result.innerHTML = "";
		if (c_n == false) {
			c_n = true;
			if (count && id != '') {
				turn(id);
				count -= 1;
			}
		}
		all.onmouseover = move;
	}
	all.onmouseout = moveout;
}	

//重置结果
function moveout() {
	if (c_n == false) {
		var mouseX = event.clientX;
		var mouseY = event.clientY;
		if (mouseX <= 400 || mouseX >= 900) {
			if (id && count) {
				turn(id);
				id = "";
				count -= 1;
			}
		}
		else if (mouseY <= 160 || mouseY >= 460) {
			if (id && count) {
				turn(id);
				id = "";
				count -= 1;
			}
		}
			
	}
}

//处理鼠标的移动
function move(event) {
	var mouseX = event.clientX;
	var mouseY = event.clientY;
	var ch = true; // 作为鼠标是否碰到墙的标志
	if (c_n) ch = check(mouseX,mouseY);
	//失败处理
	if (!ch) {
		result = document.getElementById('show-result');
		result.innerHTML = 'You Lose';
		c_n = false;
	}
	//正确到达处理
	if (mouseX >= 840 && mouseX < 880 && c_n && mouseY >= 365 && mouseY <= 410) {
		result = document.getElementById('show-result');
		result.innerHTML = 'You Win';
		c_n = false;
	}

	//处理作弊
	if (mouseX >= 880 && mouseX <= 900 && c_n &&mouseY >= 365 && mouseY <= 410) {
		result = document.getElementById('show-result');
		result.innerHTML = "Don't cheat, you should start form the 'S' and move to the 'E' inside the maze!";
		c_n = false;
	}
}

//检查此时鼠标位置是否正确
function check(mouseX, mouseY) {
	if (mouseX > 400 && mouseX <= 550) {
		if (mouseY < 360 && mouseY > 210) {
			turn("wall-left");
			count += 1;
			id = "wall-left"
			return false;
		}
		if (mouseY <= 210) {
			turn('top1');
			id = 'top1';
			count += 1;
			return false;
		}
		if (mouseY >= 410) {
			turn("bottom1");
			count += 1;
			id = 'bottom1'
			return false;
		}
	}

	if (mouseX > 550 && mouseX <= 600) {
		if (mouseY > 400) {
			turn("bottom1");
			count += 1;
			id = 'bottom1'
			return false;
		}
		if (mouseY < 210) {
			turn('top2');
			count += 1;
			id = 'top2'
			return false;
		}
	}

	if (mouseX >= 600 && mouseX < 700) {
		if (mouseY < 210) {
			turn('top2');
			count += 1;
			id = 'top2'
			return false;
		}
		if (mouseY >= 260 && mouseY < 410) {
			turn('wall2');
			id = 'wall2'
			count += 1;
			return false;
		}
		if (mouseY >= 410) {
			turn('bottom2');
			id = 'bottom2';
			count += 1;
			return false;
		}
	}

	if (mouseX >= 700 && mouseX < 750) {
		if (mouseY < 210) {
			turn('top2');
			id = 'top2';
			count += 1;
			return false;
		}
		if (mouseY >= 400) {
			turn("bottom3");
			id = 'bottom3';
			count += 1;
			return false;
		}
	}

	if (mouseX >= 750) {
		if (mouseY < 360 && mouseY > 210) {
			turn("wall-right");
			id = 'wall-right';
			count += 1;
			return false;
		} 
		if (mouseY > 400) {
			turn('bottom3');
			id = 'bottom3';
			count += 1;
			return false;
		}
		if (mouseY < 210 && mouseY > 160) {
			turn('top3');
			id = 'top3';
			count += 1;
			return false;
		}
	}
	return true;
}

//使墙变色
function turn(id) {
	walls = document.getElementById(id);
	if (walls.style.backgroundColor != 'red')  walls.style.backgroundColor = 'red';
	else walls.style.backgroundColor = "#EEEEEE";
}
