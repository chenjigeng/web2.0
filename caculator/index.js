var result = "";	// 储存输入以及最后运算的结果
var former_result = "";  // 上一次的结果
var store = 0; // 用于区别结果还是输入
function getData(b) {
	if (b == 'CE') {
		// 当输入为CE,清除所有的数据.
		result = "";
		document.getElementById("result").innerHTML = 0;
		document.getElementById('former-result').innerHTML = former_result;
		return;
	}
	if (b == '=') {
		// 当输入为=,输出结果
		if (result == undefined) {
			result = "";
			document.getElementById("result").innerHTML = result;
		}
		else {
			try {
				result = "" + result;
				var b = result.lastIndexOf('/');
				if (b != -1 && result[b-1] == '/') {
					alert("算数式错误");
					result = "";
					document.getElementById("result").innerHTML = 0;
					return;
				}
				result = eval(result);
				if (result == undefined) {
				result = "";
				document.getElementById("result").innerHTML = result;
				}
				else if (result == Infinity) {
					//排除n/0的情况
					result = "";
					alert('算数式非法');
					document.getElementById("result").innerHTML = 0;
					return;
				}
				else if (isNaN(result)) {
					//排除0/0的情况
					result = "";
					alert("算数式非法");
					document.getElementById("result").innerHTML = 0;
					return;
				}
				else {
					store = 1;  // 表示当前的result是结果
					former_result = result; // 存储输出结果
					var midstore = result + "";  // 利用中间变量来输出结果
					if (midstore.length > 12 || midstore.lastIndexOf('e') != -1) {
						//若输出过长，则转化为科学计数法
						b = result.toExponential(9);
						result = b + "";
						//对输出结果进行处理，解决JS浮点数精度问题
						mid = eval(result) + "";
						h = result.substring(result.lastIndexOf('e')+1, result.length);
						if (h > 10 || h <= -4) {
							// 若输出过大或者过小，则用科学计数法表示
							document.getElementById('result').innerHTML = b;
							former_result = b;
						}
						else if (mid.lastIndexOf('e') != -1) {
							document.getElementById('result').innerHTML = b;
							former_result = b;
						}
						else {
							result = eval(result);
							former_result = result;
							document.getElementById('result').innerHTML = result; 
						}
					}
					else
						document.getElementById("result").innerHTML = result; // 若输出不长，直接输出
				}
			}
			catch (exception) {
			//若用户输入错误算式，则对错误进行处理.
			alert("算数式非法!!");
			result = ""
			document.getElementById("result").innerHTML = 0;

			}
		}
	}
	else if (b == '<-') {
		//删除操作
		result = '' + result;
		result = result.substring(0, result.length - 1);
		document.getElementById("result").innerHTML = result;
		document.getElementById('former-result').innerHTML = former_result;
	}
	else if (document.getElementById('result').innerHTML.length >= 32) {
		//若用户输入数字过大，则显示错误
		alert("数字过大");
		return;
	}
	else {
		if (store == 1) {
			//若当前的显示是结果，则判断下一个输入是数字还是运算符，如果是运算符，则继续操作，如果是数字，则重头开始
			result = "" + result;
			if (result.lastIndexOf('+') != -1 && result.lastIndexOf('-') == -1 && result.lastIndexOf('*') == -1 && result.lastIndexOf('/') == -1
				&& b >= '0' && b <= '9') {
				if (result[result.lastIndexOf('+') - 1] == 'e') {
					result = "" + b;
					store = 0;
					document.getElementById("result").innerHTML = result;
					document.getElementById('former-result').innerHTML = former_result;
					return;
				}
			}
			if (result.lastIndexOf('-') != -1 && result.lastIndexOf('+') == -1 && result.lastIndexOf('*') == -1 && result.lastIndexOf('/') == -1
				&& b >= '0' && b <= '9') {
				if (result[result.lastIndexOf('-') - 1] == 'e') {
					result = "" + b;
					store = 0;
					document.getElementById("result").innerHTML = result;
					document.getElementById('former-result').innerHTML = former_result;
					return;
				}
			}
			if (result.lastIndexOf('+') == -1 && (result.lastIndexOf('-') == -1 || result.lastIndexOf('-') == 0) && result.lastIndexOf('*') == -1 && result.lastIndexOf('/') == -1
				&& ((b >= '0' && b <= '9') || b == '(' || b == ')' || b == '.')) {
				result = "" + b;
				store = 0;
				document.getElementById("result").innerHTML = result;
				document.getElementById('former-result').innerHTML = former_result;
				return;
			}
		}
		// 若当前的显示是输入，则直接将输入加入
		result += b;
		document.getElementById("result").innerHTML = result;
	}
}

//定义onclick事件
window.onload = function() {
	document.getElementById("result").innerHTML = 0;
	document.getElementById('1').onclick = function() {
		getData("1");
	}
	document.getElementById('2').onclick = function() {
		getData("2");
	}
	document.getElementById('3').onclick = function() {
		getData("3");
	}
	document.getElementById('4').onclick = function() {
		getData("4");
	}
	document.getElementById('5').onclick = function() {
		getData("5");
	}
	document.getElementById('6').onclick = function() {
		getData("6");
	}
	document.getElementById('8').onclick = function() {
		getData("8");
	}
	document.getElementById('7').onclick = function() {
		getData("7");
	}
	document.getElementById('9').onclick = function() {
		getData('9');
	}
	document.getElementById('*').onclick = function() {
		getData("*");
	}
	document.getElementById('/').onclick = function() {
		getData("/");
	}
	document.getElementById('.').onclick = function() {
		getData(".");
	}
	document.getElementById('C').onclick = function() {
		getData("CE");
	}
	document.getElementById('(').onclick = function() {
		getData("(");
	}
	document.getElementById(')').onclick = function() {
		getData(")")
	}
	document.getElementById('-').onclick = function() {
		getData("-");
	}
	document.getElementById('+').onclick = function() {
		getData("+");
	}
	document.getElementById('=').onclick = function() {
		getData("=");
	}
	document.getElementById('0').onclick = function() {
		getData("0");
	}
	document.getElementById('<-').onclick = function() {
		getData("<-");
	}
}