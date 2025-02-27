/*export type Console = "Steam" | "PS5" | "Xbox Series" | "Switch";

export interface Game {
    id: number;
    name: string; 
    console: Console;
}*/
export type caracteristique = "Clear" | "Rigid" | "Tought" | "Flexible" | "Water Washable" | "Precision Model" | "Biocompatible" | "Hight Temp" | "Castable"

export interface Resin {
    id: number;
	name: string;
    brand: string;
    description: string;
    caracteristique: caracteristique[];
    color: string;
    quantity: number;
    /*stock: number; */
}