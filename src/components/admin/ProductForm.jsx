import { useState } from "react";
import AdminButton from "./AdminButton";
import "./ProductForm.css";

function getInitialForm(product, categories) {
  return {
    name: product?.name || "",
    sku: product?.sku || "",
    categoryId: String(product?.categoryId || categories[0]?.id || ""),
    price: String(product?.price ?? ""),
    stockQuantity: String(product?.stockQuantity ?? ""),
    active: product?.active === false ? "false" : "true",
  };
}

export default function ProductForm({ categories, initialProduct, onCancel, onSave }) {
  const [form, setForm] = useState(() => getInitialForm(initialProduct, categories));

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    onSave({
      ...initialProduct,
      name: form.name.trim(),
      sku: form.sku.trim().toUpperCase(),
      categoryId: Number(form.categoryId),
      price: Number(form.price),
      stockQuantity: Number(form.stockQuantity),
      active: form.active === "true",
      brand: initialProduct?.brand || "Cherry Cheeks",
    });
  }

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <div className="product-form__field product-form__field--wide">
        <label htmlFor="product-name">Product name</label>
        <input
          id="product-name"
          name="name"
          value={form.name}
          onChange={updateField}
          autoComplete="off"
          required
        />
      </div>

      <div className="product-form__field">
        <label htmlFor="product-sku">SKU</label>
        <input
          id="product-sku"
          name="sku"
          value={form.sku}
          onChange={updateField}
          autoComplete="off"
          required
        />
      </div>

      <div className="product-form__field">
        <label htmlFor="product-category">Category</label>
        <select
          id="product-category"
          name="categoryId"
          value={form.categoryId}
          onChange={updateField}
          required
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
      </div>

      <div className="product-form__field">
        <label htmlFor="product-price">Price</label>
        <input
          id="product-price"
          name="price"
          type="number"
          min="0"
          step="0.01"
          value={form.price}
          onChange={updateField}
          required
        />
      </div>

      <div className="product-form__field">
        <label htmlFor="product-stock">Stock</label>
        <input
          id="product-stock"
          name="stockQuantity"
          type="number"
          min="0"
          step="1"
          value={form.stockQuantity}
          onChange={updateField}
          required
        />
      </div>

      <div className="product-form__field product-form__field--wide">
        <label htmlFor="product-status">Status</label>
        <select
          id="product-status"
          name="active"
          value={form.active}
          onChange={updateField}
        >
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
      </div>

      <div className="product-form__actions">
        <AdminButton type="button" onClick={onCancel}>Cancel</AdminButton>
        <AdminButton type="submit" variant="primary">
          {initialProduct ? "Save changes" : "Add product"}
        </AdminButton>
      </div>
    </form>
  );
}
