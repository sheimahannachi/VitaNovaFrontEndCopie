export class Food {
    id!: number;
    calories: number;
    glucides: number;
    protein: number;
    lipides: number;
    title: string;
    foodPic: string;
    archive: boolean;
    category: string;
    vitaminC: number;
    vitaminB6: number;
    vitaminE: number;
    calcium: number;

    constructor(
        calories: number,
        glucides: number,
        protein: number,
        lipides: number,
        title: string,
        foodPic: string,
        archive: boolean,
        category: string,
        vitaminC: number,
        vitaminB6: number,
        vitaminE: number,
        calcium: number,
        ) {
            this.calories = calories;
            this.glucides = glucides;
            this.protein = protein;
            this.lipides = lipides;
            this.title = title;
            this.foodPic = foodPic;
            this.archive = archive;
            this.category = category;
            this.vitaminC = vitaminC;
            this.vitaminB6 = vitaminB6;
            this.vitaminE = vitaminE;
            this.calcium = calcium;}}