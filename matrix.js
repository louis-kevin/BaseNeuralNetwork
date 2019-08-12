class Matrix {
    constructor(rows, columns){
        this.rows = rows;
        this.columns = columns;

        this.data = [];

        for(let i = 0; i < rows; i++){
            let arr = [];
            for(let j = 0; j < columns; j++){
                arr.push(0)
            }
            this.data.push(arr);
        }
    }

    // Funçoes diversas

    print(){
        console.table(this.data);
    }

    static arrayToMatrix(arr){
        let matrix = new Matrix(arr.length, 1)
        matrix.map((el, i, j) => {
            return arr[i];
        })

        return matrix;
    }

    static matrixToArray(matrix){
        let arr = []
        matrix.map((el, i, j) => {
            arr.push(el)
        })
        return arr
    }

    randomize(){
        this.map((el, i, j) => {
            return Math.random()*2 - 1;
            // return Math.floor(Math.random() * 10)
        })
    }

    static transpose(matrixA){
        let matrix = new Matrix(matrixA.columns, matrixA.rows)

        matrix.map((num, i, j) => {
            return matrixA.data[j][i]
        })

        return matrix
    }

    map(func){
        this.data = this.data.map((arr, i) => {
            return arr.map((num, j) => {
                return func(num, i, j)
            })
        })

        return this;
    }

    static map(A, func){
        let matrix = new Matrix(A.rows, A.columns)

        matrix.data = A.data.map((arr, i) => {
            return arr.map((num, j) => {
                return func(num, i, j)
            })
        })

        return matrix;
    }

    static escalar_multiply(matrixA, escalar){
        var matrix = new Matrix(matrixA.rows, matrixA.columns)
        matrix.map((item, i, j) => {
            return matrixA.data[i][j] * escalar
        })
        return matrix;
    }

    static hadamard(matrixA, matrixB){
        var matrix = new Matrix(matrixA.rows, matrixA.columns)
        matrix.map((item, i, j) => {
            return matrixA.data[i][j] * matrixB.data[i][j]
        })
        return matrix;
    }

    static add(matrixA, matrixB){
        var matrix = new Matrix(matrixA.rows, matrixA.columns)
        matrix.map((item, i, j) => {
            return matrixA.data[i][j] + matrixB.data[i][j]
        })
        return matrix;
    }

    static subtract(matrixA, matrixB){
        var matrix = new Matrix(matrixA.rows, matrixA.columns)
        matrix.map((item, i, j) => {
            return matrixA.data[i][j] - matrixB.data[i][j]
        })
        return matrix;
    }

    static multiply(matrixA, matrixB){
        var matrix = new Matrix(matrixA.rows, matrixB.columns)
        matrix.map((item, i, j) => {
            let sum = 0;
            for(let k = 0; k < matrixA.columns; k++){
               let el1 = matrixA.data[i][k];
               let el2 = matrixB.data[k][j];

               sum += el1 * el2;
            }

            return sum;
        })

        return matrix;
    }
}