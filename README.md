# ArpitShukla-Speak

# This is a simple full-stack app with ML capabilities

This app makes predictions about which flower species it is based on it's provided dimensions. It is a classic example of classification using supervised learning.
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
This project also utilised NodeJS, Express, Tensorflow.js and React-hook-form library.
This app takes sepal length, sepal width, petal length, petal width, number of epochs and learning rate as input.
It builds a neural network using a sequential model by training data provided in the app, and makes predictions based on number of epochs, learning rate ,MSE loss function and Adam algorithm.

# To run this project, you need to open two separate teminals.

## In one ternimal, cd to project directory, then follow these steps:

### run `npm install`
This will install all the dependencies. 
Although I made sure to include all the dependencies, I have realised that tensorflow.js creates issues on some machines.

### If you successfully installed all the dependencies, then run `npm run dev`
This will start the back-end server on port 5001.

## In second terminal, cd to project directory, then cd to 'react-ui' folder and follow these steps:

### run `npm install`
This will install all the dependencies. 
I made sure to include all the dependencies, so there shouldn't be any major issues.

### If you successfully installed all the dependencies, then run `npm start`
This will start the react front-end server on port 3000.

It runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Once both back-end and front-end are up and running, you will see a screen like this:


![Screen Shot 2022-08-29 at 7 58 12 PM](https://user-images.githubusercontent.com/13262518/187321497-63691f81-7f98-45bc-9240-d14749100278.png)

Enter proper values in the input boxes and click submit.

It will submit the form to the backend, train the model, make the prediction and return the results to the front.

## In the end you will see a screen like this:


![Screen Shot 2022-08-29 at 7 59 09 PM](https://user-images.githubusercontent.com/13262518/187323381-3d940add-2bb0-4282-8ee9-8923b7e44ad8.png)

It shows you the output of the model and what species the flower could be based on the inputs. Currently this app can predict 3 species of flowers. But it can easily be extended to more species, if such a training data is available.

