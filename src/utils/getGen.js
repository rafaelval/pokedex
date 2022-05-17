export function convertNum(gen,setIsGen){
    const num = gen.split('-')[1]
    switch (num) {
        case 'i':
            setIsGen('1')
            break;
        case 'ii':
            setIsGen('2')
            break;
        case 'iii':
            setIsGen('3')
            break;
        case 'iv':
            setIsGen('4')
            break;
        case 'v':
            setIsGen('5')
            break;
        case 'vi':
            setIsGen('6')
            break;
        case 'vii':
            setIsGen('7')
            break;
        case 'viii':
            setIsGen('8')
            break;
        default:
            break;
    }
}