import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { PageHeader } from "@/components/layout";
import { Button, Spinner } from "@/components/ui";
import { RecipeForm } from "../components/RecipeForm";
import { useRecipe, useUpdateRecipe } from "../hooks";

export function EditRecipePage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const recipeId = Number(id);

  const { data: recipe, isLoading } = useRecipe(recipeId);
  const { mutate: updateRecipe, isPending } = useUpdateRecipe();

  const handleSubmit = (formData: FormData) => {
    updateRecipe(
      { id: recipeId, data: formData },
      {
        onSuccess: () => {
          navigate("/dashboard/recipes");
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <Spinner size="lg" />
      </div>
    );
  }

  // Recipe not found
  if (!recipe) {
    return (
      <div className="flex flex-col items-center justify-center min-h-96 gap-4">
        <p className="text-gray-500">Recipe not found</p>
        <Button
          variant="ghost"
          onClick={() => navigate("/dashboard/recipes")}
          leftIcon={<ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />}
        >
          Back to Recipes
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4 lg:space-y-6">
      <PageHeader
        title="Edit"
        highlightedText="Recipe"
        description="Update the recipe details below"
      />

      <div className="bg-white rounded-xl lg:rounded-2xl p-4 sm:p-6">
        <div className="flex items-center gap-4 mb-4 sm:mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/dashboard/recipes")}
            leftIcon={<ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />}
            className="text-sm sm:text-base"
          >
            <span className="hidden sm:inline">Back to Recipes</span>
            <span className="sm:hidden">Back</span>
          </Button>
        </div>

        <RecipeForm
          recipe={recipe}
          onSubmit={handleSubmit}
          isLoading={isPending}
        />
      </div>
    </div>
  );
}
