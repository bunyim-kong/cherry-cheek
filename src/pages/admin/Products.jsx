import { useEffect, useMemo, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import AdminButton from "../../components/admin/AdminButton";
import AdminModal from "../../components/admin/AdminModal";
import AdminPageState from "../../components/admin/AdminPageState";
import AdminPanel from "../../components/admin/AdminPanel";
import AdminSearch from "../../components/admin/AdminSearch";
import AdminTable from "../../components/admin/AdminTable";
import ProductForm from "../../components/admin/ProductForm";
import StatusBadge from "../../components/admin/StatusBadge";
import "./Products.css";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function Products() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [editorProduct, setEditorProduct] = useState(undefined);
  const [productToRemove, setProductToRemove] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadCatalog() {
      try {
        const [productResponse, categoryResponse] = await Promise.all([
          fetch("/student-data/products.json", { signal: controller.signal }),
          fetch("/student-data/categories.json", { signal: controller.signal }),
        ]);

        if (!productResponse.ok || !categoryResponse.ok) {
          throw new Error("Unable to load the product catalog.");
        }

        const [productData, categoryData] = await Promise.all([
          productResponse.json(),
          categoryResponse.json(),
        ]);

        setProducts(Array.isArray(productData) ? productData : []);
        setCategories(Array.isArray(categoryData) ? categoryData : []);
      } catch (loadError) {
        if (loadError.name !== "AbortError") {
          setError(loadError.message || "Unable to load the product catalog.");
        }
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }

    loadCatalog();
    return () => controller.abort();
  }, []);

  const categoryNames = useMemo(
    () => new Map(categories.map((category) => [category.id, category.name])),
    [categories],
  );

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return products;

    return products.filter((product) => [
      product.name,
      product.sku,
      product.brand,
      categoryNames.get(product.categoryId),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
      .includes(query));
  }, [categoryNames, products, search]);

  function saveProduct(product) {
    if (product.id) {
      setProducts((current) => current.map((entry) => (
        entry.id === product.id ? product : entry
      )));
    } else {
      const category = categories.find((entry) => entry.id === product.categoryId);
      const nextId = products.reduce((largest, entry) => Math.max(largest, entry.id), 0) + 1;

      setProducts((current) => [
        {
          ...product,
          id: nextId,
          image: category?.image || "",
          isNew: true,
        },
        ...current,
      ]);
    }

    setEditorProduct(undefined);
  }

  function removeProduct() {
    setProducts((current) => current.filter((product) => product.id !== productToRemove.id));
    setProductToRemove(null);
  }

  const columns = [
    {
      key: "product",
      label: "Product",
      render: (product) => (
        <div className="admin-products__product">
          <img src={product.image} alt="" width="48" height="48" loading="lazy" />
          <div>
            <span className="admin-table__primary">{product.name}</span>
            <span className="admin-table__secondary">{product.sku}</span>
          </div>
        </div>
      ),
    },
    {
      key: "category",
      label: "Category",
      render: (product) => categoryNames.get(product.categoryId) || "Uncategorized",
    },
    {
      key: "price",
      label: "Price",
      align: "right",
      render: (product) => (
        <span className="admin-products__number">{currencyFormatter.format(product.price)}</span>
      ),
    },
    {
      key: "stock",
      label: "Stock",
      align: "right",
      render: (product) => (
        <span className="admin-products__number">{product.stockQuantity}</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (product) => (
        <StatusBadge tone={product.active ? "active" : "inactive"}>
          {product.active ? "Active" : "Inactive"}
        </StatusBadge>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      align: "right",
      render: (product) => (
        <div className="admin-products__actions">
          <AdminButton
            type="button"
            variant="ghost"
            iconOnly
            aria-label={`Edit ${product.name}`}
            title="Edit product"
            onClick={() => setEditorProduct(product)}
          >
            <Pencil size={17} aria-hidden="true" />
          </AdminButton>
          <AdminButton
            type="button"
            variant="ghost-danger"
            iconOnly
            aria-label={`Remove ${product.name}`}
            title="Remove product"
            onClick={() => setProductToRemove(product)}
          >
            <Trash2 size={17} aria-hidden="true" />
          </AdminButton>
        </div>
      ),
    },
  ];

  if (isLoading) return <AdminPageState>Loading products…</AdminPageState>;

  if (error) {
    return <AdminPageState error>{error} Please refresh the page to try again.</AdminPageState>;
  }

  return (
    <section className="admin-products">
      <AdminPanel
        id="products-catalog-title"
        eyebrow="Static catalog"
        title="All products"
        action={(
          <div className="admin-products__toolbar">
            <AdminSearch
              label="Search products"
              placeholder="Search products"
              value={search}
              onChange={setSearch}
            />
            <AdminButton type="button" variant="primary" onClick={() => setEditorProduct(null)}>
              <Plus size={17} aria-hidden="true" />
              Add product
            </AdminButton>
          </div>
        )}
      >
        <AdminTable
          caption="Product catalog"
          columns={columns}
          rows={filteredProducts}
          getRowKey={(product) => product.id}
          minWidth="920px"
          emptyMessage={search ? "No products match your search." : "No products found."}
        />
      </AdminPanel>

      <AdminModal
        isOpen={editorProduct !== undefined}
        onClose={() => setEditorProduct(undefined)}
        title={editorProduct ? "Edit product" : "Add product"}
        description="This demo updates the current page only and does not save to a server."
      >
        <ProductForm
          key={editorProduct?.id || "new-product"}
          categories={categories}
          initialProduct={editorProduct}
          onCancel={() => setEditorProduct(undefined)}
          onSave={saveProduct}
        />
      </AdminModal>

      <AdminModal
        isOpen={Boolean(productToRemove)}
        onClose={() => setProductToRemove(null)}
        title="Remove product?"
        description="This only removes the product until the page is refreshed."
      >
        <p className="admin-products__remove-copy">
          Remove <strong>{productToRemove?.name}</strong> from the demo catalog?
        </p>
        <div className="admin-products__remove-actions">
          <AdminButton type="button" onClick={() => setProductToRemove(null)}>
            Cancel
          </AdminButton>
          <AdminButton type="button" variant="danger" onClick={removeProduct}>
            Remove product
          </AdminButton>
        </div>
      </AdminModal>
    </section>
  );
}
