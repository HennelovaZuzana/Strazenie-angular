export class ZvieraXMajitel {

    constructor(
        public druh: string,
        public pohl: string,
        public datumOd: Date,
        public datumDo: Date,
        public poznamka: string,
        public osobaId: number,
        public majitelMeno: string,
        public majitelAdresa: string,
        public majitelKontakt: string
    ){};
}