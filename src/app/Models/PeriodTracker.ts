export class PeriodTracker {
  idPeriod!: number;
  startDate: string;
  cycleLength: number;
  symptoms: string[];
  mood: string;
  archive: boolean ;

  constructor(
    startDate: string,
    cycleLength: number,
    symptoms: string[],
    mood: string,
    archive: boolean = false,
  ) {
    this.startDate = startDate;
    this.cycleLength = cycleLength;
    this.symptoms = symptoms;
    this.mood = mood;
    this.archive = archive;
  }
}
