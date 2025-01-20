"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/hooks/useAuth";
import AuthDialog from "@/components/auth-drawer";
import { columns } from "@/components/links/columns";
import { DataTable } from "@/components/links/data-table";
import { Suspense } from "react";
import { CreateLinkDialog } from "@/components/create-link-dialog";
import { getLinks } from "@/app/admin/actions";
import { LinkWithViews } from "@/components/links/columns";

export default function AdminPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated, checkAuth } = useAuthStore();
  const showAuthDialog = searchParams.get("auth") === "required";
  const [links, setLinks] = useState<LinkWithViews[]>([]);

  useEffect(() => {
    const verifyAuth = async () => {
      const isAuth = await checkAuth();
      if (!isAuth && !showAuthDialog) {
        router.push("/admin?auth=required");
      } else if (isAuth && showAuthDialog) {
        router.replace("/admin");
      }
    };

    verifyAuth();
  }, [checkAuth, showAuthDialog, router, isAuthenticated]);

  useEffect(() => {
    const fetchLinks = async () => {
      const response = await getLinks();
      if (response.success) {
        setLinks(response.data);
      }
    };

    if (isAuthenticated) {
      fetchLinks();
    }
  }, [isAuthenticated]);

  if (showAuthDialog && !isAuthenticated) {
    return (
      <AuthDialog 
        open={true} 
        onClose={() => {
          if (!isAuthenticated) {
            router.push("/");
          } else {
            router.replace("/admin");
          }
        }} 
      />
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Gestion des liens</h1>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <CreateLinkDialog />
            </div>
          </div>
          <DataTable columns={columns} data={links} />
        </div>
      </Suspense>
    </div>
  );
}