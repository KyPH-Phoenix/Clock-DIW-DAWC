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

    document.getElementById("clock").innerHTML = `${h}:${m}:${s}`;
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