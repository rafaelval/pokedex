
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { genName, setCurrentPoke, variant, variantName } from '../../redux/actions'
import PokedexScreen from '../PokedexScreen/PokedexScreen'
import PokemonForm from '../PokemonForm/PokemonForm'
import styles from './Pokedex.module.css'
import iniciando from '../../images/iniciando.gif'
import RightBack from '../RightBack/RightBack'

function Pokedex() {
  const dispatch=useDispatch()

  const [image, setImage]=useState(iniciando)
  const [active,setActive] = useState(false)
  const [isVariant, setIsVariant] = useState(true)
  const [varName, setVarName] = useState('')
  const [more, setMore] = useState([])
  const [isMore, setIsMore] = useState(false)
  const [gen, setGen] = useState('')
  const [type, setType] = useState(false)
  const [gener, setGener] = useState(false)

  useEffect(()=>{
    setIsVariant(true)
    setIsMore(false)
  },[image])


  const currentPoke = useSelector(state=>state.currentPoke)
  const error=useSelector(state=>state.error)
  

  function randomPoke(){
    setImage(iniciando)
    const RandomId = Math.ceil(Math.random() * 806)
    dispatch(setCurrentPoke(RandomId))
    setVarName('')
  }

  function normal(){
    const defImage = currentPoke.sprites.other["official-artwork"].front_default
    setImage(defImage)
    setVarName('')
  }

  async function species (){
    const variants = await variant(currentPoke)
    const varName = await variantName(currentPoke)
    if(variants !== false){
      setImage(variants)
      setVarName(varName)
    } else {
      setIsVariant(false)
    }
  }

 function onOff(){
  if(active === false){
    setActive(true)
    setType(false)
    setGener(false)
    const RandomId = Math.ceil(Math.random() * 806)
    dispatch(setCurrentPoke(RandomId))
  } else {
    setActive(false)
    setImage(iniciando)
  }
}

function handleType(){
  setType(!type)
  setGener(false)
}

function handleGener(){
  setGener(!gener)
  setType(false)
}

async function moreInfo(){
  setIsMore(!isMore)
  const typeList = currentPoke.types.map(el=> el.type.name)
  const genid = await genName(currentPoke)
  setMore(typeList)
  setGen(genid)
}
  return (
    <div className={styles.pokedex}>
      <div className={styles.pokedex_left}>
        <div className={styles.pokedex_left_top}>
          <div className={styles.powerBtn} onClick={()=>onOff()} />
          <div className={!active ? `${styles.small} ${styles.btn_off}`:
            `${styles.small} ${styles.btn_red}`
          }/> 
          <div className={!active ? `${styles.small} ${styles.btn_off}`:
            `${styles.small} ${styles.btn_yellow}`
          } />
          <div className={!active ? `${styles.small} ${styles.btn_off}`:
            `${styles.small} ${styles.btn_green}`} />
          <div className={!active ?  styles.tyny : 
          styles.pilot}/>
        </div>
        <div className={styles.pokedex_screen_container}>
          <PokedexScreen 
            screen={active} 
            image={image} 
            setImage={setImage} 
            active={active} 
            currentPoke={currentPoke} 
            error={error}/>
        </div>
        <div className={styles.pokedex_left_bottom}>
          <div className={styles.pokedex_left_bottom_btns}>
            <div className={!active ? `${styles.medium} ${styles.btn_off}` : 
              `${styles.medium} ${styles.btn_blue}`
            } />
            <div className={!active || !isVariant ? `${styles.large} ${styles.btn_off}` : 
              `${styles.large} ${styles.btn_green}`} onClick={()=>species()}>Variante</div>
            <div className={!active || !isVariant ? `${styles.large} ${styles.btn_off}` : 
              `${styles.large} ${styles.btn_green}`} onClick={()=>normal()}>Normal</div>
            <div className={!active ? `${styles.large} ${styles.btn_off}` : 
              `${styles.large} ${styles.btn_orange}`} onClick={()=>randomPoke()}>Random</div>
          </div>
          <PokemonForm active={active}/>
        </div>
      </div>
      <div className={styles.pokedex_right_front} />
      <div className={styles.pokedex_right_back} >
        <div className={styles.buttons}>
        <div className={!active ? `${styles.large} ${styles.btn_off}` : 
              `${styles.large} ${styles.btn_green}`} onClick={()=>moreInfo()}>Más</div>
        </div>
        <RightBack className={styles.pokeInfoctn} active={active} varName={varName} more={more} isMore={isMore} gen={gen} type={type} gener={gener}/>
        <div className={styles.buttons}>
          <div className={!active ? `${styles.large} ${styles.btn_off}` : 
              `${styles.large} ${styles.btn_green}`} onClick={()=>handleType()}>Tipos</div>
          <div className={!active ? `${styles.large} ${styles.btn_off}` : 
              `${styles.large} ${styles.btn_green}`} onClick={()=>handleGener()}>Generación</div>
        </div>
          
      </div>
    </div>
  )
}

export default Pokedex