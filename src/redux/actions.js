import axios from 'axios';

const pokemon = process.env.REACT_APP_POKEMON
const pokemonAll = process.env.REACT_APP_POKEMONALL
const url = process.env.REACT_APP_URL

export function getAll(){
    return async function(dispatch){
        try {
            const allPokemon = await axios(`${pokemonAll}/`)
                dispatch({
                    type:"GETALL",
                    payload:allPokemon.data.results
                })
        } catch (error) {
            console.log(error)
            dispatch({
                type:"ERROR",
                payload:true
            })
        }
    }
}

export function setCurrentPoke(id){
    return async function(dispatch){
        try {
            const currentPoke= await axios(`${pokemon}/${id}/`)
                dispatch({
                    type:"CURRENTPOKE",
                    payload:currentPoke.data
                })
        } catch (error) {
            dispatch({
                type:"ERROR",
                payload:true
            })
        }
    }
}

export function getPokemonByName(name){
    return async function (dispatch){
        try {
            const pokeName = await axios(`${pokemon}/${name}/`)
            dispatch({
                type:"POKEMONBYNAME",
                payload:pokeName.data
            })
        } catch (error) {
            console.log(error)
            dispatch({
                type:"ERROR",
                payload:true
            })
        }
    }
}

export async function variant (currentPoke){
        try {
            const url = await axios(currentPoke.species.url)
            if(url.data.varieties.length > 1) {
                const specie =  await axios(url.data.varieties[1].pokemon.url)
                const image = specie.data.sprites.other.home.front_default
                return image
            } return false
            
        } catch (error) {
            console.log(error)  
    }  
  }

  export async function variantName(currentPoke){
      try {
          const url=await axios(currentPoke.species.url)
          if(url.data.varieties.length>1){
              const name = url.data.varieties[1].pokemon.name
              return name
          }
      } catch (error) {
          console.log(error)
      }
  }

  export async function genName(currentPoke){
      try {
          const url= await axios(currentPoke.species.url)
          const gen= url.data.generation.name
          return gen
      } catch (error) {
          console.log(error)
      }
  }

  export function getTypes(){
      return async function(dispatch){
          try {
              const types = await axios(`${url}/type/`)
              let payload = {}
              types.data.results.forEach(async(el)=> {
                const urls = await axios(el.url)
                const arr = urls.data.pokemon
                let pokename = []
                arr.forEach(el => {
                    pokename.push(el.pokemon.name)
                });
                payload = {...payload, [el.name]: pokename}
                const objToArr = Object.keys(payload)
                if(objToArr.length === types.data.results.length) {
                    dispatch({
                        type:"POKETYPES",
                        payload
                    })
                }
                })
            } catch (error) {
                console.log(error)
                dispatch({
                  type:"ERROR",
                  payload:true
                })
            }
        }
    }