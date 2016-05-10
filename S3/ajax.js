var store = [];//储存已经处理过的小气泡
var htmlobj = [];//储存$.get()返回的对象
$(document).ready(function() {
	$('#assert-area').mouseenter(function() {
		store = [];
		hide();
		delieve_event();
		$(".apb").click(Clicksametime);
	});
	$('#assert-area').mouseleave(mouseLeave);
})

function mouseLeave() {
	store = [];
	$("span").html("");
	$("#info-bar").html("").removeClass('blue').unbind();
	$('li').removeClass("gray");
	$("li").unbind();
	$(".apb").removeClass('gray').unbind();
	for (var i = 0; i < htmlobj.length; i++)
		htmlobj[i].abort(); // 鼠标移开后立即取消事件的callback，防止对下一次造成影响
}
//隐藏红圈
function hide() {
	$("#num1").hide();
	$("#num2").hide();
	$("#num3").hide();
	$("#num4").hide();
	$("#num5").hide();
}
//正常点击的处理事件
function get() {
	$(".apb").addClass('gray').unbind();
	var own = this;
	store.push(this);
	$("li").unbind();
	obj = $.get("/get", function(req) {
		$(own).find('span').html(req);
		$("li").each(function() {
			if (store.indexOf(this) == -1) $(this).removeClass("gray");
		})
		$(own).addClass('gray');
		delieve_event();
		if (check()) motivate_bigballon();
	});
	htmlobj.push(obj);
	$(this).find("span").html("...").show();
	$("li").addClass("gray");
	$(this).removeClass('gray');
}
//分发事件
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
//激活大气泡
function motivate_bigballon() {
	$("#info-bar").addClass('blue').click(count);
}
//求和并显示在大气泡上
function count() {
	var b = 0;
	$("span").each(function() {
		b += parseInt($(this).html());
	})
	$(this).html(b).unbind().removeClass('blue');
}
//同时点击5个小气泡
function Clicksametime() {
	$(".apb").unbind().addClass("gray");
	$("li").unbind();
	for (var i = 0; i < 5; i++)
		get_same.call($("li")[i]);
}
//小气泡同时点击的处理事件
function get_same() {
	var own = this;
	data = new Date();
	b = Math.random() * 100000;
	obj = $.get("/" + b, function(req) {
		store.push(own);
		$(own).find('span').html(req);
		$(own).addClass('gray');
		if (check()) {
			motivate_bigballon();
			$("#info-bar").click();
			$(".apb").addClass('gray').unbind();
		}
	});
	htmlobj.push(obj);
	$(this).find("span").html("...").show();
}