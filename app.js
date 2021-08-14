"use strict"

//variables donde se guardan los tiempos de resultado (en segundos)
let TL = document.querySelector("#TL");
let TV = document.querySelector("#TV");
let TML = document.querySelector("#TML");

let TLI = document.querySelector("#TLI");
let TVI = document.querySelector("#TVI");
let TMLI = document.querySelector("#TMLI");

document.querySelector("#btn_1").addEventListener("click", function(){
    event.preventDefault();
    media();
    lleno();
});
//Main donde se hace toda la simulación
function media(){

    //obtener los inputs actualizados
    let deltaT = Number(document.querySelector("#tiempo").value);
    let A = Number(document.querySelector("#area").value);
    let C = Number(document.querySelector("#altura_tanque").value);
    let H = Number(document.querySelector("#altura_agua").value);
    let E = Number(document.querySelector("#entrada").value);
    let S = Number(document.querySelector("#salida").value);

    let ITERACIONES_MAXIMAS = 1000000*deltaT;
    let i = 0; //cuenta el número de iteraciones de la simulación
    let h = H; //la altura inicial es H.
    console.log("h(" + i + ") = " + h + " (inicio de mitad)");

    

    if (h != C/2 && h < C/2){
        if( E == S){
            TML.innerHTML = "EL VOLUMEN DE AGUA NUNCA SE MODIFICA"; //guardamos el tiempo que tardó en llenarse por la mitad
            TMLI.innerHTML = "INFINITAS";
            return false;
        }
        //EMPEZAMOS LA SIMULACIÓN
        while(h < C/2 && i < ITERACIONES_MAXIMAS && h >= 0 && h <= C){  //hasta que el tanque se llene por la mitad
            i++; //aumento las iteraciones
            h = h + (E - S)*deltaT/A;
            if( i < 50)
                console.log("h(" + i + ") = " + h + "(mitad)");
        }

        if(i == ITERACIONES_MAXIMAS){
            alert("Los valores implican demasiadas iteraciones para llegar a la mitad del tanque.");
            TML.innerHTML = -1;
            TL.innerHTML = -1;
            TV.innerHTML = -1;
            return false;
        }

        if (h >= 0 && h >= C/2 ){
            TML.innerHTML = i*deltaT; //guardamos el tiempo que tardó en llenarse por la mitad
            TMLI.innerHTML = i;
        }else{
            if (h <= 0){
                TML.innerHTML = "NUNCA LLEGA A LA MITAD"; 
                TMLI.innerHTML = i;
            }
        }
    }else{
        if (h > C/2){
            TML.innerHTML = "COMIENZA CON MÁS DE LA MITAD"; 
            TMLI.innerHTML = i; 
        }else{
            switch (h) {
                case C/2:
                    TML.innerHTML = "YA COMIENZA EN LA MITAD"; 
                    TMLI.innerHTML = i;
                break;
                default:
                console.log('default');
            } 
        }
        

    }
}

