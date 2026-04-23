"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export type AttendanceStatus = "PRESENT" | "ABSENT" | "LATE" | "EXCUSED";

export type AttendanceRecord = {
  studentId: string;
  status: AttendanceStatus;
};

export async function getSessionWithAttendance(sessionId: string) {
  const session = await prisma.session.findUnique({
    where: { id: sessionId },
    include: {
      course: true,
      attendances: true,
    },
  });

  if (!session) return null;

  const enrollments = await prisma.enrollment.findMany({
    where: { courseId: session.courseId },
    include: { student: true },
  });

  return { session, enrollments };
}

export async function saveAttendance(
  sessionId: string,
  records: AttendanceRecord[]
) {
  await Promise.all(
    records.map((record) =>
      prisma.attendance.upsert({
        where: {
          sessionId_studentId: {
            sessionId,
            studentId: record.studentId,
          },
        },
        update: { status: record.status },
        create: {
          sessionId,
          studentId: record.studentId,
          status: record.status,
        },
      })
    )
  );

  revalidatePath(`/admin/sessions/${sessionId}/attendance`);
  revalidatePath(`/admin/sessions`);

  return { success: true };
}