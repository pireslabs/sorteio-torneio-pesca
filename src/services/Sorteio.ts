import arrayShuffle from "array-shuffle";

class Sorteio {

    private totalDuplas: number = 0;
    private totalSetores: number = 0;
    private tamanhoSetor: number = 0;

    constructor(duplas: number, setores: number) {
        this.totalDuplas = duplas;
        this.totalSetores = setores;
        this.tamanhoSetor = Math.floor(this.totalDuplas / this.totalSetores);
        if ((this.totalDuplas % this.totalSetores) > 0) {
            throw Error('A divisão de duplas por setor precisa ser exata.');
        }
        let aDuplas = this.getDuplas();
        console.log(aDuplas);
    }

    private getDuplas(): number[] {
        let aDuplas: number[] = [];
        for (let i = 0; i < this.totalDuplas; i++) {
            aDuplas[i] = i + 1;
        }
        return arrayShuffle(aDuplas);
    }
}

export { Sorteio };