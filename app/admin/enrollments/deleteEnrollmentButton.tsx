"use client";

type Props = {
  enrollmentId: string;
  action: (formData: FormData) => void | Promise<void>;
};

export default function DeleteEnrollmentButton({
  enrollmentId,
  action,
}: Props) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        const ok = window.confirm(
          "Voulez-vous vraiment supprimer cette inscription ?"
        );

        if (!ok) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={enrollmentId} />

      <button
        type="submit"
        className="rounded-lg px-3 py-2 text-sm font-medium text-red-700 transition hover:bg-red-50 hover:text-red-800"
      >
        Supprimer
      </button>
    </form>
  );
}