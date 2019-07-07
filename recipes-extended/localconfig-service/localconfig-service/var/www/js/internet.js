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

	init();

	//自定义验证规则
	form.verify({
		cloudSet: function(value) {
			if (value.length === 0) {
				return '请输入云平台地址';
			}
		},
		HandoverCompany: function(value) {
			if (value.length === 0) {
				return '请输入或选择WIFI SSID';
			}
		},
		password: function(value) {
			var pass=document.getElementById('encryptionSelect');
			if(pass.value !== '1'){
				if (value.length === 0) {
					return '请输入WIFI 密码';
				}else if(value.length <8){
					return '请8位密码';
				}
			}
		}
	});

	form.on('submit(user-cloud-submit)', function(datas) {
		let data = datas.field;
		let index = layer.msg('配置中...', {
			icon: 16,
			shade: 0.01,
			shadeClose: false,
			time: 10000
		});
		var test = GetUrlRelativePath();
		$.ajax({
			url: test + '/gateway/gatewayCloud',
			data: {
				cloudAddress: data.cloudSet
			},
			dataType: 'json', //服务器返回json格式数据
			type: 'post', //HTTP请求类型
			timeout: 10000, //超时时间设置为10秒；
			success: function(data) {
				layer.close(index);
				if (data.code == 0) {
					layer.msg("云服务配置成功");
				} else {
					layer.alert("云服务配置失败");
				}
			},
			error: function() {
				layer.close(index);
				layer.alert("连接异常");
			}
		});

	});
	
	form.on('submit(user-wifi-submit)', function(datas) {
		let data = datas.field;
		let index = layer.msg('配置中...', {
			icon: 16,
			shade: 0.01,
			shadeClose: false,
			time: 10000
		});
		var test = GetUrlRelativePath();
		$.ajax({
			url: test + '/gateway/wifi',
			data: {
				wifiSSID: data.HandoverCompany,
				wifiPassword: data.password == undefined ?"" : data.password,
				encryption:data.encryptionSelect
			},
			dataType: 'json', //服务器返回json格式数据
			type: 'post', //HTTP请求类型
			timeout: 10000, //超时时间设置为10秒；
			success: function(data) {
				layer.close(index);
				if (data.code == 0) {
					layer.msg("WI-FI配置成功");
				} else {
					layer.alert("WI-FI配置失败");
				}
			},
			error: function() {
				layer.close(index);
				layer.alert("连接异常");
			}
		});
	});
	
	form.on('select(encryptionSelect)', function (data) {
		var div_password=document.getElementById("passwordDiv");
        if(data.value === "1"){
			  div_password.style.display = "none";
		}else{
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

	window.search = function() {
		var value = $("#HandoverCompany").val();
		$("#hc_select").val(value);
		form.render();
		$("#hc_select").next().find("dl").css({
			"display": "block"
		});
		var dl = $("#hc_select").next().find("dl").children();
		var j = -1;
		for (var i = 0; i < dl.length; i++) {
			if (dl[i].innerHTML.indexOf(value) <= -1) {
				dl[i].style.display = "none";
				j++;
			}
			if (j == dl.length - 1) {
				$("#hc_select").next().find("dl").css({
					"display": "none"
				});
			}
		}

	}

	function init() {
		mode = sessionStorage.getItem("mode");
		let divMode = document.getElementById('div-wifi');
		if (parseInt(mode) == 2) {
			querySSID();
			divMode.style.display = "inherit";
		} else {
			syncConfiguration(0);
		}
	}


});

function GetUrlRelativePath() {
	var url = document.location.toString();
	var arrUrl = url.split("//");
	var start = arrUrl[1].split("/");
	return "http://" + start[0];
}


function syncConfiguration(type) {
	let index = null;
	if (type == 0) {
		index = layer.msg('数据同步中...', {
			icon: 16,
			shade: 0.01,
			shadeClose: false,
			time: 10000
		});
	}
	var test = GetUrlRelativePath();
	$.ajax({
		url: test + '/gateway/syncConfiguration',
		dataType: 'json', //服务器返回json格式数据
		type: 'post', //HTTP请求类型
		timeout: 10000, //超时时间设置为10秒；
		success: function(data) {
			if (index != null) {
				layer.close(index);
			}
			if (data.code == 0) {
				let gatewayCloud = document.getElementById('cloudSet');
				gatewayCloud.value = data.gatewayCloud;
				if (parseInt(mode) == 2) {
					let gatewayCloud = document.getElementById('cloudSet');
					gatewayCloud.value = data.gatewayCloud;
					let wifiSSID = document.getElementById('HandoverCompany');
					wifiSSID.value = data.wifiSSID;
					let wifiPassword = document.getElementById('password');
					wifiPassword.value = data.wifiPassword;
				}
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
			if (data.code == 0) {
				let list = data.list;
				$("#hc_select").find("option").remove();
				$.each(data.list,function(ind,item){
					 $("#hc_select").append("<option value='" + item.SSID + "'>" + item.SSID + "</option>");
				});
				 form.render();
				syncConfiguration(1);
				layer.close(index);
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
