import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAll, getPokemonByName } from '../../redux/actions'
import styles from './PokemonForm.module.css'

function PokemonForm({active}) {
  const [ pokemon, setPokemon ] = useState('')
  const [names, setNames] =useState([])
  const dispatch=useDispatch()
  const pokeName = useSelector(state=>state.allPokemons)
  

  useEffect(()=>{
    const nameArr = pokeName.map(el=>{
      return (el.name)
    })
    setNames(nameArr)
  },[pokeName])
  
  useEffect(()=>{
    dispatch(getAll())
  },[])

 
  const handleSubmit = event => {
    event.preventDefault()
    dispatch(getPokemonByName(pokemon))
    setPokemon("")
  }
  
  return (
    <form className={styles.pokemon_form} onSubmit={handleSubmit}>
      <input
        className={!active ? styles.pokemon_input_off : 
         styles.pokemon_input_on}
        type="text"
        name="pokemon"
        value={pokemon}
        placeholder="Buscar"
        onChange={e => setPokemon(e.target.value)}
        disabled={!active}/>
      <input type="submit" className={!active ? `${styles.pokemon_btn_off} ${styles.off}` :
    styles.pokemon_btn_on } value="Buscar" disabled={!active}/>
    </form>
  )
}

export default PokemonForm