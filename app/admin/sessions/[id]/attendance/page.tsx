import { notFound } from "next/navigation";
import { getSessionWithAttendance } from "./actions";
import AttendanceClient from "./AttendanceClient";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function AttendancePage({ params }: Props) {
  const { id } = await params;

  const data = await getSessionWithAttendance(id);

  if (!data) notFound();

  return (
    <AttendanceClient
      session={data.session}
      enrollments={data.enrollments}
    />
  );
}