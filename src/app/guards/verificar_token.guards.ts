import { inject } from "@angular/core";
import { Router } from "@angular/router";

export const verificar_token=()=>{
    const router=inject(Router);
    if (localStorage.getItem("access_token")) {
        return true;
    }else{
        router.navigate(['/login'])
        return false;
    }
    
}

export const seccion_activa=()=>{
    
    if (localStorage.getItem("access_token")) {
        return false;
    }else{
        
        return true;
    }
    
}