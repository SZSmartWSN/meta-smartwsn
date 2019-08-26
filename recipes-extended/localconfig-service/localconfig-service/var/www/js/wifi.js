layui.config({
	dir: 'layui/' //layui.js 所在路径（注意，如果是script单独引入layui.js，无需设定该参数。），一般情况下可以无视
		,
	version: false //一般用于更新模块缓存，默认不开启。设为true即让浏览器不缓存。也可以设为一个固定的值，如：201610
		,
	debug: false //用于开启调试模式，默认false，如果设为true，则JS模块的节点会保留在页面
		,
	base: '' //设定扩展的Layui模块的所在目录，一般用于外部模块扩展
});
let layer;
let mode;
let form;
layui.use(['form', 'layer'], function() {
	form = layui.form;
	layer = layui.layer;
	querySSID();
	form.verify({
		HandoverCompany: function(value) {
			if (value.length === 0) {
				return '请输入或选择WIFI SSID';
			}
		},
		password: function(value) {
			var pass = document.getElementById("encryptionSelect");
			if (parseInt(pass.value) !== 1) {
				if (value.length === 0) {
					return '请输入WIFI 密码';
				} else if (value.length < 8) {
					return '请输入至少8位密码';
				}
			}
		},
		Ipv4Ip: function(value) { 
			let mode = document.getElementById("ipSelect");
			if (parseInt(mode.value) === 2) {
				if (value.length === 0) {
					return '请输入Ip地址';
				} else if (!checkIp(value)) {
					return 'Ip地址不合法';
				}
			}
		},
		ipv4Mask: function(value) {
			let mode = document.getElementById("ipSelect");
			if (parseInt(mode.value) === 2) {
				if (value.length === 0) {
					return '请输入子网掩码';
				} else if (!checkMask(value)) {
					return '子网掩码不合法';
				}
			}
		},
		ipv4Gateway: function(value) {
			let mode = document.getElementById("ipSelect");
			if (parseInt(mode.value) === 2) {
				if (value.length === 0) {
					return '请输入默认网关';
				} else if (!checkIp(value)) {
					return '默认网关不合法';
				}
			}
		}
	});

	form.on('select(encryptionSelect)', function(data) {
		var div_password = document.getElementById("passwordDiv");
		if (parseInt(data.value) === 1) {
			div_password.style.display = "none";
		} else {
			div_password.style.display = "inherit";
		}
	});

	form.on('select(hc_select)', function(data) {
		$("#HandoverCompany").val(data.value);
		$("#hc_select").next().find("dl").css({
			"display": "none"
		});
		form.render();
	});

	form.on('select(ipSelect)', function(data) {
		var div_password = document.getElementById("ipv4Div");
		if (parseInt(data.value) === 1) {
			div_password.style.display = "none";
		} else {
			div_password.style.display = "inherit";
		}
	});

	form.on('submit(user-wifi-submit)', function(datas) {
		let data = datas.field;
		let index = layer.msg('配置中...', {
			icon: 16,
			shade: 0.01,
			shadeClose: false,
			time: 20000
		});
		var test = GetUrlRelativePath();
		$.ajax({
			url: test + '/gateway/wifi',
			data: {
				wifiSSID: data.HandoverCompany,
				wifiPassword: data.password == undefined ? "" : data.password,
				encryption: data.encryptionSelect,
				ipMode: data.ipSelect,
				ipAddress: data.Ipv4Ip == undefined ? "" : data.Ipv4Ip,
				ipSubnetmask: data.ipv4Mask == undefined ? "" : data.ipv4Mask,
				ipGateway: data.ipv4Gateway == undefined ? "" : data.ipv4Gateway
			},
			dataType: 'json', //服务器返回json格式数据
			type: 'post', //HTTP请求类型
			timeout: 20000, //超时时间设置为10秒；
			success: function(data) {
				layer.close(index);
				if (data.code == 0) {
					layer.alert("WI-Fi设置成功，退出登录时生效");
				} else {
					layer.alert("WI-Fi设置失败");
				}
			},
			error: function() {
				layer.close(index);
				layer.alert("连接异常");
			}
		});
	});
});



function GetUrlRelativePath() {
	var url = document.location.toString();
	var arrUrl = url.split("//");
	var start = arrUrl[1].split("/");
	return "http://" + start[0];
}

function querySSID() {
	let index = layer.msg('数据同步中...', {
		icon: 16,
		shade: 0.01,
		shadeClose: false,
		time: 10000
	});
	var test = GetUrlRelativePath();
	$.ajax({
		url: test + '/gateway/SSID',
		dataType: 'json', //服务器返回json格式数据
		type: 'post', //HTTP请求类型
		timeout: 10000, //超时时间设置为10秒；
		success: function(data) {
			layer.close(index);
			if (data.code == 0) {
				let list = data.list;
				$("#hc_select").find("option").remove();
				$.each(data.list, function(ind, item) {
					$("#hc_select").append("<option value='" + item.SSID + "'>" + item.SSID + "</option>");
				});
				form.render();
				syncWifi();
			} else {
				layer.alert("同步失败");
			}
		},
		error: function() {
			layer.close(index);
			layer.alert("连接异常");
		}
	});
}

function syncWifi() {
	let index = null;
	index = layer.msg('数据同步中...', {
		icon: 16,
		shade: 0.01,
		shadeClose: false,
		time: 10000
	});
	var test = GetUrlRelativePath();
	$.ajax({
		url: test + '/gateway/syncWifi',
		dataType: 'json', //服务器返回json格式数据
		type: 'post', //HTTP请求类型
		timeout: 10000, //超时时间设置为10秒；
		success: function(data) {
			if (index != null) {
				layer.close(index);
			}
			if (data.code == 0) {
				let wifiSSID = document.getElementById('HandoverCompany');
				wifiSSID.value = data.wifiSSID;
				let passwordDiv = document.getElementById("passwordDiv");
				if (parseInt(data.encryptionMode) !== 1) {
					passwordDiv.style.display = "inherit";
				} else {
					passwordDiv.style.display = "none";
				}
				form.val('form-cloud',{
					"password":data.wifiPassword,
					"encryptionSelect":data.encryptionMode,
					"ipSelect":data.ipMode
				})
				let ipv4 = document.getElementById("ipv4Div");
				if (parseInt(data.ipMode) == 2) {
					ipv4.style.display = "inherit";
					let Ipv4Ip = document.getElementById('Ipv4Ip');
					Ipv4Ip.value = data.ipAddress;
					let ipSubnetmask = document.getElementById('ipv4Mask');
					ipSubnetmask.value = data.ipSubnetmask;
					let ipGateway = document.getElementById('ipv4Gateway');
					ipGateway.value = data.ipGateway;
				} else {
					ipv4.style.display = "none";
				}
				form.render();
			} else {
				layer.alert("同步失败");
			}
		},
		error: function() {
			if (index != null) {
				layer.close(index);
			}
			layer.alert("连接异常");
		}
	});
}

function checkMask(mask) {
	let obj = mask;
	let exp =
		/^(254|252|248|240|224|192|128|0)\.0\.0\.0|255\.(254|252|248|240|224|192|128|0)\.0\.0|255\.255\.(254|252|248|240|224|192|128|0)\.0|255\.255\.255\.(254|252|248|240|224|192|128|0)$/;
	let reg = obj.match(exp);
	return reg != null;
}

function checkIp(ip) {
	let re = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/; //正则表达式
	if (re.test(ip)) {
		if (RegExp.$1 < 256 && RegExp.$2 < 256 && RegExp.$3 < 256 && RegExp.$4 < 256)
			return true;
	} else {
		return false;
	}
}
