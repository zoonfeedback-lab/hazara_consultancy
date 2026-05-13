import prisma from "@/lib/prisma";
import { SettingsForm } from "@/components/admin/settings-form";

export default async function AdminSettingsPage() {
  const settings = await prisma.settings.findUnique({ where: { id: 1 } });

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold text-[#0F2447]">Settings</h1>
        <p className="mt-1 text-sm text-[#4B5563]">Update global consultancy details, social links, and homepage stats.</p>
      </div>
      <SettingsForm settings={settings} />
    </div>
  );
}
