import { useState } from "react";
import axios from "axios";

export default function Addproduct() {
  const [image, setImage] = useState(null);
  const [brand, setBrand] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [rate, setRate] = useState("");
  const [count, setCount] = useState("");
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [modal, setModal] = useState(false);

  const formData = new FormData();
  formData.append("brand", brand);
  formData.append("title", title);
  formData.append("price", price);
  if(colors){
    for (let i = 0; i < colors.length; i++) {
      formData.append("colors", colors[i]);
    }
  }
  if(sizes){
    for (let i = 0; i < sizes.length; i++) {
      formData.append("sizes", sizes[i]);
    }
  }
  formData.append("description", description);
  formData.append("category", category);
  formData.append("rate", rate);
  formData.append("count", count);
  if (image) {
    for (let i = 0; i < image.length; i++) {
      formData.append("image", image[i]);
    }
  }

  async function createImages(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_LINK}/products/productData`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        setBrand("");
        setCategory("");
        setCount("");
        setDescription("");
        setPrice("");
        setRate("");
        setTitle("");
        setColors("")
        setSizes('')
        setImage(null);
        alert("Product created Successfully");
      }
    } catch (error) {
      alert(
        "Failed to create product: " + error.response?.data.queryData ||
          error.message
      );
      console.log(error);
    }
  }

  return (
    <section className="productCreate-section">
      <div className="allProduct-btn">
        <button className="product-create-btn" onClick={() => setModal(true)}>
          <i className="fa-solid fa-plus"></i>Create
        </button>
      </div>
      {modal && (
        <div className="addProduct-container">
          <button
            className="product-remove-btn"
            onClick={() => setModal(false)}
          >
            <i className="fa-solid fa-circle-xmark"></i>
          </button>
          <form
            id="form-data"
            onSubmit={createImages}
            encType="multipart/form-data"
          >
            <label htmlFor="brand">Brand</label>
            <input
              className="create-data"
              type="text"
              value={brand}
               placeholder="Enter Brand"
              name="brand"
              id="brand"
              onChange={(e) => setBrand(e.target.value)}
            />
            <label htmlFor="title">Title</label>
            <input
              className="create-data"
              type="text"
              value={title}
               placeholder="Enter Title"
              name="title"
              id="title"
              onChange={(e) => setTitle(e.target.value)}
            />
            <label htmlFor="price">Price</label>
            <input
              className="create-data"
              type="text"
              value={price}
               placeholder="Enter Price"
              name="price"
              id="price"
              onChange={(e) => setPrice(e.target.value)}
            />
            <label htmlFor="category">Category</label>
            <input
              className="create-data"
              type="text"
              value={category}
               placeholder="Enter Category"
              name="category"
              id="category"
              onChange={(e) => setCategory(e.target.value)}
            />
            <label htmlFor="rate">Rate</label>
            <input
              className="create-data"
              type="text"
              value={rate}
               placeholder="Enter sizes Rate"
              name="rate"
              id="rate"
              onChange={(e) => setRate(e.target.value)}
            />
            <label htmlFor="count">Count</label>
            <input
              className="create-data"
              type="text"
              value={count}
               placeholder="Enter Count"
              name="count"
              id="count"
              onChange={(e) => setCount(e.target.value)}
            />
            <label htmlFor="colors">colors</label>

            <input
              className="create-data"
              type="text"
              name="colors"
              placeholder="Enter colors (comma separated)"
              value={colors}
              onChange={(e) => setColors(e.target.value.split(","))}
            />
            <label htmlFor="sizes">Sizes</label>
            <input
              className="create-data"
              type="text"
              name="sizes"
              placeholder="Enter sizes (comma separated)"
              value={sizes}
              onChange={(e) => setSizes(e.target.value.split(","))}
            />
            <label htmlFor="description">Description</label>
            <textarea
              className="product-textarea"
              type="textarea"
               placeholder="Enter Description"
              value={description}
              name="description"
              id="description"
              onChange={(e) => setDescription(e.target.value)}
            />
            <label className="image-uploader" htmlFor="image-uploader">
              <i className="fa-solid fa-camera"></i>Upload Image
            </label>
            <input
              multiple
              className="image-input"
              type="file"
              name="image"
              id="image-uploader"
              onChange={(e) => setImage(e.target.files)}
            />
            <div className="btn-container">
              <button
                className="product-cancel-btn"
                onClick={() => setModal(false)}
              >
                Cancel
              </button>
              <button className="product-save-btn">Save</button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
}
