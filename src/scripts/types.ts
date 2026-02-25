export type Classification = "Firearm" | "Laser" | "Plasma" | "Explosives" | "Melee";

export interface Weapon {
    id: number;
    name: string;
    class: Classification;
    description: string;
    prix: number;
    stock: number;
}
