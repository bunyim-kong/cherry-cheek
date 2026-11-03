import { useState } from "react";
import AdminButton from "./AdminButton";
import "./CategoryForm.css";

export default function CategoryForm({ initialCategory, onCancel, onSave }) {
  const [form, setForm] = useState({
    name: initialCategory?.name || "",
    description: initialCategory?.description || "",
    image: initialCategory?.image || "",
  });

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    onSave({
      ...initialCategory,
      name: form.name.trim(),
      description: form.description.trim(),
      image: form.image.trim(),
    });
  }

  return (
    <form className="category-form" onSubmit={handleSubmit}>
      <div className="category-form__field">
        <label htmlFor="category-name">Category name</label>
        <input
          id="category-name"
          name="name"
          value={form.name}
          onChange={updateField}
          autoComplete="off"
          required
        />
      </div>

      <div className="category-form__field">
        <label htmlFor="category-description">Description</label>
        <textarea
          id="category-description"
          name="description"
          rows="3"
          value={form.description}
          onChange={updateField}
          required
        />
      </div>

      <div className="category-form__field">
        <label htmlFor="category-image">Image path</label>
        <input
          id="category-image"
          name="image"
          value={form.image}
          onChange={updateField}
          placeholder="/images/categories/example.jpg"
          autoComplete="off"
        />
        <p>Optional. A sample image is used when this is left blank.</p>
      </div>

      <div className="category-form__actions">
        <AdminButton type="button" onClick={onCancel}>Cancel</AdminButton>
        <AdminButton type="submit" variant="primary">
          {initialCategory ? "Save changes" : "Add category"}
        </AdminButton>
      </div>
    </form>
  );
}
