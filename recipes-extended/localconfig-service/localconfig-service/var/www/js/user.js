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
		userName: function(value) {
			if (value.length === 0) {
				return '请输入用户名';
			}
		},
		rawPassword: function(value) {
			if (value.length === 0) {
				return '请输入原密码';
			} else if (value.length < 6) {
				return '请输入至少6位原密码';
			}
		},
		newPassword: function(value) {
			if (value.length === 0) {
				return '请输入新密码';
			} else if (value.length < 6) {
				return '请输入至少6位新密码';
			}
		},
		confirmPassword: function(value) {
			if (value.length === 0) {
				return '请输入重复密码';
			} else {
				var newPassword = document.getElementById("newPassword").value;
				if (newPassword !== value) {
					return '重复密码与新密码不一致';
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
			url: test + '/gateway/user',
			data: {
				userName: data.userName,
				rawPassword: data.rawPassword,
				newPassword: data.newPassword
			},
			dataType: 'json', //服务器返回json格式数据
			type: 'post', //HTTP请求类型
			timeout: 10000, //超时时间设置为10秒；
			success: function(data) {
				layer.close(index);
				if (data.code == 0) {
					layer.msg("账号设置成功");
				} else if (data.code == 1) {
					layer.alert("原密码错误");
				} else {
					layer.alert("账号设置失败");
				}
			},
			error: function() {
				layer.close(index);
				layer.alert("连接异常");
			}
		});

	});

	function init() {
		mode = sessionStorage.getItem("userName");
		document.getElementById("userName").value = mode;
	}

});

function GetUrlRelativePath() {
	var url = document.location.toString();
	var arrUrl = url.split("//");
	var start = arrUrl[1].split("/");
	return "http://" + start[0];
}
