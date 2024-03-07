export enum gender {
    Male = 0,
    Female = 1,
}

export interface person {
    id: number;
    name: string;
    email: string;
    gender: number;
    dob: Date;
    age: number;
    address: string;

    login?(id: number): boolean;
}