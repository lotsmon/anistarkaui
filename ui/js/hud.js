var HUD = new Vue({
    el: '.inGameHud',
    data:{
        show: true,
        ammo: 0,
        maxammo: 100,
        amall: 0,
        money: "0",
        bank: '1 000 000',
        mic: false,
        time: "00:00",
        date: "00.00.00",
        street: "codechoic3s",
        crossingRoad: "org",
		playerId : -1,
        online: 0,
        inVeh: false,
		belt: false,
        engine: false,
        light: false,
        doors: false,
        speed: 0,
        showhelps: true,
        fuel: 0,
    },
    methods:{
        updateEatSide(eatval, waterval){
            var ui = { 
                eat: {
                    elem: document.getElementById('eat-bar'),
                    icon: {
                        elem: [ document.getElementById('et-ico') ],
                        color: '#FCF3F9'
                    },
                    value: eatval,
                    prc: null,
                    pct: null,
                    color: '#20BE5F'
                },
                water: {
                    elem: document.getElementById('water-bar'),
                    icon: {
                        elem: [ document.getElementById('wt-ico'), document.getElementById('wtf-ico') ],
                        color: '#FCF3F9'
                    },
                    value: waterval,
                    prc: null,
                    pct: null,
                    color: '#57E1FF'
                }
            }
            
            var r = ui.eat.elem.getAttribute('r');
            var c = Math.PI*(r*2);
            
            ui.eat.prc = (ui.eat.value * 100) / 100;
            if(ui.eat.prc > 100) ui.eat.prc = 100;
            ui.eat.pct = (((100-ui.eat.prc)/100)*c);
            
            ui.water.prc = (ui.water.value * 100) / 100;
            if(ui.water.prc > 100) ui.water.prc = 100;
            ui.water.pct = (((100-ui.water.prc)/100)*c);

            if(ui.eat.prc <= 20){
                ui.eat.color = '#CA1D1D';
                ui.eat.icon.color = '#CA1D1D';
            }
            if(ui.water.prc <= 20){
                ui.water.color = '#CA1D1D';
                ui.water.icon.color = '#CA1D1D';
            }  

            ui.eat.elem.style.stroke = ui.eat.color;
            ui.water.elem.style.stroke = ui.water.color;

            ui.water.icon.elem[0].style.fill = ui.water.icon.color;
            ui.water.icon.elem[1].style.stroke = ui.water.icon.color;
            ui.eat.icon.elem[0].style.fill = ui.eat.icon.color;

            ui.water.elem.setAttribute('stroke-dashoffset', ui.water.pct)
            ui.eat.elem.setAttribute('stroke-dashoffset', ui.eat.pct);
        },
        notify(text, type = 1){
            var box = document.getElementById('nf-msgs');
            var LI = box.getElementsByTagName('li');
            if(type == 1){
                box.innerHTML += `<li><div class="inner-nf"><img src="./icon/ic_sharp-done.svg" width="28" height="28" class="nf-ico"/><div class="nf-text">${text}</div></div></li>`;
                setTimeout(()=>{
                    if(LI.length > 0)
                    LI[0].parentNode.removeChild(LI[0]);
                },4000);
            }
            else if(type == 2){
                box.innerHTML += `<li><div class="inner-nf"><img src="./icon/attention.svg" width="28" height="28" class="nf-ico"/><div class="nf-text">${text}</div></div></li>`;
                setTimeout(()=>{
                    if(LI.length > 0)
                    LI[0].parentNode.removeChild(LI[0]);
                },3050);
            }
            else if(type ==3){
                box.innerHTML += `<li style="padding-left: 0px;"><div class="inner-nf"><div class="nf-text">${text}</div></div></li>`;
                setTimeout(()=>{
                    if(LI.length > 0)
                    LI[0].parentNode.removeChild(LI[0]);
                },3050);
            }
            setTimeout(()=>{
                if(LI.length > 0)
                LI[0].style.opacity = 0;
            },3000);
            if(LI.length > 8){
                LI[0].parentNode.removeChild(LI[0]);
            }
        },
        addHelpBt(key, text){
            var box = document.getElementById('helpbt');
            box.innerHTML += `<li class="h-bt1"><div id="h-box">${key}</div><h1 class="h-text">${text}</h1></li>`;
        },
        setTime(tme, dte){
            this.time = tme;
            this.date = dte;
        }, 
        updateSpeed(currentspeed, maxspeed = 200){
            var i = document.getElementById('bar');

            var r = i.getAttribute('r');
            var c = Math.PI*(r*2);
            var prc = (currentspeed * 100) / (maxspeed+80);
            if(prc > 100) prc = 100;
            var pct = (((100-prc)/100)*c)/1.378+c/3.645;
            if(prc < 1) i.style.opacity = 0;
            else i.style.opacity = 1;
            i.setAttribute('stroke-dashoffset', pct);
            var txt = document.getElementById('speed-t');
            var t = "";
            if(currentspeed < 10){
                t = '00';
            }
            if(currentspeed >= 10 && currentspeed < 100){
                t = '0';
            } 

            var fspeed = currentspeed.toFixed();
            txt.textContent = fspeed;
            speed = fspeed;
            txt.setAttribute('speed-before', t);
        },
        updateFuel(fuel, max = 100){
            var i = document.getElementById('fuel-box');
            var ico = document.getElementById('fuel-icoid');
            var d = (fuel*70/max);
            var prc = fuel*100/max;
            var cl = '#20BE5F';
            var clic = 'url(#paint0_linear_661_7181)';
            if(prc <= 20){
                cl = '#CA1D1D';
                clic = cl;
            }
            else if(prc <= 50){
                cl = '#FEB241';
            }
            ico.style.fill = clic;
            i.style.background = cl;
            i.style.width = `${d}px`
        },
        updateAmmo(am, max){
            ammo = am;
            maxammo = max;
            if(max > 0){
                var item = document.getElementById('bi-box-1');
                var item1 = document.getElementById('ammo-b');
                item.style.width = '432px';
                setTimeout(()=>{ item1.style.opacity = 1; }, 100) 
            }
            else{
                var item = document.getElementById('bi-box-1');
                var item1 = document.getElementById('ammo-b');
                item1.style.opacity = 0;
                setTimeout(()=>{ item.style.width = '287px'; }, 100) 
            }
            var item2 = document.getElementById('q-ammo');
            item2.textContent = `${ammo}/${maxammo}`
        }
    }
})

function rgb2hex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}