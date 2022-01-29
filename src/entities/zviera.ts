export class Zviera {

    constructor(
        public majitelId: number,
        public druhZvierataId: number,
        public meno: string,
        public pohlavie: string,
        public poznamka: string,
        public strazenieOd: Date,
        public strazenieDo: Date,
        public id?: number,
        public druh?: string
    ) { }
}