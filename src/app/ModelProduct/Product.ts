

export class Product {
    idPr !: number;
    namePr!: string;
    pricePr!: number;
    categoriePr!: string; // Vous pouvez utiliser une énumération si nécessaire
    picturePr!: string; // Vous pouvez utiliser `Uint8Array` pour représenter un tableau de bytes
    archivePr!: boolean;
  //  likesCount: number = 0;
}
