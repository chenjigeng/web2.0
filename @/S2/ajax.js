var store = [];
var all = $('li');
$(document).ready(function() {
	//鼠标移到@
	$('#assert-area').mouseenter(function() {
		store = []; 
		hide();
		delieve_event();
		$('.apb').click(autoclick);
	});
	//鼠标离开@区域
	$('#assert-area').mouseleave(function() {
		store = [];
		$("span").html("");
		$("#info-bar").html("").removeClass('blue');
		$('li').removeClass("gray");
		$("li").unbind();
		$(".apb").removeClass('gray');
		htmlobj.abort();
	})
})
//自动点击机器人
function autoclick() {
	$(".apb").unbind().addClass('gray');
	click0();
}
//隐藏红圈
function hide() {
	$("#num1").hide();
	$("#num2").hide();
	$("#num3").hide();
	$("#num4").hide();
	$("#num5").hide();
}
//获取随机数
function get() {
	$(".apb").addClass('gray').unbind();
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
		return true;
	});
	$(this).find("span").html("...").show();
	$("li").addClass("gray");
	$(this).removeClass('gray');
}
//分发ABCDE事件
function delieve_event() {
	$("li").each(function() {
		if (store.indexOf(this) == -1) {
			$(this).click(get);
		}
	})
}
//检查是否结束
function check() {
	if (store.length == 5) return true;
	else return false;
}
//激活大气泡
function motivate_bigballon() {
	$("#info-bar").addClass('blue').click(count);
}
//算出5个小气泡的和
function count() {
	var b = 0;
	$("span").each(function() {
		b += parseInt($(this).html());
	})
	$(this).html(b).unbind().removeClass('blue');
}
//自动机器人模拟按A气泡
function click0() {
	var own = $('li')[0];
	store.push(own);
	$("li").unbind();
	htmlobj = $.get("/get", function(req) {
		$(own).find('span').html(req);
		$("li").each(function() {
			if (store.indexOf(this) == -1) $(this).removeClass("gray");
		})
		$(own).addClass('gray');
		delieve_event();
		click1();
	});
	$(own).find("span").html("...").show();
	$("li").addClass("gray");
	$(own).removeClass('gray');
}
//按B气泡
function click1() {
	var own = $('li')[1];
	store.push(own);
	$("li").unbind();
	htmlobj = $.get("/get", function(req) {
		$(own).find('span').html(req);
		$("li").each(function() {
			if (store.indexOf(this) == -1) $(this).removeClass("gray");
		})
		$(own).addClass('gray');
		delieve_event();
		click2();
	});
	$(own).find("span").html("...").show();
	$("li").addClass("gray");
	$(own).removeClass('gray');
}
//按C气泡
function click2() {
	var own = $('li')[2];
	store.push(own);
	$("li").unbind();
	htmlobj = $.get("/get", function(req) {
		$(own).find('span').html(req);
		$("li").each(function() {
			if (store.indexOf(this) == -1) $(this).removeClass("gray");
		})
		$(own).addClass('gray');
		delieve_event();
		click3();
	});
	$(own).find("span").html("...").show();
	$("li").addClass("gray");
	$(own).removeClass('gray');
}
//按D气泡
function click3() {
	var own = $('li')[3];
	store.push(own);
	$("li").unbind();
	htmlobj = $.get("/get", function(req) {
		$(own).find('span').html(req);
		$("li").each(function() {
			if (store.indexOf(this) == -1) $(this).removeClass("gray");
		})
		$(own).addClass('gray');
		delieve_event();
		click4();
	});
	$(own).find("span").html("...").show();
	$("li").addClass("gray");
	$(own).removeClass('gray');
}
//按E气泡
function click4() {
	var own = $('li')[4];
	store.push(own);
	$("li").unbind();
	htmlobj = $.get("/get", function(req) {
		$(own).find('span').html(req);
		$("li").each(function() {
			if (store.indexOf(this) == -1) $(this).removeClass("gray");
		})
		$(own).addClass('gray');
		delieve_event();
		motivate_bigballon();
		$("#info-bar").click();
	});
	$(own).find("span").html("...").show();
	$("li").addClass("gray");
	$(own).removeClass('gray');
}