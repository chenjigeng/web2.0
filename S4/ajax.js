var store = [];
$(document).ready(function() {
	$('#assert-area').mouseenter(function() {
		store = [];
		hide();
		delieve_event();
		$(".apb").click(random_click);
	});
	$('#assert-area').mouseleave(mouseLeave)
})

function mouseLeave() {
	store = [];
	$("span").html("");
	$("#info-bar").html("").removeClass('blue');
	$('li').removeClass("gray");
	$("li").unbind();
	$("#sequence").html("");
	$(".apb").removeClass("gray").unbind();
	htmlobj.abort();
}

function hide() {
	$("#num1").hide();
	$("#num2").hide();
	$("#num3").hide();
	$("#num4").hide();
	$("#num5").hide();
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

function count() {
	var b = 0;
	$("span").each(function() {
		b += parseInt($(this).html());
	})
	$(this).html(b).unbind().removeClass('blue');
}
//机器人模拟随机点击
function random_click() {
	$(".apb").unbind().addClass('gray');
	var all = $("li");
	var a = ['A', 'B', 'C', 'D', 'E']; 
	a.sort(function() {
		return 0.5 - Math.random()
	}); //随机生成顺序
	p = a.join('、');
	$("#sequence").html(p).show();
	var item = a.shift();
	item = translate(item);
	get_data.call(item, a);
}

function get_data(a) {
	var own = this;
	store.push(this);
	$("li").unbind();
	htmlobj = $.get("/get", function(req) {
		$(own).find('span').html(req);
		$("li").each(function() {
			if (store.indexOf(this) == -1) $(this).removeClass("gray");
		})
		$(own).addClass('gray');
		delieve_event();
		if (check()) motivate_bigballon();
		if (a.length != 0) {
			var next = a.shift();
			next = translate(next);
			get_data.call(next, a);
		} else {
			$("#info-bar").click();
			$(".apb").addClass('gray');
			$(".apb").unbind();
		}
	});
	$(this).find("span").html("...").show();
	$("li").addClass("gray");
	$(this).removeClass('gray');
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