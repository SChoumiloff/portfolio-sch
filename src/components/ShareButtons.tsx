'use client';

import { useRef, useState, useEffect } from 'react';
import { LinkedInLogoIcon, Share1Icon, TwitterLogoIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';

interface ShareButtonsProps {
  url: string;
  title: string;
  description?: string;
  keywords?: string[];
}

export function ShareButtons({ url, title, description, keywords }: ShareButtonsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const shareOptions = [
    {
      name: 'X',
      icon: <TwitterLogoIcon className="h-4 w-4" />,
      link: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}${description ? `\n\n${encodeURIComponent(description)}` : ''}&url=${encodeURIComponent(url)}`,
    },
    {
      name: 'LinkedIn',
      icon: <LinkedInLogoIcon className="h-4 w-4" />,
      link: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}${description ? `&summary=${encodeURIComponent(description)}` : ''}`
    },
    {
      name: 'Copier',
      icon: <Share1Icon className="h-4 w-4" />,
      link: null,
    },
  ];

  const handleShare = async (link: string | null) => {
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer');
    } else {
      try {
        await navigator.clipboard.writeText(url);
        toast.info('Lien copié dans votre presse-papiers !');
      } catch (err) {
        toast.error('Erreur lors de la copie dans votre presse-papiers !');
      }
    }
    setIsOpen(false);
  };

  // Ferme le dropdown si on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <Button 
        variant="outline" 
        size="icon"
        className="relative hover:bg-accent"
        aria-label="Partager"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <Share1Icon className="h-4 w-4" />
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-popover border border-border">
          <div className="py-1" role="menu" aria-orientation="vertical">
            {shareOptions.map((option) => (
              <button
                key={option.name}
                className="flex items-center w-full px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground"
                onClick={() => handleShare(option.link)}
                role="menuitem"
              >
                <span className="mr-2">{option.icon}</span>
                <span>
                  {option.link ? `Partager sur ${option.name}` : 'Copier le lien'}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 