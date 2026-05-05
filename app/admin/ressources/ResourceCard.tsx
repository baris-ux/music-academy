"use client";

import { useActionState, useState } from "react";

type Student = {
  id: string;
  firstName: string;
  lastName: string;
};

type Access = {
  id: string;
  studentId: string;
  student: Student;
};

type Resource = {
  id: string;
  title: string;
  description: string | null;
  fileName: string;
  fileUrl: string;
  accesses: Access[];
};

type Props = {
  resource: Resource;
  students: Student[];
  updateAccess: (
    prevState: { error: string | null; success: string | null },
    formData: FormData
  ) => Promise<{ error: string | null; success: string | null }>;
  deleteResource: (formData: FormData) => Promise<void>;
  getSignedResourceUrl: (fileUrl: string) => Promise<string>;
};

export default function ResourceCard({
  resource,
  students,
  updateAccess,
  deleteResource,
  getSignedResourceUrl,
}: Props) {
  const [open, setOpen] = useState(false);
  const [loadingUrl, setLoadingUrl] = useState(false);
  const [state, formAction, isPending] = useActionState(updateAccess, {
    error: null,
    success: null,
  });

  const accessStudentIds = resource.accesses.map((a) => a.studentId);

  async function handleView() {
    window.open(resource.fileUrl, "_blank");
  }

  return (
    <div className="rounded-2xl border border-slate-300 bg-white px-5 py-4 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <p className="font-semibold text-slate-950">{resource.title}</p>
          {resource.description && (
            <p className="mt-0.5 text-sm text-slate-600">{resource.description}</p>
          )}
          <p className="mt-1 text-xs text-slate-500">{resource.fileName}</p>
          <div className="mt-2 flex flex-wrap gap-1">
            {resource.accesses.length === 0 ? (
              <span className="text-xs text-slate-400">Aucun accès accordé</span>
            ) : (
              resource.accesses.map((access) => (
                <span
                  key={access.id}
                  className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-700"
                >
                  {access.student.firstName} {access.student.lastName}
                </span>
              ))
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleView}
            disabled={loadingUrl}
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:opacity-50"
          >
            {loadingUrl ? "Chargement..." : "Voir"}
          </button>
          <button
            onClick={() => setOpen(!open)}
            className="rounded-lg px-3 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-50"
          >
            {open ? "Fermer" : "Gérer les accès"}
          </button>
          <form action={deleteResource}>
            <input type="hidden" name="id" value={resource.id} />
            <input type="hidden" name="fileUrl" value={resource.fileUrl} />
            <button
              type="submit"
              onClick={(e) => {
                if (!confirm(`Supprimer "${resource.title}" ?`)) e.preventDefault();
              }}
              className="rounded-lg px-3 py-2 text-sm font-medium text-red-700 transition hover:bg-red-50"
            >
              Supprimer
            </button>
          </form>
        </div>
      </div>

      {open && (
        <div className="mt-4 border-t border-slate-200 pt-4">
          <p className="mb-3 text-sm font-medium text-slate-700">
            Sélectionner les élèves ayant accès à cette ressource :
          </p>
          <form action={formAction} className="space-y-3">
            <input type="hidden" name="resourceId" value={resource.id} />
            <div className="max-h-48 space-y-2 overflow-y-auto">
              {students.map((student) => (
                <label
                  key={student.id}
                  className="flex items-center gap-2 text-sm text-slate-700"
                >
                  <input
                    type="checkbox"
                    name="studentIds"
                    value={student.id}
                    defaultChecked={accessStudentIds.includes(student.id)}
                  />
                  {student.firstName} {student.lastName}
                </label>
              ))}
            </div>

            {state.error && (
              <p className="text-sm text-red-600">{state.error}</p>
            )}
            {state.success && (
              <p className="text-sm text-green-600">{state.success}</p>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700 disabled:opacity-50"
            >
              {isPending ? "Enregistrement..." : "Enregistrer les accès"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}