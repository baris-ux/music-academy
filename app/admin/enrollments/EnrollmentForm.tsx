"use client";

import { useActionState } from "react";

type Student = {
  id: string;
  firstName: string;
  lastName: string;
  user: {
    email: string;
  };
};

type Course = {
  id: string;
  title: string;
  capacity: number;
};

type FormState = {
  error: string | null;
  success: string | null;
};

export default function EnrollmentForm({
  students,
  courses,
  createEnrollment,
}: {
  students: Student[];
  courses: Course[];
  createEnrollment: (
    prevState: FormState,
    formData: FormData
  ) => Promise<FormState>;
}) {
  const [state, formAction, pending] = useActionState(createEnrollment, {
    error: null,
    success: null,
  });

  return (
    <form
      action={formAction}
      className="max-w-xl space-y-5 rounded-2xl border border-slate-300 bg-slate-50 p-6 shadow-sm"
    >
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-slate-900">
          Étudiant
        </label>
        <select
          name="studentId"
          required
          defaultValue=""
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-950 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-300"
        >
          <option value="" disabled>
            Choisir un étudiant
          </option>
          {students.map((student) => (
            <option key={student.id} value={student.id}>
              {student.firstName} {student.lastName} - {student.user.email}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-slate-900">
          Cours
        </label>
        <select
          name="courseId"
          required
          defaultValue=""
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-950 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-300"
        >
          <option value="" disabled>
            Choisir un cours
          </option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.title} (capacité : {course.capacity})
            </option>
          ))}
        </select>
      </div>

      {state.error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </div>
      )}

      {state.success && (
        <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          {state.success}
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {pending ? "Envoi..." : "Créer l’inscription"}
      </button>
    </form>
  );
}