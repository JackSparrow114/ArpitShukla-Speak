const tf = require('@tensorflow/tfjs');
require('@tensorflow/tfjs-node');
//load iris training and testing data
const iris = require('../../iris.json');
const irisTesting = require('../../iris-testing.json');
var lossValue;
//
exports.trainAndPredict = function (req, res) {
    let newData = {
        sepal_length:req.body.sepal_length, 
        sepal_width:req.body.sepal_width,
        petal_length:req.body.petal_length,
        petal_width:req.body.petal_width
    };
    irisTesting.push(newData);
    let {epochs, learning_rate} = req.body;
    //
    // convert/setup our data for tensorflow.js
    //
    //tensor of features for training data
    // include only features, not the output
    const trainingData = tf.tensor2d(iris.map(item => [
        item.sepal_length, item.sepal_width, item.petal_length,
        item.petal_width
    ]));
    //console.log(trainingData.dataSync())
    //
    //tensor of output for training data
    //the values for species will be:
    // setosa:       1,0,0
    // virginica:    0,1,0
    // versicolor:   0,0,1
    const outputData = tf.tensor2d(iris.map(item => [
        item.species === "setosa" ? 1 : 0,
        item.species === "virginica" ? 1 : 0,
        item.species === "versicolor" ? 1 : 0
    ]));
    //console.log(outputData.dataSync())
    //
    //tensor of features for testing data
    const testingData = tf.tensor2d(irisTesting.map(item => [
        item.sepal_length, item.sepal_width,
        item.petal_length, item.petal_width,
    ]));
    //console.log(testingData.dataSync())    
    //
    // build neural network using a sequential model
    const model = tf.sequential();
    //add the first layer
    model.add(tf.layers.dense({
        inputShape: [4], // four input neurons
        activation: "sigmoid",
        units: 5, //dimension of output space (first hidden layer)
    }));
    //add the hidden layer
    model.add(tf.layers.dense({
        inputShape: [5], //dimension of hidden layer
        activation: "sigmoid",
        units: 3, //dimension of final output (setosa, virginica, versicolor)
    }));
    //add output layer
    model.add(tf.layers.dense({
        activation: "sigmoid",
        units: 3, //dimension of final output (setosa, virginica, versicolor)
    }));
    //compile the model with an MSE loss function and Adam algorithm
    model.compile({
        loss: "meanSquaredError",
        optimizer: tf.train.adam(learning_rate),
    });
    console.log(model.summary());
    //
    //Train the model and predict the results for testing data
    //
    // train/fit the model for the fixed number of epochs
    async function run() {
        const startTime = Date.now()
        //train the model
        await model.fit(trainingData, outputData,         
            {
                epochs: epochs,
                callbacks: { //list of callbacks to be called during training
                    onEpochEnd: async (epoch, log) => {
                        lossValue = log.loss;
                        console.log(`Epoch ${epoch}: lossValue = ${log.loss}`);
                        elapsedTime = Date.now() - startTime;
                        console.log('elapsed time: ' + elapsedTime)
                    }
                }
            }
            
        )
            
        const results = model.predict(testingData);
        //console.log('prediction results: ', results.dataSync())
        //results.print()
        
        // get the values from the tf.Tensor
        //var tensorData = results.dataSync();
        results.array().then(output => {
            console.log(output);
            res.status(200).send(output[3]);
            //
            /*
            res.render('results',
                {
                    elapsedTime: elapsedTime / 1000,
                    lossValue: lossValue,
                    resultForData1: resultForData1[0],
                    resultForData2: resultForData2,
                    resultForData3: resultForData3
                }
            )
            */                    
            //
        })
        //

    } //end of run function
    run()

};
