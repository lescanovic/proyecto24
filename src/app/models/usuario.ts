export interface Usuario {
    //lo mismo que un identificador pero este se vincula con la base de datos
    uid: string | any; //recibe valores vacios o indefinidos
    nombre: string;
    apellido: string;
    email:string;
    password: string;
    rol: string;
}
