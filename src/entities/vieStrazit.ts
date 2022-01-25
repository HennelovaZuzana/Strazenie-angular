export class VieStazit {
    constructor(
        public id: number,
        public cena: number,
        public poznamka: string,
        public druhId: number,
        public osobaId: number,
        public druh?: string,
        public majitelMeno?: string,
        public majitelAdresa?: string,
        public majitelKontakt?: string
    ) {}
}