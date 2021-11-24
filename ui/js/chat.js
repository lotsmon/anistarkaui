const chatmsgs = document.getElementById("chat_messages");
const chatvar = $("#chat");

let chat =
{
	size: 0,
	container: null,
	input: null,
	prevmsg: ["", "", "", "", "", "", "", "", "", ""],
	steplist: 0,
	backlist: 0,
	enabled: false,
	timer: null,
	alpha: 1, 
	active: true
};

function enableChatInput(enable)
{
	if(chat.active == false
		&& enable == true)
		return;
	
    if (enable != (chat.input != null))
	{
        mp.invoke("focus", enable);
        mp.invoke("setTypingInChatState", enable);

        if (enable)
		{
			chatvar.css("opacity", 1);
            chat.input = $("#chat").append('<div><input id="chat_msg" type="text" /></div>').children(":last");
			chat.input.children("input").focus();
        } 
		else
		{
            chat.input.fadeOut('fast', function()
			{
                chat.input.remove();
                chat.input = null;
            });
        }
    }
}

let idx = 0;

var chatAPI =
{
	push: (text) =>
	{
		chat.container.append("<li>" + text + "</li>");

		chat.size++;

		if (chat.size >= 50)
		{
			chat.container.children(":first").remove();
		}
		chat.container.scrollTop(9999);
	},
	
	clear: () =>
	{
		chat.container.html("");
	},
	
	activate: (toggle) =>
	{
		if (toggle == false
			&& (chat.input != null))
			enableChatInput(false);
			
		chat.active = toggle;
	},
	
	show: (toggle) =>
	{
		if (toggle == false
			&& (chat.input != null))
			enableChatInput(false);
			
		if(toggle){
			$("#chat").show();
		}
		else{
			$("#chat").hide();
		}
		
		chat.active = toggle;
	}
};

if(mp.events)
{
	let api = {"chat:push": chatAPI.push, "chat:clear": chatAPI.clear, "chat:activate": chatAPI.activate, "chat:show": chatAPI.show}; 

	for(let fn in api)
	{
		mp.events.add(fn, api[fn]);
	}
}

function hide() {
	if(chat.alpha == 1) {
		if(chat.timer != null) clearTimeout(chat.timer);
		chat.timer = setTimeout(function () {
			document.getElementById('chat').style.opacity = 0.5;
		}, 3000);
	}
}
function show() {
	if(chat.timer != null) {
		clearTimeout(chat.timer);
		chat.timer = null;
	}
    document.getElementById('chat').style.opacity = 1;
}

function savehistory(value) {
    if (chat.steplist < 9) {
        chat.prevmsg[chat.steplist] = value;
        chat.steplist++;
    } else {
        for (let i = 0; i != 9; i++) {
            chat.prevmsg[i] = chat.prevmsg[(i + 1)];
        }
        chat.prevmsg[chat.steplist] = value;
    }
}

var lastMessage = 0;

$(document).ready(function()
{
	chat.container = $("#chat ul#chat_messages");
	
    $(".ui_element").show();

	chatAPI.push("Добро пожаловать на сервер.");
	
    $("body").keydown(function(event)
	{
        if (event.which == 84 && chat.input == null && chat.active == true)
		{
            enableChatInput(true);
            event.preventDefault();
			show();
			chat.backlist = chat.steplist;
        } 
		else if (event.which == 13 && chat.input != null)
		{
            let value = chat.input.children("input").val();

            if (value.length > 0 && new Date().getTime() - lastMessage > 1000)
			{
				savehistory(value);
                lastMessage = new Date().getTime();
                if (value[0] == "/")
				{
                    value = value.substr(1);

                    if (value.length > 0)
                        mp.invoke("command", value);
                }
				else
				{
                    mp.invoke("chatMessage", value);
                }
            }

            enableChatInput(false);
			hide();
        }else if (event.which == 27 && chat.input != null) {
            enableChatInput(false);
            hide();
		}else if (event.which == 38 && chat.input != null) { // Листание вверх
            if(chat.steplist < 9) {
				if(chat.backlist >= 1) chat.backlist--;
				chat.input.children("input").val(chat.prevmsg[chat.backlist]);
			} else {
				chat.input.children("input").val(chat.prevmsg[chat.backlist]);
				if(chat.backlist >= 1) chat.backlist--;
			}
        } else if (event.which == 40 && chat.input != null) { // Листание вниз
            if (chat.backlist < chat.steplist) chat.backlist++;
            chat.input.children("input").val(chat.prevmsg[chat.backlist]);
        }
    });
});