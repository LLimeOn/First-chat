IP = dsf
PORT = 62626
PROTOCOL = 'ws' //ws or wss PROTOCOL

const sendBtn = document.querySelector('#tosendb');
const authBtn = document.querySelector('#tosendb_auth');
var pingSnd = new Audio("https://carbon.pp.ua/data/ping.ogg");
pingSnd.volume = 1;
let ustate = 0;
let name = "None";
let u_id = 11111;
let sound_set = false;
let perem = 0;
let send_end = 0;

window.addEventListener('focus', function (event) {
    console.log("focus");
    sound_set = false;
    console.log(sound_set);
});

window.addEventListener('blur', function (event) {
    console.log("blur");
    sound_set = true;
    console.log(sound_set);
});


socket = new WebSocket(PROTOCOL+'://'+IP+':'+PORT);
console.log(socket);

socket.onmessage = function (e) {
    let rc = JSON.parse(e.data);
    console.log(rc);
    switch (rc.type) {
        case "pong":
            console.log("pong!");
            return false;
        case "comp_join":
            reg_bl.hidden = true;
            chat_a.style.display = "block";
            sh_b.hidden = true;
            xmas.remove();
            if (rc.code) {
                p = document.createElement('p');
                p.innerHTML = `code: ${rc.code}`;
                code_room.prepend(p);
            };
            return false;
        case "connection":
            Cookies.set('name', rc.name, { expires: 27 })
            console.log(Cookies.get());
            if (rc.agree_connect == 1){
                st_ty();
                name = rc.name;
                // u_id = rc.u_id;
                ustate = 1;
                send_b.hidden = false;
                // auth_b.hidden = true;
                // reg_bl.hidden = true;
                reg_block_pre.hidden = true;
                join_block_aft.hidden = false;
                // tm_a.hidden = true;
                return false;
            } else {
                console.log("error!");
                return false;
            };
            return false;
        case "message":
            img = rc.img;
            if (sound_set) {
                console.log(sound_set);
                pingSnd.play();
            };
            data = decodeURI(rc.text);
            data = data.replace(/(?:\r\n|\r|\n)/g, '</br>');
            if (data == "") {
                data = "</br>";
            };
            name_m = decodeURI(rc.name);
            p = document.createElement('p');
            // p.innerHTML = `${data}`;
            // p.innerHTML = `<code>${name_m}</code>: <div class="bvgkk">${data}</div>`;
            p.innerHTML = `<img onError="this.src='data/thumb_user.png'" src="${img}" aria-hidden="true" class="avatar-1BDn8e clickable-1bVtEA" alt=" " width="35" height="35" style="border-radius:18px; position: absolute;"><code style="display: inline-flex; padding-left: 44px; margin-bottom: 2px;">${name_m}</code><br><div style="display: inline-flex;padding-left: 44px;color: #cbcbcb; flex-direction: column;">${data}</div>`;
            p.setAttribute("onclick", "this.hidden = true");
            p.setAttribute("style", "position: relative; margin-top: 10px;");
            contm.append(p);
            chatik.scrollBy(0,1000);
            return false;
        case "connection_error":
            reason = rc.response
            var div = `<div class='block_e'><div class='poof'><p class='error_text'>${reason}</p></div></div>`;
            $("#tm_a").append(div);
            setTimeout(function () {
                $('.block_e')[0].remove();
            }, 3000);
            return false;
        case "message_list":
            for (let i = rc.list.length - 1; i >= 0; i--) {
                let ert = rc.list.length - i - 1;
                let listik = rc.list[ert];
                let img = listik.img;
                if (img == "#00FFFF") {
                    img = "data/thumb_user.png"
                };
                let data = decodeURI(listik.message);
                data = data.replace(/(?:\r\n|\r|\n)/g, '</br>');
                console.log(listik);
                p = document.createElement('p');
                p.innerHTML = `<img onError="this.src='data/thumb_user.png'" src="${img}" aria-hidden="true" class="avatar-1BDn8e clickable-1bVtEA" alt=" " width="35" height="35" style="border-radius:18px; position: absolute;"><code style="display: inline-flex; padding-left: 44px; margin-bottom: 2px;">${decodeURI(listik.name)}</code><br><div style="display: inline-flex;padding-left: 44px;color: #cbcbcb; flex-direction: column;">${data}</div>`;
                p.setAttribute("onclick", "this.hidden = true");
                p.setAttribute("style", "position: relative; margin-top: 10px;");
                contm.append(p);
            };
            return false;
        case "exited":
            $("#xmas_container").append("<canvas id='xmas'></canvas>")
            reg_bl.hidden = false;
            chat_a.style.display = "none";
            sh_b.hidden = false;
            code_room.innerHTML = "";
            contm.innerHTML = "<p><code>Конец чата</code></p>";
            return false;
        case "typing":
            name_mm = decodeURI(rc.name);
            switch (rc.text) {
                case "start":
                    var div = `<p style="margin:0; margin-top:2px; display:inline-flex; margin-right: 10px;" class='items_${name_mm}'>${name_mm} печатает..</p>`;
                    $("#tp_bv").append(div);
                    return false;
                case "stop":
                    try {
                        $(`.items_${name_mm}`)[0].remove();
                    }
                    catch {console.log("НЕ УДАЛОСЬ УДАЛИТЬ ТАЙП!"); console.log(name_mm)};
                    return false;
            }
            return false;


    };
    return false;
};