function lleno(){

    //obtener los inputs actualizados
    let deltaT = Number(document.querySelector("#tiempo").value);
    let A = Number(document.querySelector("#area").value);
    let C = Number(document.querySelector("#altura_tanque").value);
    let H = Number(document.querySelector("#altura_agua").value);
    let E = Number(document.querySelector("#entrada").value);
    let S = Number(document.querySelector("#salida").value);
    
    let ITERACIONES_MAXIMAS = 1000000*deltaT;
    let i = 0; //cuenta el número de iteraciones de la simulación
    let h = H; //la altura inicial es H.
    console.log("h(" + i + ") = " + h +" (inicio de llenado)");

    if( h == C ){
        TL.innerHTML = "YA COMIENZA LLENO"; 
        TLI.innerHTML = i;
        if( E == S){
            TV.innerHTML = "EL VOLUMEN DE AGUA NUNCA SE MODIFICA"; 
            TVI.innerHTML = "INFINITAS";
            return false;
        }
        vaciado();
    }else{
        if( E == S){
            TL.innerHTML = "EL VOLUMEN DE AGUA NUNCA SE MODIFICA"; 
            TLI.innerHTML = "INFINITAS";
            TV.innerHTML = "EL VOLUMEN DE AGUA NUNCA SE MODIFICA"; 
            TVI.innerHTML = "INFINITAS";
            return false;
        }

        while(h < C && i < ITERACIONES_MAXIMAS && h >= 0 && h <= C){ //hasta que el tanque se llene por completo
                i++;
                h = h + (E - S)*deltaT/A;
                if( i < 100)
                console.log("h(" + i + ") = " + h + "(llenado)");
        }

        if(i == ITERACIONES_MAXIMAS){
            alert("Los valores implican demaciadas iteraciones para llenarse y vaciarse.");
            TL.innerHTML = -1;
            TV.innerHTML = -1;
            return false;
        }

        if (h > 0 ){
            TL.innerHTML = i*deltaT; //guardamos el tiempo que tardó en llenarse por completo
            TLI.innerHTML = i;
            vaciado();
        }else{
            if (h <= 0){
                TL.innerHTML = "NUNCA LLEGA A LLENARSE"; 
                TLI.innerHTML = i;

                //reiniciamos el tiempo para ver cuánto tarda en vaciarse
                h = H;
                i = 0;
                //E = 0; //la entrada de agua tiene que ser cero
                console.log("h(" + i + ") = " + h + " (inicio de vaciado)");

                while(h > 0 && i < ITERACIONES_MAXIMAS && h <= C ){
                    i++;
                    h = h + (E - S)*deltaT/A;
                    if( i < 100)
                    console.log("h(" + i + ") = " + h + "(vaciado)");
                }

                if(i == ITERACIONES_MAXIMAS){
                    alert("Los valores implican demaciadas iteraciones para vaciarse.");
                    TL.innerHTML = -1;
                    TV.innerHTML = -1;
                    return false;
                }

                if (h <= 0 && h!= C){
                    TV.innerHTML = i*deltaT;
                    TVI.innerHTML = i;  
                }else{
                    TV.innerHTML = "NUNCA SE VACIA";
                    TVI.innerHTML = i;
                }
                return true;
            }
        }
    }

    function vaciado(){
        //reiniciamos el tiempo para ver cuánto tarda en vaciarse
        h = C;
        //i = 0;
        E = 0; //la entrada de agua tiene que ser cero
        console.log("h(" + i + ") = " + h +" (inicio vaciado)");

        while(h > 0 && i < ITERACIONES_MAXIMAS && h <= C ){
            i++;
            h = h + (E - S)*deltaT/A;
            if( i < 100)
            console.log("h(" + i + ") = " + h + "(vaciado)");
        }

        if(i == ITERACIONES_MAXIMAS){
            alert("Los valores implican demaciadas iteraciones para vaciarse.");
            TL.innerHTML = -1;
            TV.innerHTML = -1;
            return false;
        }

        if (h <= 0 && h!= C){
            TV.innerHTML = i*deltaT;
            TVI.innerHTML = i;  
        }else{
            TV.innerHTML = "NUNCA SE VACIA";
            TVI.innerHTML = i;
        }
        return true;

    }

}

document.querySelector("#btn_2").addEventListener("click", function(){
    event.preventDefault();
    media2();
    lleno2();
});

function media2(){

    //obtener los inputs actualizados
    let deltaT = Number(document.querySelector("#tiempo").value);
    let A = Number(document.querySelector("#area").value);
    let C = Number(document.querySelector("#altura_tanque").value);
    let H = Number(document.querySelector("#altura_agua").value);
    let E = Number(document.querySelector("#entrada").value);
    let K = Number(document.querySelector("#K").value);

    let ITERACIONES_MAXIMAS = 1000000*deltaT;
    let i = 0; //cuenta el número de iteraciones de la simulación
    let h = H; //la altura inicial es H.
    console.log("h(" + i + ") = " + h + "(inicio mitad)");

    if (h != C/2 && h < C/2){
        //EMPEZAMOS LA SIMULACIÓN
        while(h < C/2 && i < ITERACIONES_MAXIMAS && h >= 0 && h <= C){  //hasta que el tanque se llene por la mitad
            i++; //aumento las iteraciones
            h = h + (E - K*i*deltaT)*deltaT/A;
            if( i < 50)
                console.log("h(" + i + ") = " + h + "(mitad)");
        }

        if(i == ITERACIONES_MAXIMAS){
            alert("Los valores implican demaciadas iteraciones.")
            TML.innerHTML = -1;
            TL.innerHTML = -1;
            TV.innerHTML = -1;
            return false;
        }

        if (h >= 0 && h >= C/2 ){
            TML.innerHTML = i*deltaT; //guardamos el tiempo que tardó en llenarse por la mitad
            TMLI.innerHTML = i;
        }else{
            if (h <= 0){
                TML.innerHTML = "NUNCA LLEGA A LA MITAD"; 
                TMLI.innerHTML = i;
            }
        }
    }else{
        if (h > C/2){
            TML.innerHTML = "COMIENZA CON MÁS DE LA MITAD"; 
            TMLI.innerHTML = i; 
        }else{
            switch (h) {
                case C/2:
                    TML.innerHTML = "YA COMIENZA EN LA MITAD"; 
                    TMLI.innerHTML = i;
                break;
                default:
                console.log('default');
            } 
        }
    }
}

