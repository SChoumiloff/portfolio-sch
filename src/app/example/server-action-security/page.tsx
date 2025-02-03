"use client"

import { Button } from "@/components/ui/button";
import React from "react";
import { getSecret } from "./actions";

export default function Example() {
    const [secret, setSecret] = React.useState<string | null>(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [password, setPassword] = React.useState("");

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === "secret123") {
            setIsAuthenticated(true);
            setError(null);
            setPassword("");
        } else {
            setError("Mot de passe incorrect");
        }
    };

    const handleClick = async () => {
        setLoading(true);
        try {
            const data = await getSecret();
            setSecret(data.data);
        } catch (error) {
            setError("Une erreur est survenue lors de la récupération des users");
        } finally {
            setLoading(false);
        }
    }

    if (!isAuthenticated) {
        return (
            <div className="flex flex-col min-h-[100dvh] max-w-2xl mx-auto space-y-4 items-center">

                <h1 className="text-2xl font-bold">Se connecter (secret123)</h1>
                <form onSubmit={handleLogin} className="space-y-4 space-x-4">
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Entrez le mot de passe"
                        className="px-4 py-2 border rounded"
                    />
                    <Button type="submit">Se connecter</Button>
                    {error && <p className="text-red-500">{error}</p>}
                </form>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-[100dvh] max-w-2xl mx-auto space-y-10">
            <div className="flex justify-between items-center">
                <Button onClick={handleClick} disabled={loading}>Récupérer mon secret</Button>
                <Button 
                    onClick={() => {
                        setIsAuthenticated(false)
                        setSecret(null)
                    }} 
                    variant="outline"
                >
                    Se déconnecter
                </Button>
            </div>
            
            {secret && (
                <pre className="rounded-lg overflow-auto">
                    {JSON.stringify(secret, null, 2)}
                </pre>
            )}

            {error && <p className="text-red-500">{error}</p>}
        </div>
    )
}
