/**
 * @copyright Microsoft Corporation. All rights reserved.
 */

 import * as React from 'react';

 export default function useInterval(callback, delay) {
   const savedCallback = React.useRef();
 
   React.useEffect(() => {
     savedCallback.current = callback;
   }, [callback]);
 
   React.useEffect(() => {
     function tick() {
       savedCallback.current();
     }
     if (delay) {
       const id = setInterval(tick, delay);
       return () => clearInterval(id);
     }
   }, [delay]);
 }
 