import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';

import "./styles.css";
import Result from "./Result";

function Predict() {
  const [showData, setShowData] = useState([]);
  //let resData = [];
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    axios.post("http://localhost:3000/run", data)
      .then(function (response) {
        console.log(response.data);
        setShowData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }; // your form submit function which will invoke after successful validation

  console.log(watch("sepal_length")); // you can watch individual input by pass the name of the input

  return (
    showData.length === 0?
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Sepal Length : </label>
      <input 
      defaultValue="1.0"
      {...register("sepal_length", { required: true })} 
      />
      <label>Sepal Width : </label>
      <input 
      defaultValue="1.0"
      {...register("sepal_width", { required: true })} 
      />
      <label>Petal Length : </label>
      <input 
      defaultValue="1.0"
      {...register("petal_length", { required: true })} 
      />
      <label>Petal Width : </label>
      <input 
      defaultValue="1.0"
      {...register("petal_width", { required: true })} 
      />
      <label>No of Epochs : </label>
      <input 
      defaultValue="50"
      {...register("epochs", { required: true })} 
      />
      <label>Learning Rate : </label>
      <input 
      defaultValue="0.01"
      {...register("learning_rate", { required: true })} 
      />
      {/* errors will return when field validation fails  */}
      {errors.exampleRequired && <p>This field is required</p>}

      <input type="submit" />
    </form>
    :
    <Result resultData={showData} />
  );
}

export default Predict;