import React, { useState, useEffect } from "react";
import styles from "./Admin.module.css";

function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filter, setFilter] = useState("todos");
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    quantity: "",
    price: "", // Novo campo para preço
    type: "petshop",
    image: null,
    _id: null,
  });

  useEffect(() => {
    if (isLoggedIn) {
      fetchProducts();
    }
  }, [isLoggedIn]);

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleLogin = async () => {
    try {
      const response = await fetch(
        "https://backendbluepet.vercel.app/api/admin/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(loginData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        setIsLoggedIn(true);
      } else {
        alert("Login falhou. Verifique suas credenciais.");
      }
    } catch (error) {
      console.error("Erro no login:", error);
      alert("Erro ao tentar realizar login.");
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        "https://backendbluepet.vercel.app/api/products"
      );
      const data = await response.json();
      setProducts(data.products);
      setFilteredProducts(data.products);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  const handleFilterChange = (type) => {
    setFilter(type);
    setNewProduct({ ...newProduct, type: type === "todos" ? "petshop" : type });
    if (type === "todos") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) => product.type === type);
      setFilteredProducts(filtered);
    }
  };

  const handleNewProductChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setNewProduct({ ...newProduct, image: files[0] });
    } else {
      setNewProduct({ ...newProduct, [name]: value });
    }
  };

  const handleSaveProduct = async () => {
    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("description", newProduct.description);
    formData.append("quantity", newProduct.quantity);
    formData.append("price", newProduct.price);
    formData.append("type", newProduct.type);
    if (newProduct.image) {
      formData.append("image", newProduct.image);
    }

    try {
      const response = isEditing
        ? await fetch(
            `https://backendbluepet.vercel.app/api/products/update/${newProduct._id}`,
            {
              method: "PUT",
              body: formData,
            }
          )
        : await fetch(
            "https://backendbluepet.vercel.app/api/products/register",
            {
              method: "POST",
              body: formData,
            }
          );

      if (response.ok) {
        fetchProducts();
        setIsAdding(false);
        setIsEditing(false);
        setNewProduct({
          name: "",
          description: "",
          quantity: 1,
          price: "",
          type: filter,
          image: null,
          _id: null,
        });
      } else {
        console.error(
          isEditing ? "Erro ao editar produto" : "Erro ao adicionar produto"
        );
      }
    } catch (error) {
      console.error(
        isEditing ? "Erro ao editar produto:" : "Erro ao adicionar produto:",
        error
      );
    }
  };

  const handleCancelAdd = () => {
    setIsAdding(false);
    setIsEditing(false);
    setNewProduct({
      name: "",
      description: "",
      quantity: 1,
      price: "",
      type: filter,
      image: null,
      _id: null,
    });
  };

  const handleEditProduct = (productId) => {
    const productToEdit = products.find((product) => product._id === productId);
    setNewProduct({
      ...productToEdit,
      image: null,
    });
    setIsAdding(true);
    setIsEditing(true);
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await fetch(
        `https://backendbluepet.vercel.app/api/products/delete/${productId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== productId)
        );
        setFilteredProducts((prevFiltered) =>
          prevFiltered.filter((product) => product._id !== productId)
        );
      } else {
        console.error("Erro ao deletar produto");
      }
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
    }
  };

  return (
    <div className={styles.adminContainer}>
      {!isLoggedIn ? (
        <div className={styles.loginContainer}>
          <h2>Login</h2>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={loginData.username}
            onChange={handleLoginChange}
            className={styles.input}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={loginData.password}
            onChange={handleLoginChange}
            className={styles.input}
          />
          <button onClick={handleLogin} className={styles.loginButton}>
            Entrar
          </button>
        </div>
      ) : (
        <div>
          <div className={styles.filterMenu}>
            <button
              className={filter === "todos" ? styles.active : ""}
              onClick={() => handleFilterChange("todos")}
            >
              Todos
            </button>
            <button
              className={filter === "petshop" ? styles.active : ""}
              onClick={() => handleFilterChange("petshop")}
            >
              Petshop
            </button>
            <button
              className={filter === "farmacia" ? styles.active : ""}
              onClick={() => handleFilterChange("farmacia")}
            >
              Farmácia
            </button>
          </div>

          <div className={styles.productList}>
            {isAdding ? (
              <div className={styles.addFormCard}>
                <input
                  type="text"
                  name="name"
                  placeholder="Nome do produto"
                  value={newProduct.name}
                  onChange={handleNewProductChange}
                  className={styles.input}
                />
                <textarea
                  name="description"
                  placeholder="Descrição do produto"
                  value={newProduct.description}
                  onChange={handleNewProductChange}
                  className={styles.textarea}
                />
                <input
                  type="number"
                  name="quantity"
                  placeholder="Quantidade"
                  value={newProduct.quantity}
                  onChange={handleNewProductChange}
                  className={styles.input}
                />
                <input
                  type="number"
                  name="price"
                  placeholder="Preço"
                  value={newProduct.price}
                  onChange={handleNewProductChange}
                  className={styles.input}
                />
                {filter === "todos" && (
                  <select
                    name="type"
                    value={newProduct.type}
                    onChange={handleNewProductChange}
                    className={styles.select}
                  >
                    <option value="petshop">Petshop</option>
                    <option value="farmacia">Farmácia</option>
                  </select>
                )}
                <input
                  type="file"
                  name="image"
                  onChange={handleNewProductChange}
                  className={styles.fileInput}
                />
                <button
                  onClick={handleSaveProduct}
                  className={styles.addButton}
                >
                  {isEditing ? "Salvar" : "Adicionar"}
                </button>
                <button
                  onClick={handleCancelAdd}
                  className={styles.cancelButton}
                >
                  Cancelar
                </button>
              </div>
            ) : (
              <div
                className={styles.addProductCard}
                onClick={() => setIsAdding(true)}
              >
                <div className={styles.addIcon}>+</div>
              </div>
            )}

            {filteredProducts.map((product) => (
              <div key={product._id} className={styles.productCard}>
                <img src={product.imageUrl} alt={product.name} />
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>Quantidade: {product.quantity}</p>
                <p>Preço: {product.price}</p>
                <div className={styles.cardIcons}>
                  <span
                    className={styles.editIcon}
                    onClick={() => handleEditProduct(product._id)}
                  >
                    ✏️
                  </span>
                  <span
                    className={styles.deleteIcon}
                    onClick={() => handleDeleteProduct(product._id)}
                  >
                    🗑️
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;
