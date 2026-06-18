"use client";

/** Submit button that confirms before firing its form's delete action. */
export function DeleteButton({ label = "Delete" }: { label?: string }) {
  return (
    <button
      type="submit"
      onClick={(e) => {
        if (!confirm("Are you sure you want to delete this? This cannot be undone.")) {
          e.preventDefault();
        }
      }}
      className="text-sm font-medium text-danger hover:underline"
    >
      {label}
    </button>
  );
}
