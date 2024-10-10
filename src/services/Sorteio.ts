import arrayShuffle from "array-shuffle";
import {i} from "framer-motion/dist/m";

class Sorteio {

    private totalDuplas: number = 0;
    private totalSetores: number = 0;
    private tamanhoSetor: number = 0;
    private alocacoes: Map<number, number[]>;
    private mapaTorneio: Array<Array<Array<number>>> = [];
    private duplas: Array<number> = [];

    constructor(duplas: number, setores: number) {
        this.totalDuplas = duplas;
        this.totalSetores = setores;
        this.tamanhoSetor = Math.floor(this.totalDuplas / this.totalSetores);
        if ((this.totalDuplas % this.totalSetores) > 0) {
            throw Error('A divisão de duplas por setor precisa ser exata.');
        }
        this.alocacoes = new Map<number, number[]>();
        this.initMapaTorneio();
        this.sortearDuplas();
    }

    private sortearDuplas(): void {
        let aDuplas: number[] = [];
        for (let i = 0; i < this.totalDuplas; i++) {
            aDuplas[i] = i + 1;
        }
        this.duplas = arrayShuffle(aDuplas);
    }

    private initMapaTorneio(): void {
        for (let i = 0; i < this.totalSetores; i++) {
            let rodada = new Array<Array<number>>();
            for (let j = 0; j < this.totalSetores; j++) {
                let setor: Array<number> = new Array<number>();
                for (let k = 0; k < this.tamanhoSetor; k++) {
                    setor.push(0);
                }
                rodada.push(setor);
            }
            this.mapaTorneio.push(rodada);
        }
    }

    private isAllocationCompleted(): boolean {
        let isAllocationCompleted = true;
        if (this.alocacoes.size === 0) {
            return false;
        }
        for (let value of this.alocacoes.values()) {
            if (value.length < 4) {
                isAllocationCompleted = false;
            }
        }
        return isAllocationCompleted;
    }

    private sortear(): void {
        console.log('Mapa do Torneio:', this.mapaTorneio);
        console.log('Alocações:', this.alocacoes);
        let duplas: number[] = Object.assign([], this.duplas);
        console.log('Duplas do Torneio:', duplas);
        while (!this.isAllocationCompleted()) {
            let countDupla = 1;
            while (duplas.length > 0) {
                let dupla: number | undefined = duplas.pop();
                console.log(countDupla, 'Dupla:', dupla, 'Duplas restantes:', duplas);
                if (typeof dupla != 'undefined') {
                    let rNumber = 1;
                    for (let rodada of this.mapaTorneio) {
                        let freePositions = this.getFreePositions(rodada, dupla);
                        if (freePositions.length === 0) {
                            continue;
                        }
                        console.log(`Free Positions:`, freePositions);
                        let position = freePositions.pop()
                        console.log('Position:', position);
                        if (typeof position !== 'undefined') {
                            let setor = this.calcSetor(position);
                            let slot = this.calcSetorSlot(position);
                            console.log('Setor:', setor, 'Raia:', slot);
                            rodada[setor][slot] = dupla;
                            let setores = this.alocacoes.get(dupla);
                            if (typeof setores === 'undefined') {
                                setores = [];
                            }
                            setores.push(setor);
                            this.alocacoes.set(dupla, setores);
                        }
                        console.log(`Rodada ${rNumber}:`, rodada);
                        rNumber++;
                    }
                }
                countDupla++;
            }
            console.log('Alocações:', this.alocacoes);
        }

        let m = JSON.parse(JSON.stringify(this.mapaTorneio));
        console.log('Mapa do torneio before:', m);
        this.shuffleMapaTorneio();
        console.log('Mapa do torneio after:', this.mapaTorneio);
    }

    private calcSetor(position: number): number {
        return Math.floor(position / this.tamanhoSetor);
    }

    private calcSetorSlot(position: number): number {
        return position % this.tamanhoSetor;
    }

    private getFreePositions(rodada: Array<Array<number>>, dupla: number): Array<number> {
        let position = 0;
        let freePositions: Array<number> = [];
        for (let setor of rodada) {
            for (let slot of setor) {
                let numeroSetor: number = this.calcSetor(position);
                if ((slot === 0) && (!this.inSector(dupla, numeroSetor))) {
                    freePositions.push(position);
                }
                position++;
            }
        }
        return freePositions;
    }

    private inSector(dupla: number, numeroSetor: number) {
        let setores = this.alocacoes.get(dupla);
        return (setores && setores.includes(numeroSetor));

    }

    private shuffleMapaTorneio(): void {
        for (let rodada of this.mapaTorneio) {
            for (let i = 0; i < rodada.length; i++) {
                let s: number[] = arrayShuffle(JSON.parse(JSON.stringify(rodada[i])));
                rodada[i] = s;
            }
        }
    }

    public getMapaSorteado(): Map<number, number[][]> {
        this.sortear();
        let m = new Map<number, number[][]>();
        for (let dupla = 1; dupla <= this.duplas.length; dupla++) {
            let p: number[][] = this.initMapaDupla();
            let numeroRodada = 0;
            for (let rodada of this.mapaTorneio) {
                let numeroRaia = 1;
                let numeroSetor = 0;
                for (let setor of rodada) {
                    for (let raia of setor) {
                        if (dupla === raia) {
                            p[numeroRodada][numeroSetor] = numeroRaia;
                        }
                        numeroRaia++;
                    }
                    numeroSetor++;
                }
                numeroRodada++;
            }
            m.set(dupla, p);
        }
        return m;
    }

    private initMapaDupla(): number[][] {
        let mapaRodadas: number[][] = [];
        for (let i = 0; i < this.totalSetores; i++) {
            let setores: number[] = [];
            for (let k: number = 0; k < this.totalSetores; k++) {
                setores.push(-1);
            }
            mapaRodadas.push(setores);
        }
        return mapaRodadas;
    }
}

export {Sorteio};