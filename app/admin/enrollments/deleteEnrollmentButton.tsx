"use client";

import { useState } from "react";

type Props = {
  enrollmentId: string;
  studentName: string;
  courseTitle: string;
  action: (formData: FormData) => void | Promise<void>;
};

export default function DeleteEnrollmentButton({
  enrollmentId,
  studentName,
  courseTitle,
  action,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-lg px-3 py-2 text-sm font-medium text-red-700 transition hover:bg-red-50 hover:text-red-800"
      >
        Supprimer
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-700">
                !
              </div>

              <div className="flex-1">
                <h2 className="text-lg font-semibold text-slate-950">
                  Supprimer cette inscription ?
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Vous êtes sur le point de supprimer l’inscription de{""}
                  <span className="font-medium text-slate-900">
                    {studentName}
                  </span>{" "}
                  au cours{" "}
                  <span className="font-medium text-slate-900">
                    {courseTitle}
                  </span>.
                </p>

                <p className="mt-2 text-sm text-red-600">
                  Cette action est irréversible.
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Annuler
              </button>

              <form action={action}>
                <input type="hidden" name="id" value={enrollmentId} />
                <button
                  type="submit"
                  className="rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
                >
                  Supprimer définitivement
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}