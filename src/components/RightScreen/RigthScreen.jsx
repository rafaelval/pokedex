import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTypes } from '../../redux/actions'


function RigthScreen({gener, type}) {
  
const dispatch = useDispatch()
const types = useSelector(state=>state.type)

useEffect(()=>{
  dispatch(getTypes())// eslint-disable-next-line
},[])

  return (
    <div>
      {
        gener ? 
          <div>
            <h1>Por generación</h1>
          </div> :
          type && 
          <div>
            <h1>Por tipo</h1>
            <ul>{ types &&
              Object.keys(types).map((el,i)=>{
                return(
                  <p key={i}>{i +1}. {el}</p> 
                  )
                })
                }
              </ul>
          </div>
      } 
    </div>
  )
}

export default RigthScreen