// function ping(){
//     socket.send(JSON.stringify({type: "ping"}));
//     console.log("ping!");
//     return false;
// }

// setInterval(ping, 10000);

// let el = document.getElementById("tosendb");
// el.addEventListener('click', modify, false);

function typing() {
    if (perem > 0) {
        perem = perem - 1;
    } else if (perem < 1) {
        if (send_end == 1){
            send_end = 0;
            socket.send(JSON.stringify({type: "typing", text: "stop", name: name}));
        }
    }
    console.log(perem)
};

// fc

let sclf = 0;

// rlpant.addEventListener("click", function(event) {
//     bki.style.backgroundImage = "url('https://i.imgur.com/d6eO5HC.jpg')"
// });

let vlumebnbxu = 0;

close_uerel.addEventListener("click", function(event) {
    urelka.hidden = true;
    fon_ten.hidden = true;
});

rlpant.addEventListener("click", function(event) {
    urelka.style.top = `${rlpant.style.top}`;
    urelka.hidden = false;
    fon_ten.hidden = false;
});

urelkaincom.addEventListener("click", function(event) {
    if (urelkain.value.startsWith('https://') && urelkain.value.endsWith('.png')) {
        urelka.hidden = true;
        fon_ten.hidden = true;
        socket.send(JSON.stringify({type: "setIMG", img: urelkain.value, name: name}));
    } else {
        erreor_add("Не верный формат ссылки на изображение")
    }
});

rlexitf.addEventListener("click", function(event) {
    Cookies.remove('name');
    location.reload();
});

rlscale.addEventListener("click", function(event) {
    switch (sclf) {
        case 0:
            sclf++;
            anime({
                targets: "#chatik",
                height: 600,
                easing: 'easeInOutExpo',
                duration: 1000
            });
            return false;
        case 1:
            sclf--;
            anime({
                targets: "#chatik",
                height: 300,
                easing: 'easeInOutExpo',
                duration: 1000
            });
            return false;
    };
})

pshcn.style.marginTop = (innerHeight/2 - 150) + "px";

rltorn.addEventListener("click", function(event) {
    window.location.reload()
    // anime({
    //     targets: ".sendtext_r, input, #variant",
    //     translateY: function(el, i) { return anime.random(-200, 200) },
    //     translateX: function(el, i) { return anime.random(-300, 300) },
    //     // direction: 'alternate',
    //     easing: 'easeInOutExpo',
    //     endDelay: 300,
    // });
});

let vlumebn = 0;

rlvolu.addEventListener("click", function(event) {
    if (vlumebn < 1) {
        slider_volu.hidden = false;
        vlumebn = 1;
    } else if (vlumebn > 0) {
        slider_volu.hidden = true;
        vlumebn = 0;
    }
});

slider_volu.addEventListener("change", function(event) {
    console.log(slider_volu.value)
    pingSnd.volume = slider_volu.value;
    pingSnd.play()
});

rlexit.addEventListener("click", function(event) {
    socket.send(JSON.stringify({type: "exit", name: name}));
});

global_join_button.addEventListener("click", function(event) {
    socket.send(JSON.stringify({type: "join", room: "GLOBAL", name: name}));
});

tosendb_auth_db.addEventListener("click", function(event) {
    socket.send(JSON.stringify({type: "create", name: name}));
});

local_create_room.addEventListener("click", function(event) {
    socket.send(JSON.stringify({type: "join", room: join_code_room.value, name: name}));
});

