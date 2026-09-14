import { useEffect, useState } from "react";

import { Pencil, Trash2 } from "lucide-react";

import api from "../api/axios";

import ProductModalForm from "../components/ProductModalForm";
import DeleteModal from "../components/DeleteModal";

interface Product {
  id: string;
  code: string;
  name: string;
  price: number;
}

interface ProductForm {
  code: string;
  name: string;
  price: number;
}

function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);

  const getProducts = async () => {
    try {
      const response = await api.get<Product[]>("/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get<Product[]>("/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleCreate = () => {
    setEditingProduct(null);
    setFormOpen(true);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormOpen(true);
  };

  const handleDelete = (product: Product) => {
    setDeletingProduct(product);
    setDeleteOpen(true);
  };

  const handleSubmit = async (form: ProductForm) => {
    try {
      if (editingProduct) {
        await api.put(`/products/${editingProduct.id}`, form);
      } else {
        await api.post("/products", form);
      }

      await getProducts();

      setFormOpen(false);
      setEditingProduct(null);
    } catch (error) {
      console.error("Failed to save product:", error);
    }
  };

  const confirmDelete = async () => {
    if (!deletingProduct) return;

    try {
      await api.delete(`/products/${deletingProduct.id}`);

      await getProducts();

      setDeleteOpen(false);
      setDeletingProduct(null);
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Products</h1>

        <button
          className="rounded-lg bg-primary px-4 py-2 font-semibold text-primary-foreground hover:bg-primary/90"
          onClick={handleCreate}
        >
          Add Product
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <p className="mt-10 text-muted-foreground">Loading products...</p>
      ) : products.length === 0 ? (
        <div className="mt-6 rounded-lg border border-border bg-card p-8 text-center">
          <p className="text-lg text-muted-foreground">No products yet.</p>

          <p className="mt-2 text-sm text-muted-foreground">
            Add your first product to get started.
          </p>
        </div>
      ) : (
        <div className="mt-6 overflow-hidden rounded-lg border border-border bg-card">
          {/* Table Header */}
          <div className="flex items-center gap-6 border-b border-border bg-muted px-4 py-3 text-sm font-medium text-muted-foreground">
            <div className="w-32 shrink-0">Code</div>

            <div className="min-w-0 flex-1">Product</div>

            <div className="w-28 shrink-0">Price</div>

            <div className="w-20 shrink-0" />
          </div>

          {/* Products */}
          {products.map((product) => (
            <div
              key={product.id}
              className="group flex items-center gap-6 border-b border-border px-4 py-3 last:border-b-0"
            >
              <div className="w-32 shrink-0">
                <p className="text-sm font-medium text-muted-foreground">
                  {product.code}
                </p>
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">{product.name}</p>
              </div>

              <div className="w-28 shrink-0">
                <p className="font-medium text-green-500">
                  ₱{product.price.toFixed(2)}
                </p>
              </div>

              <div className="flex w-20 shrink-0 justify-end gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                <button
                  className="rounded-md p-1.5 text-blue-500 transition-colors hover:bg-blue-500/10 hover:text-blue-400"
                  onClick={() => handleEdit(product)}
                  aria-label="Edit product"
                  title="Edit product"
                >
                  <Pencil className="h-4 w-4" />
                </button>

                <button
                  className="rounded-md p-1.5 text-red-500 transition-colors hover:bg-red-500/10 hover:text-red-400"
                  onClick={() => handleDelete(product)}
                  aria-label="Delete product"
                  title="Delete product"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Product Form */}
      <ProductModalForm
        key={editingProduct?.id ?? "create"}
        open={formOpen}
        onOpenChange={setFormOpen}
        product={editingProduct}
        onSubmit={handleSubmit}
      />

      {/* Delete Confirmation */}
      <DeleteModal
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        product={deletingProduct}
        onConfirm={confirmDelete}
      />
    </div>
  );
}

export default Products;
