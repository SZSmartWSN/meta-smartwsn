(function($) {
	var websocket;
	//判断当前浏览器是否支持WebSocket
	if ('WebSocket' in window) {
		websocket = new WebSocket("ws://192.168.1.131:4567");
	} else {
		layer.alert('当前浏览器 Not support websocket')
	}

	//连接发生错误的回调方法
	websocket.onerror = function() {
		setMessageInnerHTML("WebSocket连接发生错误");
	};

	//连接成功建立的回调方法
	websocket.onopen = function() {
		setMessageInnerHTML("WebSocket连接成功");
	}

	//接收到消息的回调方法
	websocket.onmessage = function(event) {
		$.onmessage(message);
		setMessageInnerHTML(event.data);
	}

	//连接关闭的回调方法
	websocket.onclose = function() {
		setMessageInnerHTML("WebSocket连接关闭");
	}

	//将消息显示在网页上
	function setMessageInnerHTML(innerHTML) {
		console.log("接收：" + innerHTML);
		layer.msg("接收：" + innerHTML);
	}

	//关闭WebSocket连接
	$.onclose = function closeWebSocket() {
		websocket.close();
	}

	//发送消息
	$.send = function send(data) {
		if (this.websocket) {
			console.log(data);
			websocket.send(data);
			return true;
		}
		return false;
	}

	/**
	 * 消息回調
	 * @param {Object} message
	 */
	$.onmessage = function(message) {
	}

})(websocket = {});