const regex = /[A-Za-z\s]/;
function validate(e) {
  const chars = e.target.value.split('');
  const char = chars.pop();
  if (!regex.test(char)) {
    e.target.value = chars.join('');
    console.log('${char} is not a valid character.');
  }
}
document.querySelector('#area_auth').addEventListener('input', validate);



snd_v.addEventListener("keydown", function(event) {
    
    if (event.key != "Enter") {
        area_auth.value = area_auth.value.replace(/[^A-Za-z]/ig, '');
        if (send_end == 0){
            send_end = 1;
            socket.send(JSON.stringify({type: "typing", text: "start", name: name}));
        };
        perem = 5;
    }
    if (event.key === "Enter" && !event.shiftKey) {
        perem = 1;
        console.log("send! m");
        console.log(snd_v.innerHTML);
        rtm = snd_v.innerHTML;
        mgf = rtm.replaceAll("<div>", "\n").replaceAll("<br>", "\n");
        console.log(mgf);
        data = encodeURI(mgf);
        console.log(data);
        socket.send(JSON.stringify({type: "message", text: data, name: name}));
        let text = $("#snd_v").val();
        let lines = text.split("\n");
        let count = lines.length;
        snd_v.innerHTML = "";
        console.log(count);
        // snd_v.style.height = "15px";
        console.log("----------------------------");
        setTimeout('ider = $("#snd_v").find("div").length; if (ider) {console.log(ider); $("#snd_v div").remove()};', 50);

        // $("#snd_v").remove();
        // div = '<div contenteditable="true" placeholder="Message" class="sendtext" id="snd_v" style="resize: none;"></div>'
        // $("#iente").append(div);
        // $("#snd_v").select();

        return false;
    }
    if (event.key === "Enter" && event.shiftKey) {
        // let brNode = document.createElement('br')

        // let range = window.getSelection().getRangeAt(0);
        // range.deleteContents()
        // range.insertNode(brNode)
        // range.collapse()

        // blankSpace = $('#snd_v').find("br").length; //count blank lines
        // trn = $('#snd_v').find("div").length;
        // console.log(" --- " + blankSpace + " - " + (trn-1))
        // snd_v.style.height = blankSpace*15 + trn*15 + 15 + "px";

        return false;
    }
    if (event.key === "Enter") {
        return false;

        blankSpace = $('#snd_v').find("br").length; //count blank lines
        trn = $('#snd_v').find("div").length;
        console.log(" --- " + blankSpace + " - " + (trn-1))
        snd_v.style.height = blankSpace*15 + (trn-1)*15 + 15 + "px";
        return false;

    }

    return false;
    // blankSpace = $('#snd_v').find("br").length; //count blank lines
    // trn = $('#snd_v').find("div").length;
    // console.log(" --- " + blankSpace + " - " + trn)
    // snd_v.style.height = blankSpace*15 + trn*15 + 15 + "px";
    
    return false;
});

// snd_v.addEventListener('onkeyup', function(e){
//     e = e || event;
//     if (e.keyCode === 13 && !e.ctrlKey) {
//       // start your submit function
//       console.log("enter!")
//     }
//     return true;
// });

let sendtext_f_items = document.getElementsByClassName("target_an");

for (let i = 0; i < sendtext_f_items.length; i++) {
    if (innerWidth > 900) {
        console.log("add");
        sendtext_f_items[i].addEventListener('mouseenter', function (event) {
            console.log("enter!");
            anime({
                targets: sendtext_f_items[i],
                width: '140',
                delay: 200,
                backgroundColor: '#404040'
            })
        });
    };
};

for (let i = 0; i < sendtext_f_items.length; i++) {
    if (innerWidth > 900) {
        console.log("add_remove");
        sendtext_f_items[i].addEventListener('mouseleave', function (event) {
            console.log("leave!");
            anime({
                targets: sendtext_f_items[i],
                width: '200',
                delay: 300,
                backgroundColor: '#323232'
            })
        });
    };
};

tosendb_auth.addEventListener('mouseenter', function (event) {
    if (innerWidth > 900) {
        console.log("enter!");
        anime({
            targets: '#tosendb_auth',
            width: '140px',
            delay: 200,
            backgroundColor: '#7FBE26'
    })} else {};
});

tosendb_auth.addEventListener('mouseleave', function (event) {
    if (innerWidth > 900) {
        console.log("leave!");
        anime({
            targets: '#tosendb_auth',
            width: '200px',
            delay: 300,
            backgroundColor: '#6ea223'
    })} else {};
});

join_code_room.addEventListener('focus', function (event) {
    if (innerWidth > 900) {
        console.log("focus");
        anime({
            targets: '#join_code_room',
            borderRadius: '5px',
            width: '270',

        });
    };
});

