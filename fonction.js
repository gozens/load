
export default async function fec(url) {
    const headers = {Accept : 'application/json'}
    const r = await fetch(url,{headers})
    if (r.ok){
        return r.json()
    }
    
}

export function couleurs(){
    const x = Math.round(Math.random()*254)
    const y = Math.round(Math.random()*254)
    const z = Math.round(Math.random()*254)
    const opp = [0.5,0.6,0.7,0.8,0.9,1]
    const op = Math.round(Math.random()*5)
    const color = 'rgba('+x+','+y+","+z+','+opp[op]+")"
    return color
}