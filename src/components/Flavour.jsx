import React from 'react'
import FlavourTithe from './FlavourTithe'
import FlavourSlider from './FlavourSlider'

function Flavour() {
  return (
    <div className='flavor-section'>
        <div className='h-full flex lg:flex-row flex-col items-center relative' >
        <div className="lg:w-[57%] flex-none h-80 lg:h-full  md:mt-20 xl:mt-0">
            <FlavourTithe/>
        </div>
        <div className='h-full'>
            <FlavourSlider/>
        </div>
        </div>
    </div>
  )
}

export default Flavour