export class UserRating {
  id!: number; // Identifiant de la note (optionnel si vous utilisez la création côté serveur)
  rate!: number;
  exerciseId!: number;// Note donnée par l'utilisateur
}
