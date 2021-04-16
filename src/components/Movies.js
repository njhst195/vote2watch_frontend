import { useState, useEffect } from 'react';
import Button from "./Button"

export const Movies = ({ movieData, movieRoomID, movieTitle }) => {
   const conditionalRender = () => {
       if (!movieTitle) {
           return(<div>
           </div>)
       } else {
        return(<div>
            <h1>Movies Will be mapped here after they are entered</h1>
        </div>)
       }
   }


        return(<div>
            {conditionalRender()}
            </div>)
}
    
    export default Movies