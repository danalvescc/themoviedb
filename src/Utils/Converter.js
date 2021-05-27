export function ConverterData(data){
    if(data){
        const arr = data.split('-')
        return arr[2] + '/' + arr[1] + '/' + arr[0]
    }else
        return undefined
}

export function ConverterHora(hora){
    if(hora)
        return `${parseInt(hora/60)}h ${hora%60}min`
}

export function ConverterMoeda(valor){
    if(valor)
        return valor.toLocaleString('en-US',{style: 'currency', currency: 'USD'})
}