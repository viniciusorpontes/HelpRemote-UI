import { User } from "./user.model";

export class Ticket {
    constructor(
        public id: string,
        public numero: number,
        public titulo: string,
        public status: string,
        public prioridade: string,
        public imagem: string,
        public user: User,
        public assignedUser: User,
        public data: string,
        public changes: Array<string>
    ){}

    public equals(obj: Ticket) : boolean { 
        return this.numero === obj.numero;
    } 
}