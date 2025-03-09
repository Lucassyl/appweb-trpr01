export type Caracteristique = "Clear" | "Rigid" | "Tought" | "Flexible" | "Water Washable" | "Precision Model" | "Biocompatible" | "Hight Temp" | "Castable"

export interface Resin {
    id: number;
    marque: string;
    description: string;
    caracteristique: Caracteristique[];
    color: string;
    quantity: number;
    /*stock: number; */
}