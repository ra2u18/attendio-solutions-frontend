import { Navbar } from '../Navbar/Navbar';

type Props = {
  children: React.ReactNode;
};

/** This is the main public layout.
 * @dev Check figma file for more information
 *
 * All the components will inherit from this layout, either protected or not-protected
 * This will be the base layout, where we can set background-colors and other
 */
export const BaseLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="py-6 h-screen">
      <div className="mx-auto px-4 sm:px-6 md:px-8">
        <Navbar />

        {children}
      </div>
    </div>
  );
};