function lleno2(){

    //obtener los inputs actualizados
    let deltaT = Number(document.querySelector("#tiempo").value);
    let A = Number(document.querySelector("#area").value);
    let C = Number(document.querySelector("#altura_tanque").value);
    let H = Number(document.querySelector("#altura_agua").value);
    let E = Number(document.querySelector("#entrada").value);
    let K = Number(document.querySelector("#K").value);

    let ITERACIONES_MAXIMAS = 1000000*deltaT;
    let i = 0; //cuenta el número de iteraciones de la simulación
    let h = H; //la altura inicial es H.
    console.log("h(" + i + ") = " + h +" (inicio de llenado)");

    if( h == C ){
        TL.innerHTML = "YA COMIENZA LLENO"; 
        TLI.innerHTML = i;
        vaciado();
    }else{
        while(h < C && i < ITERACIONES_MAXIMAS && h >= 0 && h <= C){ //hasta que el tanque se llene por completo
            i++;
            h = h + (E - K*i*deltaT)*deltaT/A;
            if( i < 100)
            console.log("h(" + i + ") = " + h + "(llenado)");
        }

        if(i == ITERACIONES_MAXIMAS){
            alert("Los valores implican demaciadas iteraciones.")
            TL.innerHTML = -1;
            TV.innerHTML = -1;
            return false;
        }

        if (h > 0 ){
            TL.innerHTML = i*deltaT; //guardamos el tiempo que tardó en llenarse por completo
            TLI.innerHTML = i;
            vaciado();
        }else{
            if (h <= 0){
                TL.innerHTML = "NUNCA LLEGA A LLENARSE"; 
                TLI.innerHTML = i;

                //reiniciamos el tiempo para ver cuánto tarda en vaciarse
                h = H;
                i = 0;
                //E = 0; //la entrada de agua tiene que ser cero
                console.log("h(" + i + ") = " + h + "(inicio de vaciado)");

                while(h > 0 && i < ITERACIONES_MAXIMAS && h <= C ){
                    i++;
                    h = h + (E - K*i*deltaT)*deltaT/A;
                    if( i < 100)
                    console.log("h(" + i + ") = " + h + "(vaciado)");
                }

                if(i == ITERACIONES_MAXIMAS){
                    TL.innerHTML = -1;
                    TV.innerHTML = -1;
                    return false;
                }

                if (h <= 0 && h!= C){
                    TV.innerHTML = i*deltaT;
                    TVI.innerHTML = i;  
                }else{
                    TV.innerHTML = "NUNCA SE VACIA";
                    TVI.innerHTML = i;
                }
                return true;
            }
        }
    }

    function vaciado(){
        //reiniciamos el tiempo para ver cuánto tarda en vaciarse
        h = C;
        //i = 0;
        E = 0; //la entrada de agua tiene que ser cero
        console.log("h(" + i + ") = " + h + "(inicio de vaciado)");

        while(h > 0 && i < ITERACIONES_MAXIMAS && h <= C ){
            i++;
            h = h + (E - K*i*deltaT)*deltaT/A;
            if( i < 100)
            console.log("h(" + i + ") = " + h + "(vaciado)");
        }

        if(i == ITERACIONES_MAXIMAS){
            TL.innerHTML = -1;
            TV.innerHTML = -1;
            return false;
        }

        if (h <= 0 && h!= C){
            TV.innerHTML = i*deltaT;
            TVI.innerHTML = i;  
        }else{
            TV.innerHTML = "NUNCA SE VACIA";
            TVI.innerHTML = i;
        }
        return true;
    }

}

