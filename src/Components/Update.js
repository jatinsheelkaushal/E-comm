import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [company, setCompnay] = React.useState("");
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = async () => {
    console.log("this is update product", params);
    let result = await fetch(`http://localhost:8080/product/${params.id}`);
    result = await result.json();
    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setCompnay(result.company);
  };

  const updateProduct = async () => {
    console.log(name, price, category, company);
    let result = await fetch(`http://localhost:8080/product/${params.id}`, {
      method: "Put",
      body: JSON.stringify({ name, price, category, company }),
      headers: {
        "Content-Type": "Application/json",
      },
    });

    result = await result.json();
    console.log("this is updated result inreact", result);
    if (result) {
      navigate("/");
    }
  };

  return (
    <div className="register">
      <h1>Update Product</h1>
      <input
        type="text"
        placeholder="Enter product name"
        className="inputBox"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />

      <input
        type="text"
        placeholder="Enter product price"
        className="inputBox"
        value={price}
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      />

      <input
        type="text"
        placeholder="Enter product category"
        className="inputBox"
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      />

      <input
        type="text"
        placeholder="Enter product company"
        className="inputBox"
        value={company}
        onChange={(e) => {
          setCompnay(e.target.value);
        }}
      />

      <button onClick={updateProduct} className="appButton">
        Update Product
      </button>
    </div>
  );
};

export default UpdateProduct;
