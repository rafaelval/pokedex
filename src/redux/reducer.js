const initialState={
    allPokemons:[],
    error:false,
    currentPoke:null,
    type:null
}


function reducer (state=initialState, actions){
    switch (actions.type) {
        case "GETALL":
            return({...state, allPokemons:actions.payload})
        case "ERROR":
            return({...state, error:actions.payload})
        case "CURRENTPOKE":
            return({...state, currentPoke:actions.payload, error:false})
        case "POKEMONBYNAME":
            return({...state, currentPoke:actions.payload, error:false})
        case "POKETYPES":
            return({...state, type:actions.payload, error:false})
        default:
            return state
    }
}

export default reducer