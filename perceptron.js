class Perceptron{
    weigths = [];

    lr = 0.1;


    constructor(numberWeigths){
        this.weigths= new Array(numberWeigths);
        for (let i = 0; i < this.weigths.length; i++) {
            this.weigths[i] = random(-1,1);
        }
    }

    guess(inputs){
        let sum = 0;

        for (let i = 0; i < this.weigths.length; i++) {
            sum += inputs[i] * this.weigths[i];
        }

        return Math.sign(sum);
    }

    train(inputs,target)
    {
        const guess = this.guess(inputs);

        const error = target - guess;

        if(error != 0){
            for (let i = 0; i < this.weigths.length; i++){
                this.weigths[i] += error * inputs[i] * this.lr;
            }

            return false;
        }
        else{
            return true;
        }
    }

    testTrain(inputs, target)
    {
        const guess = this.guess(inputs);

        const error = target - guess;

        if(error != 0){
            return false;
        }
        else{
            return true;
        }
    }

    guessY(x){
        const w0 = this.weigths[0];
        const w1 = this.weigths[1];
        const w2 = this.weigths[2];

        return - (w2 / w1) - (w0 / w1) * x;
    }
}