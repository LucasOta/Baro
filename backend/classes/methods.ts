export default class Methods {

    constructor() { };

    static emptyFieldsMsg(errors: string[]) {       
     if (errors.length == 1) {
      return 'El campo ' + errors[0] + " es necesario.";
     } else {
      let msg = 'Los campos ';

      for (let i = 0; i < errors.length; i++) {
       msg += errors[i]; 
       errors[i + 1] ? msg+=', ' : msg+=' son necesarios.'
      }
      return msg;
     }
    }

}