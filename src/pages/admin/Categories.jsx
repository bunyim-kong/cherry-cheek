import { useEffect, useMemo, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import AdminButton from "../../components/admin/AdminButton";
import AdminModal from "../../components/admin/AdminModal";
import AdminPageState from "../../components/admin/AdminPageState";
import AdminPanel from "../../components/admin/AdminPanel";
import AdminSearch from "../../components/admin/AdminSearch";
import AdminTable from "../../components/admin/AdminTable";
import CategoryForm from "../../components/admin/CategoryForm";
import "./Categories.css";

const fallbackCategoryImage = "/images/categories/skincare.jpg";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [editorCategory, setEditorCategory] = useState(undefined);
  const [categoryToRemove, setCategoryToRemove] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadCategories() {
      try {
        const [categoryResponse, productResponse] = await Promise.all([
          fetch("/student-data/categories.json", { signal: controller.signal }),
          fetch("/student-data/products.json", { signal: controller.signal }),
        ]);

        if (!categoryResponse.ok || !productResponse.ok) {
          throw new Error("Unable to load categories.");
        }

        const [categoryData, productData] = await Promise.all([
          categoryResponse.json(),
          productResponse.json(),
        ]);

        setCategories(Array.isArray(categoryData) ? categoryData : []);
        setProducts(Array.isArray(productData) ? productData : []);
      } catch (loadError) {
        if (loadError.name !== "AbortError") {
          setError(loadError.message || "Unable to load categories.");
        }
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }

    loadCategories();
    return () => controller.abort();
  }, []);

  const filteredCategories = useMemo(() => {
    const query = search.trim().toLowerCase();

    return categories
      .map((category) => ({
        ...category,
        productCount: products.filter((product) => product.categoryId === category.id).length,
      }))
      .filter((category) => (
        !query || `${category.name} ${category.description}`.toLowerCase().includes(query)
      ));
  }, [categories, products, search]);

  function saveCategory(category) {
    const categoryWithImage = {
      ...category,
      image: category.image || fallbackCategoryImage,
    };

    if (category.id) {
      setCategories((current) => current.map((entry) => (
        entry.id === category.id ? categoryWithImage : entry
      )));
    } else {
      const nextId = categories.reduce((largest, entry) => Math.max(largest, entry.id), 0) + 1;
      setCategories((current) => [{ ...categoryWithImage, id: nextId }, ...current]);
    }

    setEditorCategory(undefined);
  }

  function removeCategory() {
    setCategories((current) => current.filter((category) => category.id !== categoryToRemove.id));
    setCategoryToRemove(null);
  }

  const columns = [
    {
      key: "category",
      label: "Category",
      render: (category) => (
        <div className="admin-categories__category">
          <img src={category.image} alt="" width="52" height="52" loading="lazy" />
          <div>
            <span className="admin-table__primary">{category.name}</span>
            <span className="admin-table__secondary">{category.description}</span>
          </div>
        </div>
      ),
    },
    {
      key: "products",
      label: "Products",
      align: "right",
      render: (category) => (
        <span className="admin-categories__count">{category.productCount}</span>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      align: "right",
      render: (category) => (
        <div className="admin-categories__actions">
          <AdminButton
            type="button"
            variant="ghost"
            iconOnly
            aria-label={`Edit ${category.name}`}
            title="Edit category"
            onClick={() => setEditorCategory(category)}
          >
            <Pencil size={17} aria-hidden="true" />
          </AdminButton>
          <AdminButton
            type="button"
            variant="ghost-danger"
            iconOnly
            aria-label={`Remove ${category.name}`}
            title="Remove category"
            onClick={() => setCategoryToRemove(category)}
          >
            <Trash2 size={17} aria-hidden="true" />
          </AdminButton>
        </div>
      ),
    },
  ];

  if (isLoading) return <AdminPageState>Loading categories…</AdminPageState>;
  if (error) return <AdminPageState error>{error} Please refresh to try again.</AdminPageState>;

  return (
    <section className="admin-categories">
      <AdminPanel
        id="categories-list-title"
        eyebrow="Static catalog"
        title="Categories"
        action={(
          <div className="admin-categories__toolbar">
            <AdminSearch
              label="Search categories"
              placeholder="Search categories"
              value={search}
              onChange={setSearch}
            />
            <AdminButton type="button" variant="primary" onClick={() => setEditorCategory(null)}>
              <Plus size={17} aria-hidden="true" />
              Add category
            </AdminButton>
          </div>
        )}
      >
        <AdminTable
          caption="Product categories"
          columns={columns}
          rows={filteredCategories}
          getRowKey={(category) => category.id}
          minWidth="680px"
          emptyMessage={search ? "No categories match your search." : "No categories found."}
        />
      </AdminPanel>

      <AdminModal
        isOpen={editorCategory !== undefined}
        onClose={() => setEditorCategory(undefined)}
        title={editorCategory ? "Edit category" : "Add category"}
        description="This demo updates the current page only and does not save to a server."
      >
        <CategoryForm
          key={editorCategory?.id || "new-category"}
          initialCategory={editorCategory}
          onCancel={() => setEditorCategory(undefined)}
          onSave={saveCategory}
        />
      </AdminModal>

      <AdminModal
        isOpen={Boolean(categoryToRemove)}
        onClose={() => setCategoryToRemove(null)}
        title="Remove category?"
        description="This only removes the category until the page is refreshed."
      >
        <p className="admin-categories__remove-copy">
          Remove <strong>{categoryToRemove?.name}</strong> from the demo catalog?
        </p>
        <div className="admin-categories__remove-actions">
          <AdminButton type="button" onClick={() => setCategoryToRemove(null)}>
            Cancel
          </AdminButton>
          <AdminButton type="button" variant="danger" onClick={removeCategory}>
            Remove category
          </AdminButton>
        </div>
      </AdminModal>
    </section>
  );
}
