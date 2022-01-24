export class Zviera {

    constructor(
        public id: number,
        public majitelId: number,
        public druhZvierataId: number,
        public meno: string,
        public pohlavie: string,
        public poznamka: string,
        public strazenieOd: Date,
        public strazenieDo: Date,
        public druh?: string
    ) { }
}