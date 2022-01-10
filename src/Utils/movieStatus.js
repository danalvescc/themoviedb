export default function movieStatus(status){
    switch(status){
        case 'Released':
            return 'Liberados'
        case 'Rumored':
            return 'Rumores'
        case 'Planned':
            return 'Planejado'
        case 'In Production':
            return 'Em Produção'
        case 'Post Production':
            return 'Pós-produção'
        case 'Canceled':
            return 'Cancelado'
        default:
            return ''
    }
};