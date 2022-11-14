import  Joi from 'joi';


const schemaUser =Joi.object({
    nombre: Joi.string().pattern(new RegExp('^[a-zA-Z]{3,30}$')),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    role:Joi.string().pattern(new RegExp('^[a-zA-Z]{3,30}$')),
    timestamp:  Date.now ,
});

 function validateUser(){
    
   
    
    return async (res,req,next)=>{
        try{
            const {error,value}=schemaUser.validate({ nombre:res.body.nombre,password:res.body.password,role:res.body.role })
            
            if(error){
                console.log(error)
                //next(error)
                throw new Error(error)
            }
            else{
                
                next()
            }
    } catch(err){
        throw new Error('Algo paso')
    }
} 
}

export default validateUser;