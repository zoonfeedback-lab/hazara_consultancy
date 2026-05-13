import { notFound } from "next/navigation";
import { ProgramForm } from "@/components/admin/program-form";
import prisma from "@/lib/prisma";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function AdminProgramEditPage({ params }: Props) {
  const { id } = await params;
  const program = await prisma.program.findUnique({ where: { id } });

  if (!program) {
    notFound();
  }

  return <ProgramForm program={program} />;
}
