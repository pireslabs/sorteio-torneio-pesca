import arrayShuffle from "array-shuffle";
import {position} from "@chakra-ui/react";

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
        this.duplas =  arrayShuffle(aDuplas);
    }

    private initMapaTorneio(): void {
        for (let i = 0; i < this.totalSetores; i++) {
            this.mapaTorneio.push(new Array(this.totalSetores).fill(new Array(this.tamanhoSetor).fill(0)));
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
        let c = 0;
        while ((!this.isAllocationCompleted()) && c < 3) {
            let duplas: number[] = Object.assign([], this.duplas);
            console.log('Duplas do Torneio:', duplas);
            while (duplas.length > 0) {
                let dupla: number | undefined = duplas.pop();
                console.log('Dupla:', dupla);
                console.log('Duplas do Torneio:', duplas);
                if (dupla) {
                    let rNumber = 1;
                    for (let rodada of this.mapaTorneio) {
                        console.log(`Rodada ${rNumber}:`, rodada);
                        let freePositions = arrayShuffle(this.getFreePositions(rodada, dupla));
                        console.log(`Free Positions:`, freePositions);
                        if (freePositions.length === 0) {
                            continue;
                        }
                        let position = freePositions.pop()
                        console.log('Position:', position);
                        if (position) {
                            let setor = this.calcSetor(position);
                            let slot = this.calcSetorSlot(position);
                            rodada[setor][slot] = dupla;
                            let setores = this.alocacoes.get(dupla);
                            if (setores) {
                                setores.push(setor)
                                this.alocacoes.set(dupla, setores);
                            } else {
                                let setores = [setor];
                                this.alocacoes.set(dupla, setores);
                            }
                        }
                        rNumber++;
                    }
                }
            }
            c++;
        }
        console.log(this.mapaTorneio);
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
            for (let slot of setor ) {
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

export { Sorteio };