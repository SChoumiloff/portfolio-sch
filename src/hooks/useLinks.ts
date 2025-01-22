import { useState } from 'react';
import { LinkWithViews } from '@/components/links/columns';
import { getLinks } from '@/app/admin/actions';
import { toast } from 'sonner';

export const useLinks = () => {
  const [links, setLinks] = useState<LinkWithViews[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLinks = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await getLinks();
      if (response.success) {
        setLinks(response.data);
      } else {
        throw new Error(response.error || 'Erreur lors de la récupération des liens');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur lors de la récupération des liens';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshLinks = () => {
    fetchLinks();
  };

  return {
    links,
    isLoading,
    error,
    refreshLinks
  };
}; 