import arrayShuffle from "array-shuffle";

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

    public sortear(): void {
        console.log('Mapa do Torneio:', this.mapaTorneio);
        console.log('Alocações:', this.alocacoes);
        let duplas: number[] = Object.assign([], this.duplas);
        console.log('Duplas do Torneio:', duplas);
        let t = 0;
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
            t++;
            console.log('Alocações:', this.alocacoes, 'T:', t);
            if (t === 4) {
                break;
            }
        }
        console.log('Mapa do torneio:', this.mapaTorneio);
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
}

export {Sorteio};