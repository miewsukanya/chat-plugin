function scriptPlugin(img, url, type, botid) {
  var div_chatbot = document.createElement('div')
  document.getElementsByTagName('body')[0].appendChild(div_chatbot)
  var imgminchat = `${img}`
  var link = `${process.env.VUE_APP_API_PLUGIN}/loading-page`
  var link_popup = `${process.env.VUE_APP_API_PLUGIN}/message-popup/${botid}`

  // Message received from child
  window.addEventListener('message', function(event) {
    // set width, height iframe
    document.getElementById("messagePopUp").style.height = event.data.height + "px"
    document.getElementById("messagePopUp").style.width = event.data.width + "px"
  });

  // ขนาดของหน้าจอสามารถปรับเช็คตามความเหมาะสมได้
  if (screen.width >= 700) {
    // chat plugin ขนาดสำหรับใช้บนเว็บ
    div_chatbot.outerHTML = "<div id='botChat' style='border-radius: 10px;position: absolute;margin-top: 0px; margin-right: 0px; margin-bottom: 0px; padding: 0px; border: 0px; background: transparent; overflow: hidden; position: fixed; z-index: 16000004; right: 30px; bottom: 30px;display: none; width: 535px; height: 520px; box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 3px 2px;'><div id='botTitleBar' style='z-index: 16000005; height: 25px; width: 535px; position:fixed; cursor: pointer; border-top-left-radius: 10px; border-top-right-radius: 10px;'> <img id='botCloseplugin' src='https://chat-plugin.one.th/web-admin/img/icon_close.png' style='float: right;margin-top: 10px;color:white;margin-right: 10px; width: 20px;'/></div><iframe id='iframechatbot' frameborder='0' style='background-color: white; vertical-align: text-bottom; position: relative; width: 100%; height: 100%; min-width: 100%; min-height: 100%; max-width: 100%; max-height: 100%; margin: 0px; overflow: hidden; display: block;' src='" + link + "'></iframe></div><div id='minBotChat' style='border-radius: 10px;margin-top: 0px; margin-right: 0px; margin-bottom: 0px; padding: 0px; border: 0px; background: transparent;position: fixed; z-index: 16000002; width: 90px; height: 90px; right: 10px; bottom: 15px;'><div id='minBotChatTitle' style='z-index: 16000003;height: 90px; width: 90px; position:fixed; cursor: pointer;'></div><img src='" + imgminchat + "' style='width: 70px;height: 70px;border-radius: 6px;'/></div><iframe id='messagePopUp' style='position: fixed !important; right: 30px !important; bottom: 120px !important; background: transparent; box-shadow: 2px 3px 11px 1px rgba(0, 0, 0, .2) !important; display: block; display: block; border: none; max-width: 400px; border-radius: 17px; height: 0px;' width='100%' frameborder='0' scrolling='no' src='" + link_popup + "'></iframe>"
  } else {
    // chat plugin ขนาดสำหรับใช้บนมือถือ
    div_chatbot.outerHTML = "<div id='botChat' style='border-radius: 10px;position: absolute;margin-top: 0px; margin-right: 0px; margin-bottom: 0px; padding: 0px; border: 0px; background: transparent; overflow: hidden; position: fixed; z-index: 16000004; right: 0px; bottom: 0px;display: none; width: 100vw; height: 80vh; box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 3px 2px;'><div id='botTitleBar' style='z-index: 16000005; height: 25px; width: 100vw; position:fixed; cursor: pointer; border-top-left-radius: 10px; border-top-right-radius: 10px;'> <img id='botCloseplugin' src='https://chat-plugin.one.th/web-admin/img/icon_close.png' style='float: right;margin-top: 10px;color:white;margin-right: 10px; width: 20px;'/></div><iframe id='iframechatbot' frameborder='0' style='background-color: white; vertical-align: text-bottom; position: relative; width: 100%; height: 100%; min-width: 100%; min-height: 100%; max-width: 100%; max-height: 100%; margin: 0px; overflow: hidden; display: block;' src='" + link + "'></iframe></div><div id='minBotChat' style='border-radius: 10px;margin-top: 0px; margin-right: 0px; margin-bottom: 0px; padding: 0px; border: 0px; background: transparent;position: fixed; z-index: 16000002; width: 70px; height: 70px; right: 0px; bottom: 10px;'><div id='minBotChatTitle' style='z-index: 16000003;height: 70px; width: 70px; position:fixed; cursor: pointer;'></div><img src='" + imgminchat + "' style='width: 60px; height: 60px;border-radius: 6px;'/></div><iframe id='messagePopUp' style='position: fixed !important; right: 30px !important; bottom: 120px !important; background: transparent; box-shadow: 2px 3px 11px 1px rgba(0, 0, 0, .2) !important; display: block; display: block; border: none; max-width: 400px; border-radius: 17px; height: 0px;' width='100%' frameborder='0' scrolling='no' src='" + link_popup + "'></iframe>"
  }

  document.querySelector('body').addEventListener('click', function(e) {
    e.target.matches = e.target.matches || e.target.msMatchesSelector
    if (e.target.matches('#botCloseplugin')) {
      link = `${process.env.VUE_APP_API_PLUGIN}/loading-page`
      document.getElementById("iframechatbot").src = link
      document.getElementById("botChat").style.display = "none"
      document.getElementById("minBotChat").style.display = "block"
      document.getElementById("messagePopUp").style.display = "block"
    } else if (e.target.matches('#minBotChatTitle')) {
      link = `${url}`
      document.getElementById("iframechatbot").src = link
      document.getElementById("botChat").style.display = "block"
      document.getElementById("minBotChat").style.display = "none"
      document.getElementById("messagePopUp").style.display = "none"
    }
  })
  dragElement(document.getElementById("botChat"));

  function dragElement(elmnt) {
    var pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;
    if (document.getElementById("botTitleBar")) {
      /* if present, the header is where you move the DIV from:*/
      document.getElementById("botTitleBar").onmousedown = dragMouseDown;
    } else {
      /* otherwise, move the DIV from anywhere inside the DIV:*/
      elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
      /* stop moving when mouse button is released:*/
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }
}

export default {
  scriptPlugin
}
