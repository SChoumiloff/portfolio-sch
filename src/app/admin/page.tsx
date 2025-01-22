"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/hooks/useAuth";
import AuthDialog from "@/components/auth-drawer";
import { columns } from "@/components/links/columns";
import { DataTable } from "@/components/links/data-table";
import { Suspense } from "react";
import { CreateLinkDialog } from "@/components/create-link-dialog";
import { useLinks } from "@/hooks/useLinks";

export default function AdminPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated, checkAuth } = useAuthStore();
  const showAuthDialog = searchParams.get("auth") === "required";
  const { links, isLoading, refreshLinks } = useLinks();

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
    if (isAuthenticated) {
      refreshLinks();
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
              <CreateLinkDialog onSuccess={refreshLinks} />
            </div>
          </div>
          {isLoading ? (
            <div className="flex items-center justify-center min-h-[200px]">
              <div className="flex flex-col items-center gap-2">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 "></div>
                <p className="text-sm">Chargement des liens...</p>
              </div>
            </div>
          ) : (
            <DataTable columns={columns} data={links} />
          )}
        </div>
      </Suspense>
    </div>
  );
}