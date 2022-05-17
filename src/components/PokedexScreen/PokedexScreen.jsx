import React, { useEffect } from 'react'
import styles from './PokedexScreen.module.css'
import iniciando from '../../images/iniciando.gif'
import errorImg from '../../images/error.gif'

function PokedexScreen({image, setImage, active, currentPoke, error}) {
  
  useEffect(()=>{
    if (active === true && !error){
        setImage(currentPoke.sprites.other["official-artwork"].front_default)
    } else if (active=== false){
      setImage(iniciando)
    }
  },[currentPoke])//eslint-disable-line

  return (
    <div className={!active ? styles.pokedex_screen : styles.pokedex_screen_on}>
      <div className={styles.pokedex_no_screen}>
        <img src={
          !active ? "" :
          error ? errorImg :
          active && image 
          
          } alt="" />
      </div>
    </div>
  )
}

export default PokedexScreen