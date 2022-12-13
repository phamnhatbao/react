import { ComponentProps } from '../types/component-props';
import Footer from './Footer';
import Header from './Header';

function Layout({ children }: ComponentProps): JSX.Element {
  return (
    <div className='App flex flex-col h-screen'>
      <Header />
      <main className='flex-1'>
        <div className='container'>{children}</div>
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
