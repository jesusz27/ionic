import { User } from "./user.model";
export interface Track {
    codUser: User;
    conContact: User;
    trackDetail: string;
    fecha: Date;
}
