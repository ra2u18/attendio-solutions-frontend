type Props = {
  children: React.ReactNode;
};

/** This is the main public layout.
 *
 * All the components will inherit from this layout, either protected or not-protected
 * This will be the base layout, where we can set background-colors and other
 */
export const BaseLayout: React.FC<Props> = ({ children }) => {
  return <div className="bg-zinc-100">{children}</div>;
};