document.querySelector("#btn_3").addEventListener("click", function(){
    event.preventDefault();
    media3();
    lleno3();
});

function media3(){

    //obtener los inputs actualizados
    let deltaT = Number(document.querySelector("#tiempo").value);
    let A = Number(document.querySelector("#area").value);
    let C = Number(document.querySelector("#altura_tanque").value);
    let H = Number(document.querySelector("#altura_agua").value);
    let E = Number(document.querySelector("#entrada").value);
    let W = Number(document.querySelector("#W").value);

    let ITERACIONES_MAXIMAS = 1000000*deltaT;
    let i = 0; //cuenta el número de iteraciones de la simulación
    let h = H; //la altura inicial es H.
    console.log("h(" + i + ") = " + h +" (inicio de mitad)");

    if (h != C/2 && h < C/2){
        //EMPEZAMOS LA SIMULACIÓN
        while(h < C/2 && i < ITERACIONES_MAXIMAS && h >= 0 && h <= C){  //hasta que el tanque se llene por la mitad
            i++; //aumento las iteraciones
            h = h + (E - W*(i*deltaT*i*deltaT))*deltaT/A;
            if( i < 50)
                console.log("h(" + i + ") = " + h + "(mitad)");
        }

        if(i == ITERACIONES_MAXIMAS){
            alert("Los valores implican demaciadas iteraciones.")
            TML.innerHTML = -1;
            TL.innerHTML = -1;
            TV.innerHTML = -1;
            TMLI.innerHTML = -1;
            TLI.innerHTML = -1;
            TVI.innerHTML = -1;
            return false;
        }

        if (h >= 0 && h >= C/2 ){
            TML.innerHTML = i*deltaT; //guardamos el tiempo que tardó en llenarse por la mitad
            TMLI.innerHTML = i;
        }else{
            if (h <= 0){
                TML.innerHTML = "NUNCA LLEGA A LA MITAD"; 
                TMLI.innerHTML = i;
            }
        }

    }else{
        if (h > C/2){
            TML.innerHTML = "COMIENZA CON MÁS DE LA MITAD"; 
            TMLI.innerHTML = i; 
        }else{
            switch (h) {
                case C/2:
                    TML.innerHTML = "YA COMIENZA EN LA MITAD"; 
                    TMLI.innerHTML = i;
                break;
                default:
                    console.log('default');
            } 
        }

    }
}

