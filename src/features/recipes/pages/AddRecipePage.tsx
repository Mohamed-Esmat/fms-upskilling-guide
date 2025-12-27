import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { PageHeader } from "@/components/layout";
import { Button } from "@/components/ui";
import { RecipeForm } from "../components/RecipeForm";
import { useCreateRecipe } from "../hooks";

export function AddRecipePage() {
  const navigate = useNavigate();
  const { mutate: createRecipe, isPending } = useCreateRecipe();

  const handleSubmit = (formData: FormData) => {
    createRecipe(formData, {
      onSuccess: () => {
        navigate("/dashboard/recipes");
      },
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Add New"
        highlightedText="Recipe"
        description="Fill in the details below to add a new recipe to your collection"
      />

      <div className="bg-white rounded-2xl p-6">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/dashboard/recipes")}
            leftIcon={<ArrowLeft className="h-5 w-5" />}
          >
            Back to Recipes
          </Button>
        </div>

        <RecipeForm onSubmit={handleSubmit} isLoading={isPending} />
      </div>
    </div>
  );
}
