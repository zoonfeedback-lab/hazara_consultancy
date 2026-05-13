import prisma from "@/lib/prisma";
import { ProgramsManager } from "@/components/admin/programs-manager";

export default async function AdminProgramsPage() {
  const programs = await prisma.program.findMany({
    orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }],
  });

  return <ProgramsManager programs={programs} />;
}
