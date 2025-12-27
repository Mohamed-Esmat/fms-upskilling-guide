import { useEffect, useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImagePlus, Search, X, Check } from "lucide-react";
import { Input, Button, Select } from "@/components/ui";
import { useCategories, useTags } from "../hooks";
import { recipeSchema } from "@/lib/validations";
import type { RecipeFormValues } from "@/lib/validations";
import type { Recipe, Category } from "@/types";
import { cn, getImageUrl } from "@/lib/utils";

interface RecipeFormProps {
  recipe?: Recipe;
  onSubmit: (data: FormData) => void;
  isLoading?: boolean;
}

export function RecipeForm({ recipe, onSubmit, isLoading }: RecipeFormProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [categorySearch, setCategorySearch] = useState("");
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  const { data: tagsData } = useTags();
  const { data: categoriesData } = useCategories({ pageSize: 100 });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RecipeFormValues>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      name: recipe?.name || "",
      description: recipe?.description || "",
      price: recipe?.price || 0,
      tagId: recipe?.tag?.id || 0,
      categoriesIds: recipe?.category?.map((c) => c.id) || [],
    },
  });

  // Filter categories based on search
  const filteredCategories = useMemo(() => {
    const categories = categoriesData?.data || [];
    if (!categorySearch.trim()) return categories;
    return categories.filter((cat) =>
      cat.name.toLowerCase().includes(categorySearch.toLowerCase())
    );
  }, [categoriesData?.data, categorySearch]);

  // Get selected category objects for display
  const selectedCategoryObjects = useMemo(() => {
    const categories = categoriesData?.data || [];
    return selectedCategories
      .map((id) => categories.find((c) => c.id === id))
      .filter((c): c is Category => c !== undefined);
  }, [categoriesData?.data, selectedCategories]);

  useEffect(() => {
    if (recipe) {
      setValue("name", recipe.name);
      setValue("description", recipe.description);
      setValue("price", recipe.price);
      setValue("tagId", recipe.tag?.id || 0);
      const categoryIds = recipe.category?.map((c) => c.id) || [];
      setValue("categoriesIds", categoryIds);
      setSelectedCategories(categoryIds);
      if (recipe.imagePath) {
        setImagePreview(getImageUrl(recipe.imagePath));
      }
    }
  }, [recipe, setValue]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCategoryToggle = (categoryId: number) => {
    setSelectedCategories((prev) => {
      const newCategories = prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId];
      setValue("categoriesIds", newCategories);
      return newCategories;
    });
  };

  const handleRemoveCategory = (categoryId: number) => {
    setSelectedCategories((prev) => {
      const newCategories = prev.filter((id) => id !== categoryId);
      setValue("categoriesIds", newCategories);
      return newCategories;
    });
  };

  const handleFormSubmit = (data: RecipeFormValues) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price.toString());
    formData.append("tagId", data.tagId.toString());

    // Send categoriesIds - the API might expect different formats, trying multiple approaches:
    if (data.categoriesIds && data.categoriesIds.length > 0) {
      // Try sending each ID separately with the same field name (most common for multipart)
      data.categoriesIds.forEach((id) => {
        formData.append("categoriesIds", String(id));
      });
    }

    if (selectedImage) {
      formData.append("recipeImage", selectedImage);
    }

    // Debug: log FormData contents
    console.log("FormData contents:");
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    onSubmit(formData);
  };

  const tagOptions = (tagsData || []).map((tag) => ({
    value: tag.id,
    label: tag.name,
  }));

  const watchTagId = watch("tagId");

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {/* Image upload */}
      <div className="flex flex-col items-center">
        <label
          htmlFor="recipeImage"
          className={cn(
            "flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer",
            "bg-gray-50 hover:bg-gray-100 transition-colors",
            imagePreview ? "border-green-500" : "border-gray-300"
          )}
        >
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Preview"
              className="h-full w-full object-cover rounded-lg"
            />
          ) : (
            <div className="flex flex-col items-center justify-center py-6">
              <ImagePlus className="h-12 w-12 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">
                Click to upload recipe image
              </p>
            </div>
          )}
          <input
            id="recipeImage"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>
      </div>

      {/* Form fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Recipe Name"
          placeholder="Enter recipe name"
          error={errors.name?.message}
          {...register("name")}
        />

        <Input
          label="Price"
          type="number"
          step="1"
          placeholder="Enter price"
          error={errors.price?.message}
          {...register("price", { valueAsNumber: true })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          placeholder="Enter recipe description"
          className={cn(
            "flex w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm min-h-24",
            "placeholder:text-gray-400",
            "focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent",
            errors.description && "border-red-500 focus:ring-red-500"
          )}
          {...register("description")}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-500">
            {errors.description.message}
          </p>
        )}
      </div>

      <Select
        label="Tag"
        value={watchTagId?.toString() || ""}
        onChange={(value) => setValue("tagId", Number(value))}
        options={tagOptions}
        placeholder="Select a tag"
        error={errors.tagId?.message}
      />

      {/* Categories with improved UI */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Categories
        </label>

        {/* Selected categories chips */}
        {selectedCategoryObjects.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {selectedCategoryObjects.map((category) => (
              <span
                key={category.id}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-green-100 text-green-800 border border-green-200"
              >
                {category.name}
                <button
                  type="button"
                  onClick={() => handleRemoveCategory(category.id)}
                  className="hover:bg-green-200 rounded-full p-0.5 transition-colors"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Category search and dropdown */}
        <div className="relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search categories..."
              value={categorySearch}
              onChange={(e) => setCategorySearch(e.target.value)}
              onFocus={() => setShowCategoryDropdown(true)}
              className={cn(
                "w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 text-sm",
                "focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent",
                "placeholder:text-gray-400"
              )}
            />
          </div>

          {/* Dropdown */}
          {showCategoryDropdown && (
            <>
              {/* Backdrop */}
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowCategoryDropdown(false)}
              />

              {/* Dropdown menu */}
              <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {filteredCategories.length === 0 ? (
                  <div className="px-4 py-3 text-sm text-gray-500 text-center">
                    No categories found
                  </div>
                ) : (
                  <div className="py-1">
                    {filteredCategories.map((category) => {
                      const isSelected = selectedCategories.includes(
                        category.id
                      );
                      return (
                        <button
                          key={category.id}
                          type="button"
                          onClick={() => handleCategoryToggle(category.id)}
                          className={cn(
                            "w-full px-4 py-2.5 text-left text-sm flex items-center justify-between gap-2",
                            "hover:bg-gray-50 transition-colors",
                            isSelected && "bg-green-50"
                          )}
                        >
                          <span
                            className={cn(
                              "truncate",
                              isSelected && "text-green-700 font-medium"
                            )}
                          >
                            {category.name}
                          </span>
                          {isSelected && (
                            <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Selected count */}
        <p className="mt-2 text-xs text-gray-500">
          {selectedCategories.length}{" "}
          {selectedCategories.length === 1 ? "category" : "categories"} selected
        </p>

        {errors.categoriesIds && (
          <p className="mt-1 text-sm text-red-500">
            {errors.categoriesIds.message}
          </p>
        )}
      </div>

      <Button type="submit" isLoading={isLoading} className="w-full">
        {recipe ? "Update Recipe" : "Add Recipe"}
      </Button>
    </form>
  );
}
