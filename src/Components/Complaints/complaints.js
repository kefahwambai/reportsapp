import React from "react";
import Intervention from "./interventions";
import Redflags from "./redflags";


function Complaints({ user,setUser }){
    
    return(
        <>
        <Redflags  user={user} setUser={setUser}  />
        <Intervention  user={user} setUser={setUser}  />
        </>        

    )
}

export default Complaints;