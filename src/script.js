function verificaInputs(classePartida){
    let inputs = document.getElementsByClassName(classePartida);
        
        if(inputs[0].value != '' && inputs[1].value != ''){
            inputs[0].style.border = "2px solid black";
            inputs[1].style.border = "2px solid black";
            coleta();
        }

}
const nomes = ['Brasil', 'Camarões', 'Suíça', 'Sérvia']
let times = ['bra', 'cam', 'sui', 'ser'];
var pt = null;
var sg = null;
const coleta = () => {
    pt = [0,0,0,0];
    sg = [0,0,0,0];
    let golsTime1 = 0;
    let golsTime2 = 0;
    //pontuacao
    for(let k = 1; k <= 6; k++){
        let partida = document.getElementsByClassName(`p${k}`)
        golsTime1 = parseInt(partida[0].value, 10);
        golsTime2 = parseInt(partida[1].value, 10);
    
        if(golsTime1 == golsTime2 && golsTime1 != 0){//empate
            for(let j = 0; j < 4; j++){
                if(partida[0].id == j){
                    pt[j] += 1;
                    break;
                }
            }
            for(let j = 0; j < 4; j++){
                if(partida[1].id == j){
                    pt[j] += 1;
                    break;
                }
            }
        }else if(golsTime1 > golsTime2){
            for(let j = 0; j < 4; j++){
                if(partida[0].id == j){
                    pt[j] += 3;
                    break;
                }
            }
            
        }else if(golsTime1 < golsTime2){
            for(let j = 0; j < 4; j++){
                if(partida[1].id == j){
                    pt[j] += 3;
                    break;
                }
            }
        }
        //saldo de gols
        for(let j = 0; j < 4; j++){
            if(partida[0].id == j){
                sg[j] += golsTime1;
                break;
            }
        }
        for(let j = 0; j < 4; j++){
            if(partida[1].id == j){
                sg[j] += golsTime2;
                break;
            }
        }
    }
    setConfPadrao();
    atualizaTab();
}
const atualizaTab = () => {
    let tabBody = document.getElementById('tabelaPartidas').children;
    for(let i = 0; i < 4; i++){
        tabBody[i].children[2].innerHTML = pt[i];
        tabBody[i].children[3].innerHTML = sg[i];
    };
    
    ordenaTabelaPts();
}

const setConfPadrao = () => {
    let tabBody = document.getElementById('tabelaPartidas').children;
    for(let i = 0; i < 4; i++){
        tabBody[i].children[0].innerHTML = i + 1;
        tabBody[i].children[1].innerHTML = nomes[i];
        tabBody[i].children[2].innerHTML = 0;
        tabBody[i].children[3].innerHTML = 0;
    };
}
function ordenaTabelaPts() {
    
    let tabela, rows, troca, i, x, y, necessarioTroca;
    tabela = document.getElementById("tabelaPartidas");
    troca = true;
    while (troca) {
        troca = false;
        rows = tabela.rows;
        for (i = 0; i < (rows.length - 1); i++) {
            necessarioTroca = false;
            x = parseInt(rows[i].getElementsByTagName("td")[2].innerHTML, 10);
            y = parseInt(rows[i + 1].getElementsByTagName("td")[2].innerHTML, 10);
            if (x < y) {
                necessarioTroca = true;
                break;
            }
        }
        if (necessarioTroca) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            troca = true;
        }
    }
    ordenaTabelaSGDesempate();
}
function ordenaTabelaSGDesempate() {
    
    let tabela, rows, troca, i, x, y, necessarioTroca;
    tabela = document.getElementById("tabelaPartidas");
    troca = true;
    while (troca) {
        troca = false;
        rows = tabela.rows;
        for (i = 0; i < (rows.length - 1); i++) {
            necessarioTroca = false;
            x = parseInt(rows[i].getElementsByTagName("td")[2].innerHTML, 10);
            y = parseInt(rows[i + 1].getElementsByTagName("td")[2].innerHTML, 10);
            if (x == y) {
                x = parseInt(rows[i].getElementsByTagName("td")[3].innerHTML, 10);
                y = parseInt(rows[i + 1].getElementsByTagName("td")[3].innerHTML, 10);
                if (x < y) {
                    necessarioTroca = true;
                    break;
                }
            }
        }
        if (necessarioTroca) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            troca = true;
        }
    }
    ajustaColocacao();
}
const ajustaColocacao = () => {
    let tabBody = document.getElementById('tabelaPartidas').children;
    for(let i = 0; i < 4; i++){
        tabBody[i].children[0].innerHTML = i + 1;
        tabBody[i].children[1].id = `t${i}`;
    };
}