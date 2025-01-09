export default function BlogPostLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="max-w-4xl mx-auto px-6">
            {children}
        </div>
    );
} 