function lleno3(){

    //obtener los inputs actualizados
    let deltaT = Number(document.querySelector("#tiempo").value);
    let A = Number(document.querySelector("#area").value);
    let C = Number(document.querySelector("#altura_tanque").value);
    let H = Number(document.querySelector("#altura_agua").value);
    let E = Number(document.querySelector("#entrada").value);
    let W = Number(document.querySelector("#W").value);

    
    
    let ITERACIONES_MAXIMAS = 1000000*deltaT;
    let i = 0; //cuenta el número de iteraciones de la simulación
    let h = H; //la altura inicial es H.
    console.log("h(" + i + ") = " + h );

    

    if( h == C ){
        TL.innerHTML = "YA COMIENZA LLENO"; 
        TLI.innerHTML = i;
        vaciado();
    }else{
        while(h < C && i < ITERACIONES_MAXIMAS && h >= 0 && h <= C){ //hasta que el tanque se llene por completo
            i++;
            h = h + (E - W*(i*deltaT*i*deltaT))*deltaT/A;
            if( i < 100)
            console.log("h(" + i + ") = " + h + "(llenado)");
        }

        if(i == ITERACIONES_MAXIMAS){
            alert("Los valores implican demaciadas iteraciones.")
            TL.innerHTML = -1;
            TV.innerHTML = -1;
            TLI.innerHTML = -1;
            TVI.innerHTML = -1;
            return false;
        }

        if (h > 0 ){
            TL.innerHTML = i*deltaT; //guardamos el tiempo que tardó en llenarse por completo
            TLI.innerHTML = i;
            vaciado();
        }else{
            if (h <= 0){
                TL.innerHTML = "NUNCA LLEGA A LLENARSE"; 
                TLI.innerHTML = i;

                //reiniciamos el tiempo para ver cuánto tarda en vaciarse
                h = H;
                i = 0;
                //E = 0; //la entrada de agua tiene que ser cero
                console.log("h(" + i + ") = " + h + "(inicio de vaciado)");

                while(h > 0 && i < ITERACIONES_MAXIMAS && h <= C ){
                    i++;
                    h = h + (E - W*(i*deltaT*i*deltaT))*deltaT/A;
                    if( i < 100)
                    console.log("h(" + i + ") = " + h + "(vaciado)");
                }

                if(i == ITERACIONES_MAXIMAS){
                    TL.innerHTML = -1;
                    TV.innerHTML = -1;
                    return false;
                }

                if (h <= 0 && h!= C){
                    TV.innerHTML = i*deltaT;
                    TVI.innerHTML = i;  
                }else{
                    TV.innerHTML = "NUNCA SE VACIA";
                    TVI.innerHTML = i;
                }
                return true;
            }
        }
    }

    function vaciado(){
        //reiniciamos el tiempo para ver cuánto tarda en vaciarse
        h = C;
        //i = 0;
        E = 0; //la entrada de agua tiene que ser cero
        console.log("h(" + i + ") = " + h + "(inicio de vaciado)");

        while(h > 0 && i < ITERACIONES_MAXIMAS && h <= C ){
            i++;
            h = h + (E - W*(i*deltaT*i*deltaT))*deltaT/A;
            if( i < 100)
            console.log("h(" + i + ") = " + h + "(vaciado)");
        }

        if(i == ITERACIONES_MAXIMAS){
            TL.innerHTML = -1;
            TV.innerHTML = -1;
            return false;
        }

        if (h <= 0 && h!= C){
            TV.innerHTML = i*deltaT;
            TVI.innerHTML = i;  
        }else{
            TV.innerHTML = "NUNCA SE VACIA";
            TVI.innerHTML = i;
        }
        return true;
    }
}

document.querySelector("#btn_4").addEventListener("click", function(){
    event.preventDefault();
    media4();
    lleno4();
});

function media4(){

    //obtener los inputs actualizados
    let deltaT = Number(document.querySelector("#tiempo").value);
    let A = Number(document.querySelector("#area").value);
    let C = Number(document.querySelector("#altura_tanque").value);
    let H = Number(document.querySelector("#altura_agua").value);
    let E = Number(document.querySelector("#entrada").value);
    let G = Number(document.querySelector("#G").value);

    let ITERACIONES_MAXIMAS = 1000000;
    let i = 0; //cuenta el número de iteraciones de la simulación
    let h = H; //la altura inicial es H.
    console.log("h(" + i + ") = " + h + " (inicion de mitad)");

    if (h != C/2 && h < C/2){
        //EMPEZAMOS LA SIMULACIÓN
        while(h < C/2 && i < ITERACIONES_MAXIMAS && h >= 0 && h <= C){  //hasta que el tanque se llene por la mitad
            i++; //aumento las iteraciones
            h = h + (E - G/A*h)*deltaT/A;
            if( i < 50)
                console.log("h(" + i + ") = " + h + "(mitad)");
        }

        if(i == ITERACIONES_MAXIMAS){
            alert("Los valores implican demaciadas iteraciones.")
            TML.innerHTML = -1;
            TL.innerHTML = -1;
            TV.innerHTML = -1;
            TMLI.innerHTML = -1;
            TLI.innerHTML = -1;
            TVI.innerHTML = -1;
            return false;
        }

        if (h >= 0 && h >= C/2 ){
            TML.innerHTML = i*deltaT; //guardamos el tiempo que tardó en llenarse por la mitad
            TMLI.innerHTML = i;
        }else{
            if (h <= 0){
                TML.innerHTML = "NUNCA LLEGA A LA MITAD"; 
                TMLI.innerHTML = i;
            }
        }

    }else{
        if (h > C/2){
            TML.innerHTML = "COMIENZA CON MÁS DE LA MITAD"; 
            TMLI.innerHTML = i; 
        }else{
            switch (h) {
                case C/2:
                    TML.innerHTML = "YA COMIENZA EN LA MITAD"; 
                    TMLI.innerHTML = i;
                break;
                default:
                    console.log('default');
            } 
        }

    }
}

