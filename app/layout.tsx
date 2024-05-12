import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { ThemeProvider } from 'next-themes';
import { Metadata } from 'next';

// export const metadata: Metadata = {
//   title: 'Acme Dashboard',
//   description: 'The official Next.js Course Dashboard, built with App Router.',
//   metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
// };

//use the title.template field in the metadata object to define a template for your page titles. The %s in the template will be replaced with the specific page title.
export const metadata: Metadata = {
  title: {
    template: '%s | Acme Dashboard',
    default: 'Acme Dashboard',
  },
  description: 'The official Next.js Learn Dashboard built with App Router.',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};

export default function RootLayout ( {
  children,
}: {
  children: React.ReactNode;
} )
{
  return (
    <html lang="en">
      <body className={ `${ inter.className } antialiased` }>
        <ThemeProvider attribute="class">
          { children }
        </ThemeProvider>
      </body>
    </html>
  );
}
