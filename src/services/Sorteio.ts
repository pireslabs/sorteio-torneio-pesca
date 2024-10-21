import arrayShuffle from "array-shuffle";

export interface Alocacao {
    setor: number;
    raia: number;
}

const copyObject = (toCopy: any): any => {
    return JSON.parse(JSON.stringify(toCopy));
}

class Sorteio {

    private totalDuplas: number = 0;
    private totalSetores: number = 0;
    private totalRaiasSetor: number = 0;
    private alocacoes: Map<number, Set<number>>;
    private duplas: Array<number> = [];
    private mapaTorneio: Array<Array<Array<number>>> = [];

    constructor(duplas: number | number[], setores: number) {
        if (Array.isArray(duplas)) {
            this.totalDuplas = duplas.length;
            this.duplas = duplas;
        } else {
            this.totalDuplas = duplas;
        }
        this.totalSetores = setores;
        this.totalRaiasSetor = Math.floor(this.totalDuplas / this.totalSetores);
        if ((this.totalDuplas % this.totalSetores) > 0) {
            throw Error('A divisão de duplas por setor precisa ser exata.');
        }
        this.alocacoes = new Map<number, Set<number>>();
        if (this.duplas.length === 0) {
            this.createDuplas();
        } else {
            this.duplas = arrayShuffle(this.duplas);
        }
        this.createMapaTorneio();
    }

    private createDuplas(): void {
        let duplas: number[] = [];
        for (let i = 0; i < this.totalDuplas; i++) {
            duplas[i] = i + 1;
        }
        this.duplas = arrayShuffle(duplas);
        console.log('Duplas:', this.duplas);
    }

    private createMapaTorneio(): void {
        for (let i = 0; i < this.totalSetores; i++) {
            let rodada = new Array<Array<number>>();
            for (let j = 0; j < this.totalSetores; j++) {
                let setor: Array<number> = new Array<number>();
                for (let k = 0; k < this.totalRaiasSetor; k++) {
                    setor.push(0);
                }
                rodada.push(setor);
            }
            this.mapaTorneio.push(rodada);
        }
    }

    private isSetorCompleto(setor: number[]): boolean {
        for (let raia of setor) {
            if (raia === 0) {
                return false;
            }
        }
        return true;
    }

    private sortear(): void {
        for (let rodada of this.mapaTorneio) {
            let duplas: number[] = copyObject(this.duplas);
            let numeroSetor: number = 0;
            for(let setor of rodada) {
                let alocacoesSetor = this.alocacoes.get(numeroSetor)
                if (typeof alocacoesSetor === "undefined") {
                    alocacoesSetor = new Set<number>();
                }
                while (!this.isSetorCompleto(setor)) {
                    for (let i = 0; i < setor.length; i++) {
                        if (setor[i] === 0) {
                            let dupla = duplas.shift();
                            if (typeof dupla !== "undefined") {
                                if (!alocacoesSetor?.has(dupla)) {
                                    setor[i] = dupla;
                                    alocacoesSetor.add(dupla);
                                } else {
                                    duplas.push(dupla);
                                }
                            }
                        }
                    }
                }
                this.alocacoes.set(numeroSetor, alocacoesSetor);
                numeroSetor++;
            }
        }
        for (let rodada of this.mapaTorneio) {
            for (let i = 0; i < rodada.length; i++) {
                rodada[i] = arrayShuffle(rodada[i]);
            }
        }
        console.log('Mapa do Torneio:', this.mapaTorneio);
        console.log('Alocações:', this.alocacoes);
    }

    public getMapaSorteado(): Map<number, Alocacao[]> {
        this.sortear();
        let m = new Map<number, Alocacao[]>();
        this.duplas.sort((a, b) => a - b);
        console.log('Duplas ordenada:', this.duplas);
        for (let dupla of this.duplas) {
            let p: Alocacao[] = [];
            for (let rodada of this.mapaTorneio) {
                let numeroRaia = 1;
                let numeroSetor = 1;
                for (let setor of rodada) {
                    for (let raia of setor) {
                        if (dupla === raia) {
                            p.push({
                                setor: numeroSetor,
                                raia: numeroRaia
                            });
                        }
                        numeroRaia++;
                    }
                    numeroSetor++;
                }
            }
            m.set(dupla, p);
        }
        return m;
    }
}

export {Sorteio};