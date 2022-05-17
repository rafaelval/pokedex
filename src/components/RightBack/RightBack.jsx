import React, { useEffect, useState } from 'react'
import styles from './RightBack.module.css'
import psyduck from '../../images/psyduck.png'
import { useSelector } from 'react-redux'
import { convertNum } from '../../utils/getGen'
import RightScreen from '../RightScreen/RigthScreen'

function RightBack({active,varName,more,isMore,gen,type,gener}) {
    const [isGen, setIsGen] = useState('')

    const error=useSelector(state=>state.error)
    const currentPoke = useSelector(state=>state.currentPoke)

    useEffect(()=>{
        convertNum(gen, setIsGen)
    },[gen])
    
    
  return (
    <div className={styles.pokeInfoctn}>
          { error && active ? <div className={styles.errorCtn}>
            <h2>ERROR</h2><p>Pokemon no encontrado, revisa el nombre</p>
          <img src={psyduck} alt="" />
           </div>
             :  
          ((type && active) || (gener && active)) ?
             <div className={styles.pokeInfo}>
               <RightScreen gener={gener} type={type}/>
             </div> :
          (active && currentPoke && varName === '' && !isMore) ?
            <div className={styles.pokeInfo}>
              <div className={styles.name}>
                <h1>{currentPoke.name}</h1>
              </div>
              <div className={styles.infoCont}>
                <div>
                  {currentPoke.stats.map((el,i)=>{
                    return(
                    <p key={i}><span>{el.stat.name}:</span> {el.base_stat}</p>
                    )
                  })}
                </div>
                <h2>{currentPoke.id}</h2>
                <img src={currentPoke.sprites.front_default} alt="" />
              </div>
            </div> :
          (active && currentPoke && varName !== '') ?
            <div className={styles.pokeInfo}>
                <div className={styles.variName}>
                    <h1>{varName}</h1>
                </div>
            </div>:
          (active && currentPoke && isMore) &&
            <div className={styles.pokeInfo}>
              <h2>Tipo:</h2>
                {more.map((el,i)=>{
                  return(
                    <p key={i}><span>{i+1}:</span> {el}</p>
                        )
                })}
                  <p><span>Generación: </span>{isGen}</p>
            </div> 
          } 
    </div>
  )
}

export default RightBack