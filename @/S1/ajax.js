var store = [];
$(document).ready(function() {
	$('#assert-area').mouseenter(function() {
		store = [];
		hide();
		delieve_event();
	});
	$('#assert-area').mouseleave(mouseLeave);
})

function mouseLeave() {
	store = [];
	$("span").html("");
	$("#info-bar").html("").removeClass('blue');
	$('li').removeClass("gray");
	$("li").unbind();
	htmlobj.abort();//停止正在发生的事件
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
	});
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
//检查是否结束 
function check() {
	if (store.length == 5) return true;
	else return false;
}
//激活大气泡
function motivate_bigballon() {
	$("#info-bar").addClass('blue').click(count);
}
//计数并且显示在大气泡上
function count() {
	var b = 0;
	$("span").each(function() {
		b += parseInt($(this).html());
	})
	$(this).html(b).unbind().removeClass('blue');
}