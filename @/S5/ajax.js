var store = [];
$(document).ready(function() {
	$('#assert-area').mouseenter(function() {
		$('li').removeClass("gray");
		$("li").unbind();
		store = [];
		hide();
		delieve_event();
		$(".apb").click(random_click);
	});
	$('#assert-area').mouseleave(mouseLeave);
})

function mouseLeave() {
	store = [];
	$("span").html("");
	$("#info-bar").html("").removeClass('blue');
	$('li').removeClass("gray");
	$("li").unbind();
	$("#sequence").html("");
	$(".apb").removeClass("gray").unbind();
	$("#message").html("").hide();
	htmlobj.abort();
}

function hide() {
	$("#num1").hide();
	$("#num2").hide();
	$("#num3").hide();
	$("#num4").hide();
	$("#num5").hide();
	$("#message").hide();
	$("#sequence").hide();
}

function get() {
	$(".apb").unbind().addClass('gray');
	var own = this;
	store.push(this);
	$("li").unbind();
	htmlobj = $.get("/abc", function(req) {
		$(own).find('span').html(req);
		$("li").each(function() {
			if (store.indexOf(this) == -1) $(this).removeClass("gray");
		})
		$(own).addClass('gray');
		delieve_event();
		if (check()) motivate_bigballon();
	});
	$(this).find("span").html("...").show();
	$("li").addClass("gray");
	$(this).removeClass('gray');
}

function delieve_event() {
	$("li").each(function() {
		if (store.indexOf(this) == -1) {
			$(this).click(get);
		}
	})
}

function check() {
	if (store.length == 5) return true;
	else return false;
}

function motivate_bigballon() {
	$("#info-bar").addClass('blue').click(count);
}

function count(currentSum) {
	var b = 0;
	$("span").each(function() {
		b += parseInt($(this).html());
	})
	$(this).html(b).unbind().removeClass('blue');
}
//机器人随机点击
function random_click() {
	$(".apb").unbind().addClass('gray');
	var all = $("li");
	var a = ['A', 'B', 'C', 'D', 'E'];
	var sto = [];
	a.sort(function() {
		return 0.5 - Math.random()
	});
	p = a.join('、');
	$("#sequence").html(p).show();
	var item = a.shift();
	item = translate(item);
	var time = 0;
	try {
		get_data.call(item, a, 0, time, sto); //判断调用是否失败
	} catch (e) {
		$("#message").html(e.message).show();
		get_data_fatal.call(item, a, e.currentSum, time, sto);
	}
}
//事件处理程序，若出错则返回错误信息以及当前和
function get_data(a, currentSum, time, sto) {
	try {
		sto.push(this);
		time++;
		var message = return_message(this);
		$("#message").html(message).show();
		var own = this;
		$("li").unbind();
		htmlobj = $.get("/get", function(req) {
			$(own).find('span').html(req);
			currentSum += parseInt(req);
			$("li").each(function() {
				if (sto.indexOf(this) == -1) $(this).removeClass("gray");
			})
			$(own).addClass('gray');
			delieve_event();
			if (a.length == 0) motivate_bigballon();
			next_handle(a, currentSum, time, sto);
		});
		$(this).find("span").html("...").show();
		$("li").addClass("gray");
		$(this).removeClass('gray');
	} catch (e) {//失败则回调信息以及当前和
		var message = inverse_message(this);
		var error_data = {
			'message': message,
			'currentSum': currentSum
		};
		throw error_data;
	}
}
//将字母转换为对应的html对象
function translate(data) {
	switch (data) {
		case 'A':
			return $("li")[0];
		case 'B':
			return $("li")[1];
		case 'C':
			return $("li")[2];
		case "D":
			return $("li")[3];
		case 'E':
			return $("li")[4];
	}
}
//根据HTML对象返回信息
function return_message(item) {
	if (item == $("li")[0]) return "这是个天大的秘密";
	if (item == $("li")[1]) return "我不知道";
	if (item == $("li")[2]) return "你不知道";
	if (item == $("li")[3]) return "他不知道";
	if (item == $("li")[4]) return "才怪";
}
//返回相反信息
function inverse_message(item) {
	if (item == $("li")[0]) return "这不是个天大的秘密";
	if (item == $("li")[1]) return "我知道";
	if (item == $("li")[2]) return "你知道";
	if (item == $("li")[3]) return "他知道";
	if (item == $("li")[4]) return "是的";
}

function click_bigballon(currentSum) {
	ran_count.call($("#info-bar"), currentSum);
	$(".apb").addClass('gray');
	$(".apb").unbind();
}
//计算当前和以及显示
function ran_count(currentSum) {
	$(this).unbind().removeClass('blue').html(currentSum);
	$("#message").html("楼主异步调用战斗力感人,目测不超过" + currentSum).show();
}
//若本次请求成功，则调用下一个handler并根据下一个是否成功做出不同的请求
function next_handle(a, currentSum, time, sto, that) {
	if (a.length != 0) {
		var next;
		if (that) next = that;
		else {
			var next = a.shift();
			next = translate(next);
		}
		try {
			get_data.call(next, a, currentSum, time, sto);
		} catch (e) {
			$("#message").html(e.message).show();
			get_data_fatal.call(next, a, e.currentSum, time, sto);
		}
	} else click_bigballon(currentSum);
}

function get_data_fatal(a, currentSum, time, sto) {
	sto.push(this);
	time++;
	var own = this;
	$("li").unbind();
	htmlobj = $.get("/get", function(req) {
		$(own).find('span').html(req);
		currentSum += parseInt(req);
		$("li").each(function() {
			if (sto.indexOf(this) == -1) $(this).removeClass("gray");
		})
		$(own).addClass('gray');
		delieve_event();
		if (a.length == 0) motivate_bigballon();
		next_handle(a, currentSum, time, sto);
	});
	$(this).find("span").html("...").show();
	$("li").addClass("gray");
	$(this).removeClass('gray');
}