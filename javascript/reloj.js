// Clock
function reloj() {
    let timeInterval = setInterval(showNow, 1000);
}

function showNow() {
    let now = new Date();

    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();

    h = addZeros(h);
    m = addZeros(m);
    s = addZeros(s);

    document.getElementById("hora").innerHTML = `${h}:${m}:${s}`;

    checkAlarms();
}

function addZeros(n) {
    if (n < 10) { n = `0${n}` }

    return n;
}

function timer() {
    segundos++;

    if (segundos == 60) {
        minutos++;
        segundos = 0;
    }

    let imprimirMinutos = minutos;
    let imprimirSegundos = segundos;

    if (minutos < 10) {imprimirMinutos = "0" + minutos;}
    if (segundos < 10) {imprimirSegundos = "0" + segundos;}

    document.getElementById("timer").innerHTML = imprimirMinutos + ":" + imprimirSegundos;
}

// Alarms
function newAlarm() {
    let alarms = localStorage.alarms;
    if (alarms == null) alarms = [];
    else alarms = JSON.parse(localStorage.alarms);

    let time = document.getElementById("newAlarm").value;

    if (time == "") return;

    let alarm = createAlarm(time);

    alarms[alarms.length] = alarm;
    localStorage.setItem("alarms", JSON.stringify(alarms));
    getAlarms();
}

function createAlarm(time) {
    time = time.split(":");

    let h = time[0];
    let m = time[1];
    let s = time[2];

    let alarm = {
        hours: h,
        minutes: m,
        seconds: s,
        on: true
    }

    return alarm;
}

function getAlarms() {
    let alarms = localStorage.alarms;
    if (alarms == null) return;
    alarms = JSON.parse(localStorage.alarms);

    let result = "";

    for (let i = 0; i < alarms.length; i++) {
        result += `<tr><td>Alarma ${i + 1}</td>`
        result += `<td id="alarma${i}">${alarms[i].hours}:${alarms[i].minutes}:${alarms[i].seconds}</td>`

        result += `<td><button onclick="onOff(${i})">`;
        if (alarms[i].on) {
            result += "Apaga"
        } else {
            result += "Encen"
        }
        result += "</button></td>"

        result += `<td><button onclick="deleteAlarm(${i})">Esborrar</button></td>`;

        result += `<td id="edita${i}"><button onclick="edita(${i})">Edita</button></td></tr>`;
    }

    document.getElementById("alarmes").innerHTML = result;
    
    let timeInterval = setInterval(checkAlarms, 1000);
}

function onOff(nAlarm) {
    let alarms = JSON.parse(localStorage.alarms);

    alarms[nAlarm].on = !alarms[nAlarm].on;

    localStorage.alarms = JSON.stringify(alarms);

    getAlarms();
}

function deleteAlarm(nAlarm) {
    let alarms = JSON.parse(localStorage.alarms);

    alarms.splice(nAlarm, 1);

    localStorage.alarms = JSON.stringify(alarms)

    getAlarms()
}

function edita(idAlarma) {
    document.getElementById(`alarma${idAlarma}`).innerHTML = `<input type="time" name="edited${idAlarma}" id="edited${idAlarma}" step="2">`;
    document.getElementById(`edita${idAlarma}`).innerHTML = `<button onclick="guarda(${idAlarma})">Guarda</button>`;
}

function guarda(idAlarma) {
    let time = document.getElementById(`edited${idAlarma}`).value;

    if (time == "") return;

    let alarm = createAlarm(time);
    let alarms = JSON.parse(localStorage.alarms);

    alarms[idAlarma] = alarm;

    localStorage.alarms = JSON.stringify(alarms);

    getAlarms();
}

function checkAlarms() {
    let alarms = JSON.parse(localStorage.alarms);

    let now = new Date();

    let h = now.getHours;
    let m = now.getMinutes;
    let s = now.getSeconds;

    for (let i = 0; i < alarms.length; i++) {
        let alarm = alarms[i];

        if (!alarm.on) continue;

        if (alarm.hours == h && alarm.minutes == m && alarm.seconds == s) {
            triggerAlarm(alarm);
        }
    }
}

function triggerAlarm(alarm) {
    let n = 0;

    let timeInterval = setInterval(function(){
        document.getElementById("triggered").innerHTML = `Sonant alarma de les ${alarm.hours}:${alarm.minutes}:${alarm.seconds}`;
        n++;
    }, 500)

    if (n == 10) clearInterval(timeInterval);
}

// Cronometro
let cronoInterval = 0;

function startCrono() {
    cronoInterval = setInterval(runCrono, 0)
}

function runCrono() {
    let crono = getCrono();

    let hours = Number(crono.hours);
    let minutes = Number(crono.minutes);
    let seconds = Number(crono.seconds);
    let mili = Number(crono.mili);

    mili++;

    if (mili == 1000) {
        mili = 0;
        seconds++;
        if (seconds == 60) {
            seconds = 0;
            minutes++;
        } if (minutes == 60) {
            minutes = 0;
            hours++
        }
    }

    crono = {
        mili: mili,
        seconds: seconds,
        minutes: minutes,
        hours: hours
    }

    localStorage.crono = JSON.stringify(crono);
    printCrono(crono);
}

function getCrono() {
    let crono = localStorage.crono;

    if (crono == null) {
        crono = {
            mili: 0,
            seconds: 0,
            minutes: 0,
            hours: 0
        }

        localStorage.crono = JSON.stringify(crono);
    } else {
        crono = JSON.parse(crono);
    }
    
    printCrono(crono);

    return crono;
}

function printCrono(crono) {
    document.getElementById("cronoItem").innerHTML = `${crono.hours}:${crono.minutes}:${crono.seconds}:${crono.mili}`
}