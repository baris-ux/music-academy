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
    <form action={formAction} className="space-y-3 max-w-md border p-4 rounded">
      <select
        name="studentId"
        className="w-full border px-3 py-2 rounded"
        required
        defaultValue=""
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

      <select
        name="courseId"
        className="w-full border px-3 py-2 rounded"
        required
        defaultValue=""
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

      {state.error && (
        <p className="text-sm text-red-600">{state.error}</p>
      )}

      {state.success && (
        <p className="text-sm text-green-600">{state.success}</p>
      )}

      <button
        type="submit"
        className="border px-4 py-2 rounded"
        disabled={pending}
      >
        {pending ? "Envoi..." : "Créer inscription"}
      </button>
    </form>
  );
}