function lleno4(){

    //obtener los inputs actualizados
    let deltaT = Number(document.querySelector("#tiempo").value);
    let A = Number(document.querySelector("#area").value);
    let C = Number(document.querySelector("#altura_tanque").value);
    let H = Number(document.querySelector("#altura_agua").value);
    let E = Number(document.querySelector("#entrada").value);
    let G = Number(document.querySelector("#G").value);
    
    let ITERACIONES_MAXIMAS = 100000;
    let i = 0; //cuenta el número de iteraciones de la simulación
    let h = H; //la altura inicial es H.
    console.log("h(" + i + ") = " + h +" (inicio de llenado)");

    if( h == C ){
        TL.innerHTML = "YA COMIENZA LLENO"; 
        TLI.innerHTML = i;
        vaciado();
    }else{
        while(h < C && i < ITERACIONES_MAXIMAS && h >= 0 && h <= C){ //hasta que el tanque se llene por completo
        i++;
        h = h + (E - G/A*h)*deltaT/A;
        if( i < 100000)
        console.log("h(" + i + ") = " + h + "(llenado)");
        }

        if(i == ITERACIONES_MAXIMAS){
            alert("Los valores implican demaciadas iteraciones para llenarse.")
            TL.innerHTML = -1;
            TV.innerHTML = -1;
            TLI.innerHTML = -1;
            TVI.innerHTML = -1;
            return false;
        }

        if (h > 0 ){
            TL.innerHTML = i*deltaT; //guardamos el tiempo que tardó en llenarse por completo
            TLI.innerHTML = i;
            vaciado();
        }else{
            if (h <= 0){
                TL.innerHTML = "NUNCA LLEGA A LLENARSE"; 
                TLI.innerHTML = i;

                //reiniciamos el tiempo para ver cuánto tarda en vaciarse
                h = H;
                i = 0;
                //E = 0; //la entrada de agua tiene que ser cero
                console.log("h(" + i + ") = " + h + "(inicio de vaciado)");

                while(h > Math.pow(10,-9) && i < ITERACIONES_MAXIMAS && h <= C ){
                    i++;
                    h = h + (E - G/A*h)*deltaT/A;
                    if( i < 1000000)
                    console.log("h(" + i + ") = " + h + "(vaciado)");
                }

                if(i == ITERACIONES_MAXIMAS){
                    TL.innerHTML = -1;
                    TV.innerHTML = -1;
                    return false;
                }

                if (h <= 0 && h!= C && h < 0.1){
                    TV.innerHTML = i*deltaT;
                    TVI.innerHTML = i;  
                }else{
                    TV.innerHTML = i*deltaT;
                    TVI.innerHTML = i;
                }
                return true;
            }
        }
    }

    function vaciado(){
        //reiniciamos el tiempo para ver cuánto tarda en vaciarse
        h = C;
        //i = 0;
        E = 0; //la entrada de agua tiene que ser cero
        console.log("h(" + i + ") = " + h + "(inicio de vaciado)");

        while(h > Math.pow(10,-9) && i < ITERACIONES_MAXIMAS && h <= C ){
            i++;
            h = h + (E - G/A*h)*deltaT/A;
            if( i < 100)
            console.log("h(" + i + ") = " + h + "(vaciado)");
        }

        if(i == ITERACIONES_MAXIMAS){
            alert("Los valores implican demaciadas iteraciones para llenarse.")
            TL.innerHTML = -1;
            TV.innerHTML = -1;
            return false;
        }

        if (h <= 0 && h!= C){
            TV.innerHTML = i*deltaT;
            TVI.innerHTML = i;  
        }else{
            TV.innerHTML = i*deltaT;
            TVI.innerHTML = i;
        }
        return true;
    }
}