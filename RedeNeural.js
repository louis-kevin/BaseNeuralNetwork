function sigmoid(x){
    return 1/(1+Math.exp(-x));
}

function dsigmoid(x){
    return x * (1 - x)
}

class RedeNeural {
    constructor(input, hidden, output, parentPlayer){
        this.input = input
        this.hidden = hidden
        this.output = output

        this.input_to_hidden_bias = new Matrix(hidden, 1)
        this.hidden_to_output_bias = new Matrix(output, 1)
        this.input_to_hidden_weight = new Matrix(hidden, input)
        this.hidden_to_output_weight = new Matrix(output, hidden)

        this.input_to_hidden_bias.randomize()
        this.hidden_to_output_bias.randomize()

        if(parentPlayer){
            this.input_to_hidden_weight = Matrix.mutate(parentPlayer.input_to_hidden_weight)
            this.hidden_to_output_weight = Matrix.mutate(parentPlayer.hidden_to_output_weight)
        }else{
            this.input_to_hidden_weight.randomize()
            this.hidden_to_output_weight.randomize()
        }
        

        this.learning_rate = 0.1

    }

    print(){
        this.input_to_hidden_bias.print()
        this.hidden_to_output_bias.print()
        this.input_to_hidden_weight.print()
        this.hidden_to_output_weight.print()
    }

    train(arr, target){
        let input = Matrix.arrayToMatrix(arr);
        let hidden = Matrix.multiply(this.input_to_hidden_weight, input)

        hidden = Matrix.add(hidden, this.input_to_hidden_bias)

        hidden.map(sigmoid)

        let output = Matrix.multiply(this.hidden_to_output_weight, hidden)
        output = Matrix.add(output, this.hidden_to_output_bias)
        output.map(sigmoid)

        // Backpropagation
        let expected = Matrix.arrayToMatrix(target)
        let output_error = Matrix.subtract(expected, output)
        let derivada_output = Matrix.map(output, dsigmoid)
        let hidden_to_output_transposed = Matrix.transpose(hidden)

        let gradient_output = Matrix.hadamard(output_error, derivada_output)
        gradient_output = Matrix.escalar_multiply(gradient_output, this.learning_rate)

        this.hidden_to_output_bias = Matrix.add(this.hidden_to_output_bias, gradient_output)

        let weight_hidden_to_output_deltas = Matrix.multiply(gradient_output, hidden_to_output_transposed)
        this.hidden_to_output_weight = Matrix.add(this.hidden_to_output_weight, weight_hidden_to_output_deltas)

        let wights_hidden_to_outuput_transposed = Matrix.transpose(this.hidden_to_output_weight)
        let hidden_error = Matrix.multiply(wights_hidden_to_outuput_transposed, output_error)
        let derivada_hidden = Matrix.map(hidden, dsigmoid)
        let input_transposed = Matrix.transpose(input)

        let gradient_hidden = Matrix.hadamard(hidden_error, derivada_hidden)

        gradient_hidden = Matrix.escalar_multiply(gradient_hidden, this.learning_rate)

        this.input_to_hidden_bias = Matrix.add(this.input_to_hidden_bias, gradient_hidden)

        let input_to_hidden_weight = Matrix.multiply(gradient_hidden, input_transposed)

        this.input_to_hidden_weight = Matrix.add(this.input_to_hidden_weight, input_to_hidden_weight)

        return Matrix.matrixToArray(output)
    }

    predict(arr){
        let input = Matrix.arrayToMatrix(arr);
        let hidden = Matrix.multiply(this.input_to_hidden_weight, input)

        hidden = Matrix.add(hidden, this.input_to_hidden_bias)

        hidden.map(sigmoid)

        let output = Matrix.multiply(this.hidden_to_output_weight, hidden)
        output = Matrix.add(output, this.hidden_to_output_bias)
        output.map(sigmoid)

        return Matrix.matrixToArray(output)
    }
}