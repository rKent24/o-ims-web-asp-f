import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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

interface ProductModalFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product | null;
  onSubmit: (form: ProductForm) => Promise<void>;
}

export default function ProductModalForm({
  open,
  onOpenChange,
  product,
  onSubmit,
}: ProductModalFormProps) {
  const [form, setForm] = useState<ProductForm>({
    code: "",
    name: "",
    price: 0,
  });

  useEffect(() => {
    setForm({
      code: product?.code ?? "",
      name: product?.name ?? "",
      price: product?.price ?? 0,
    });
  }, [product]);

  const handleSubmit = async () => {
    await onSubmit(form);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {product ? "Edit Product" : "Add Product"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            placeholder="Code"
            value={form.code}
            onChange={(e) =>
              setForm({
                ...form,
                code: e.target.value,
              })
            }
          />

          <Input
            placeholder="Name"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
          />

          <Input
            type="number"
            min="0"
            step="0.01"
            placeholder="Price"
            value={form.price}
            onChange={(e) =>
              setForm({
                ...form,
                price: Number(e.target.value),
              })
            }
          />

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>

            <Button type="button" onClick={handleSubmit}>
              {product ? "Save Changes" : "Create Product"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}