
let unidade = {
  '0': '',
  '1': 'um', '2': 'dois', '3': 'três', '4': 'quatro', '5': 'cinco', '6': 'seis',
  '7': 'sete', '8': 'oito', '9': 'nove',
  '01': 'um', '02': 'dois', '03': 'três', '04': 'quatro', '05': 'cinco', '06': 'seis',
  '07': 'sete', '08': 'oito', '09': 'nove'
}
let especial = {
  '0': '',
  '10': 'dez', '11': 'onze', '12': 'doze',
  '13': 'treze', '14': 'catorze', '15': 'quinze', '16': 'dezesseis', '17': 'dezessete',
  '18': 'dezoito', '19': 'dezenove'
}

let dezena = {
  '0': '', '1': 'dez',
  '2': 'vinte', '3': 'trinta', '4': 'quarenta', '5': 'cinquenta', '6': 'sessenta',
  '7': 'setenta', '8': 'oitenta', '9': 'noventa'
}

let centena = {
  '0': '',
  '1': 'cento', '2': 'duzentos',
  '3': 'trezentos', '4': 'quatrocentos', '5': 'quinhetos', '6': 'seissentos',
  '7': 'setecentos', '8': 'oitocentos', '9': 'novecentos'
}
let milhar = {
  '0': '',
  '1': 'mil', '2': 'dois mil', '3': 'tres mil', '4': 'quatro mil', '5': 'cinco mil', '6': 'seis mil',
  '7': 'sete mil', '8': 'oito mil', '9': 'nove mil'
}
let max = document.querySelector(".number").addEventListener("input",(e)=>{
  if(e.target.value.length>12){
    p.innerHTML = ' Erro, apenas 9 digitos antes da virgula ';
  }else{
    p.innerHTML = ' Digite o numero acima e converta para extenso! '
  }
})
let p = document.querySelector(".resultado")
let input = document.querySelector(".btn").addEventListener("click", () => {
let valorRecebido = document.querySelector(".number").value;
if(valorRecebido.length > 9 && !valorRecebido.includes('.')){
  p.innerHTML = ' Erro, apenas 9 digitos antes da virgula ';
}else{
let resultado;
//Separação de reais e centavos
let valor1 = valorRecebido.split('.')[0];
let valor = valor1.split('');
let centavos = valorRecebido.split('.')[1];

// Função que retorna centavos
const valorCentavos = (centavos1)=>{
  centavos = centavos1 || '00';
  if(centavos=='00') return '';
  if(centavos<='09'){
    return ' e '+ unidade[centavos] + ' centavos.'
  }else if(centavos<='19'){
    return ' e '+ especial[centavos] + ' centavos.'
  }else if(centavos[0]!='0' && centavos[1]=='0'){
    return ' e '+  dezena[centavos[0]]+ ' centavos';
  }else{
    let centavosSeparado = centavos.split('');
    return  ' e '+ dezena[centavosSeparado[0]]+' e '+ unidade[centavosSeparado[1]]+' centavos';
  } 
}



// Função para calcular entrada menor que 19, entrada de dezena e entradas maior que 20.
const dezenaF = (valor) => {
  let num = valor.length - 2;
  let num1 = valor.length - 1;
  if(valor[valor.num]+valor[valor.num1]=='00') return '';
  if (valor[num] === '0') {
    return unidade[valor[num] + valor[num1]];
  }
  if (valor[num] + valor[num1] < '20') {
    return especial[valor[num] + valor[num1]];
  } else if (parseInt(valor[num1]) == 0) {
    return dezena[valor[num]];
  } else return dezena[valor[num]] + ' e ' + unidade[valor[num1]];
}
// Função para calcular centenas
const centenaF = (valor) => {
  let num = valor.length - 2;
  let num1 = valor.length - 1;
  let num2 = valor.length - 3;
  // Se o valor digitado for 100
  if (valor[num2] + valor[num] + valor[num1] === '100') {
    return "cem reais"
  }else if (valor[num2] + valor[num] + valor[num1] === '000') {
    return ''
  } //else return centena[valor[num2]];

}

//Função para calcular milhar
const milharF = (valor) => {
  let num = valor.length - 1;
  let num1 = valor.length - 2;
  let num2 = valor.length - 3;
  if (valor[num2] + valor[num1] + valor[num] === '000') {
    return milhar[valor[valor.length - 4]] + ' reais';
  }
}

const especialF = (valor) => {
  let num = valor.length - 4;
  let num1 = valor.length - 5;
  if(valor.length>6 && (valor[valor.length-6]+valor[valor.length-5]+valor[valor.length-4])=='000') return '';
  
  if (valor[num1] + valor[num] < '20') {
    if (valor[num1] + valor[num] >= '11')
      return especial[valor[num1] + valor[num]] + ' / mil';
    else
      return unidade[valor[num1] + valor[num]] + ' mil';
  } else if (valor[num] !== '0') {
    return dezena[valor[num1]] + ' e ' + unidade[valor[num]] + ' mil';
  } else return dezena[valor[num1]] + ' mil'

}

const centenasMF = (valor) => {
  
    let num = valor.length - 1, num1 = valor.length - 2, num2 = valor.length - 3, num3 = valor.length - 4, num4 = valor.length - 5; 
  if (valor[num4] + valor[num3] + valor[num2] + valor[num1] + valor[num] === '00000') {
      return centena[valor[valor.length - 6]] + ' mil reais';
    }
  
}

const milhaoF = (valor) => {
  let num = valor.length - 1, num1 = valor.length - 2, num2 = valor.length - 3, num3 = valor.length - 4, num4 = valor.length - 5, num5 = valor.length - 6, num6 = valor.length - 7;
  if(valor.length==9){
  if (valor[valor.length - 9] + valor[valor.length - 8] + valor[valor.length - 7] >= '100') {
    if ((valor[num5] + valor[num4] + valor[num3] + valor[num2] + valor[num1] + valor[num] === '000000')) {
      if (valor[valor.length - 8] + valor[valor.length - 7] === '00') {
        return centena[valor[valor.length - 9]] + ' milhões de reais';
      }
      else if ((valor[valor.length - 8] + valor[valor.length - 7]) >= '10' && (valor[valor.length - 8] + valor[valor.length - 7]) <= '20') {
        return centena[valor[valor.length - 9]] + ' e '+especial[valor[valor.length-8] + valor[valor.length - 7]] + ' milhões de reais';
      }else return centena[valor[valor.length-9]] + ' e '+dezena[valor[valor.length-8]] + ((valor[valor.length-7]=='0')?' milhões':' e '+unidade[valor[valor.length-7]]+ ' milhões de reais');
    }
  }}
  if(valor.length==8){
  if (valor[valor.length - 8] + valor[valor.length - 7] >= '10') {
    if (valor[num5] + valor[num4] + valor[num3] + valor[num2] + valor[num1] + valor[num] === '000000')
      if (((valor[valor.length-8] + valor[valor.length-7])>= '10') && (valor[valor.length-8] + valor[valor.length-7]) <= '20'){
        return especial[valor[valor.length - 8] + valor[valor.length - 7]] + ' milhões';}
      else return dezena[valor[valor.length - 8]] + ' e ' + unidade[valor[valor.length - 7]] + ' milhões de reais';
  }}
  if (valor[num5] + valor[num4] + valor[num3] + valor[num2] + valor[num1] + valor[num] === '000000') {
    if ((valor[valor.length - 7]) === '1') {
      return 'um milhão de reais'
    }
    else return unidade[valor[valor.length - 7]] + ' milhões de reais'
  }
}

const milhao2F = (valor) => {
if(valor.length==7){  
if ((valor[valor.length-7]) >= '1' && ((valor[valor.length-7]) <= '9')) {
    if ((valor[valor.length-7]) === '1') 
    return unidade[valor[valor.length-7]] + ' milhão';
    return unidade[valor[valor.length - 7]] + ' milhões';
}}

if(valor.length==9){
if ((valor[valor.length-9] + valor[valor.length-8] + valor[valor.length-7]) >= '100') {
    if ((valor[valor.length - 8] + valor[valor.length - 7]) >= '10') {
        if ((valor[valor.length - 8] + valor[valor.length - 7]) >= '10' && (valor[valor.length - 8] + valor[valor.length - 7]) <= '20') {
            return centena[valor[valor.length - 9]] + ' e ' + especial[valor[valor.length - 8] + valor[valor.length - 7]] + ' milhões';
         }
      return centena[valor[valor.length - 9]] + ' e ' + dezena[valor[valor.length - 8]] + ' e ' + unidade[valor[valor.length - 7]] + ' milhões';
    }
}}

if ((valor[valor.length - 8] + valor[valor.length - 7]) >= '10') {
      if ((valor[valor.length - 8] + valor[valor.length - 7]) >= '10' && (valor[valor.length - 8] + valor[valor.length - 7]) <= '20'){
        return especial[valor[valor.length - 8] + valor[valor.length - 7]] + ' milhões';
      }
      return dezena[valor[valor.length - 8]] + ' e ' + unidade[valor[valor.length - 7]] + ' milhões';
}


 
}



  switch (valor.length) {
    case 1: resultado = (valor[0]=='0')? '':unidade[valor[0]] + ((parseInt(valorRecebido) === 1) ? ' real' : ' reais'); break;
    
    case 2: resultado = dezenaF(valor)+' reais'; break;
    
    case 3: resultado = (centenaF(valor))? (centenaF(valor)) : centena[valor[valor.length-3]] + ' e ' + dezenaF(valor) + ' reais'; break;
    
    case 4: resultado = milharF(valor) ? milharF(valor) : milhar[valor[valor.length - 4]] + ' ' + ((centenaF(valor))? (centenaF(valor)) : centena[valor[valor.length-3]] + ' e ' + dezenaF(valor)) + ' reais'; break;
    
    case 5: resultado = especialF(valor) + ' ' + ((centenaF(valor))? (centenaF(valor)) : centena[valor[valor.length-3]] + ' e ' + dezenaF(valor)) + ' reais'; break;
   
    case 6: resultado = centenasMF(valor) ? centenasMF(valor) : centena[valor[valor.length - 6]] + ' ' + especialF(valor) + ' ' + ((centenaF(valor))? (centenaF(valor)) : centena[valor[valor.length-3]] + ' e ' + dezenaF(valor)) + ' reais'; break;
    
    case 7: resultado = (milhaoF(valor)) ? milhaoF(valor) : milhao2F(valor) + ' e ' + ((centenasMF(valor)) ? centenasMF(valor) : centena[valor[valor.length - 6]]) + ' ' + especialF(valor) + ' ' + ((centenaF(valor))? (centenaF(valor)) : centena[valor[valor.length-3]] + ' e ' + dezenaF(valor)) + ' reais'; break;
    
    case 8: resultado = (milhaoF(valor)) ? milhaoF(valor) : milhao2F(valor) + ' e ' + ((centenasMF(valor)) ? centenasMF(valor) : centena[valor[valor.length - 6]]) + ' ' + especialF(valor) + ' ' + ((centenaF(valor))? (centenaF(valor)) : centena[valor[valor.length-3]] + ' e ' + dezenaF(valor)) + ' reais'; break;
   
    case 9: resultado = (milhaoF(valor)) ? milhaoF(valor) : milhao2F(valor) + ' e ' + ((centenasMF(valor)) ? centenasMF(valor) : centena[valor[valor.length - 6]]) + ' ' + especialF(valor) + ' ' + ((centenaF(valor))? (centenaF(valor)) : centena[valor[valor.length-3]] + ' e ' + dezenaF(valor)) + ' reais'; break;
  }
  
  //console.log(resultado+valorCentavos(centavos))
  
  p.innerText = resultado +valorCentavos(centavos);
}
})