join_code_room.addEventListener('blur', function (event) {
    if (innerWidth > 900) {
        console.log("blur");
        anime({
            targets: '#join_code_room',
            width: '200'

        });
    };
});

area_auth.addEventListener('focus', function (event) {
    if (innerWidth > 900) {
        console.log("focus");
        anime({
            targets: '#area_auth',
            borderRadius: '5px',
            width: '270',
    })} else {};
});

area_auth.addEventListener('blur', function (event) {
    if (innerWidth > 900) {
        console.log("blur");
        anime({
            targets: '#area_auth',
            width: '200'

        });
    };
});

area_auth_pass.addEventListener('focus', function (event) {
    if (innerWidth > 900) {
        console.log("focus");
        anime({
            targets: '#area_auth_pass',
            borderRadius: '5px',
            width: '270',

        });
    };
});

area_auth_pass.addEventListener('blur', function (event) {
    if (innerWidth > 900) {
        console.log("blur");
        anime({
            targets: '#area_auth_pass',
            width: '200'

        });
    };
});

// fcn

function st_ty(){
    setInterval(function(){typing()},1000)
};

// INPUT LINE


// sendBtn.addEventListener('click', function (event) {
//     console.log("send! m");
//     data = encodeURI(area.value);
//     area.value = "";
//     socket.send(JSON.stringify({type: "message", text: data, name: name}));
//     return false;
// });

// area.addEventListener("keydown", function(event) {
//     if (event.key != "Enter") {
//         if (send_end == 0){
//             send_end = 1;
//             socket.send(JSON.stringify({type: "typing", text: "start", name: name}));
//         };
//         perem = 5;
//     }
//     if (event.key === "Enter") {
//         perem = 0
//         console.log("send! m");
//         data = encodeURI(area.value);
//         area.value = "";
//         socket.send(JSON.stringify({type: "message", text: data, name: name}));
//         return false;
//     }
// });



// INPUT LINE


authBtn.addEventListener('click', function (event) {
    console.log("send!");
    data = encodeURI(area_auth.value);

    // socket.send(JSON.stringify({type: "auth", ustate: ustate, text: data, name: name}));

    // area_auth_pass = encodeURI(area_auth_pass.value);
    socket.send(JSON.stringify({type: "auth", ustate: ustate, text: data, name: name, pass: area_auth_pass.value, variant: variant.value}));
    return false;
});







socket.onopen = function() {
    var div = `<div class='block_e'><div class='poof'><p class='error_text'>server connected</p></div></div>`;
    $("#tm_a").append(div);
    setTimeout(function () {
        $('.block_e')[0].remove();
    }, 3000);
    console.log("Connected.");
    if (Cookies.get("name")) {
        socket.send(JSON.stringify({type: "auth_cookie", token: Cookies.get("name")}));
    }
    // token = localStorage.getItem('skrepka.battleships.token.login');
    // let token = "1";
    // if (token) {
    //     socket.send(JSON.stringify({type: "authorization", method: "token", token: token}));
    // } else {
    //     blocks[0].classList.remove("hide");
    //     alert_text = "";
    //     state = -2;
    // }
};

socket.onclose = function(event) {
    var div = `<div class='block_e'><div class='poof'><p class='error_text'>close connect</p></div></div>`;
    $("#tm_a").append(div);
    setTimeout(function () {
        $('.block_e')[0].remove();
    }, 3000);
    if (event.wasClean) {
            setTimeout(() => function(){
            try {
            console.log("Reconect..");
            socket = new WebSocket(PROTOCOL+'://'+IP+':'+PORT);
            }
            catch (e) {console.log("Reconected!"); console.log('Code: ' + event.code + ' reason: ' + event.reason)};
        }, 5)
        console.log('Close connection');
        } else {
        console.log('Connection fail');
        alert_text = "Fail to connect to server";
    };
};

function erreor_add(error) {
    var div = `<div class='block_e'><div class='poof'><p class='error_text'>error: ${error}</p></div></div>`;
    $("#tm_a").append(div);
    setTimeout(function () {
        $('.block_e')[0].remove();
    }, 3000);
}

socket.onerror = function(error) {
    var div = `<div class='block_e'><div class='poof'><p class='error_text'>error: ${error.message}</p></div></div>`;
    $("#tm_a").append(div);
    setTimeout(function () {
        $('.block_e')[0].remove();
    }, 3000);
    console.log("Error " + error.message);
  };