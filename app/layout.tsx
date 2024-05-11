import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { ThemeProvider } from 'next-themes';

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
