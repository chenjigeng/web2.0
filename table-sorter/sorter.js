$(document).ready(function() {
	tb = $("table"); // 获取table数组
	// 遍历每一个table
	for (var i = 0; i < tb.length; i++) {
		th = $(tb[i]).find("thead th"); // 获取对应table的表头
		for (var j = 0; j < th.length; j++) {
			th[j].onclick = sort_table(j, th, tb[i]); // 给每个表头提供一个事件
		}
	}
})

function sort_table(c, th, tb) {
	var count = 0;
	return function() {
		remove_class(th); // 清除上一次升序降序的class
		var td = $(tb).find("tbody tr td:nth-child(" + (c+1) + ')'), store = [] , count++; // store储存要排序的行的值,count判断是要升序还是降序
		for (var i = 0; i < td.length; i++) store.push(td[i].innerHTML);
		store.sort(); // 对储存的行的值排序
		if (count % 2 != 0) ascend.call(this, th, tb, c, store, td);
		else descend.call(this, th, tb, c, store, td);
	}
}

function remove_class(th) {
	//清除掉升序降序的class
	for (var i = 0; i < th.length; i++)
		th[i].className = "";
}

//对相应的table进行升序排序
function ascend(th, tb, c, store, td) {
	$(this).addClass('click-odd'); // 增加css样式
	for (i = 0; i < td.length; i++) {
		for (var j = 0; j < td.length; j++) {
			if (store[i] == td[j].innerHTML) {
				$(tb).find("tbody tr:nth-child(" + (j+1) + ')').appendTo($(tb).find('tbody')); // 改变td顺序
				var td = $(tb).find("tbody tr td:nth-child(" + (c+1) + ')'); // 更新td数组
			}
		}
	}
}

//对相应的table进行降序排序
function descend(th, tb, c, store, td) {
	$(this).addClass('click-even');
	for (i = td.length - 1; i >= 0; i--) {
		for (var j = 0; j < td.length; j++) {
			if (store[i] == td[j].innerHTML) {
			$(tb).find("tbody tr:nth-child(" + (j+1) + ')').appendTo($(tb).find('tbody'));
			var td = $(tb).find("tbody tr td:nth-child(" + (c+1) + ')');
			}
		}
	}
}