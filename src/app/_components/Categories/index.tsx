"use client";

import { useSearchParams, useRouter } from "next/navigation";
import qs from "query-string";
import { Category } from "@prisma/client";
import { useCallback } from "react";

interface CategoriesProps {
  categories?: Category[];
}

export const Categories = ({ categories = [] }: CategoriesProps) => {
  const params = useSearchParams();
  const router = useRouter();

  const categoryId = params?.get("categoryId");

  const handleClick = useCallback((id: string) => {
    const current = qs.parse(params?.toString() ?? "");
    const query = {
      ...current,
      categoryId: id,
    };

    if (current.categoryId === id) {
      delete query.categoryId;
    }

    const url = qs.stringifyUrl({ url: "/", query }, { skipNull: true });

    router.push(url);
  }, [params, router]);

  if (categories.length === 0) {
    return <div>No categories found.</div>;
  }

  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
      {categories.map((category) => (
        <div
          key={category.id}
          onClick={() => handleClick(category.id)}
          className={`text-sm px-3 py-2 border rounded-full cursor-pointer hover:border-black transition 
            ${categoryId === category.id ? "border-black bg-neutral-100" : "border-neutral-200"}`}
        >
          {category.name}
        </div>
      ))}
    </div>
  );
};
