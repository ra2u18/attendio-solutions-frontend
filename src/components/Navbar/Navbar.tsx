import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { Fragment } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { SYSTEM_ROLES } from '@/config/permissions';
import { useIsAuthenticated, useLogout, useUser } from '@/stores/auth-slice';

import { Button } from '../Elements';
import { Logo } from '../Elements/Logo';

const navigation = [
  { name: 'Team', href: '#', current: true },
  { name: 'Features', href: '#', current: false },
  { name: 'Subscriptions', href: '#', current: false },
];

export const Navbar = () => {
  const user = useUser();
  const isAuthenticated = useIsAuthenticated();
  const logout = useLogout();

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Disclosure as="header" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:divide-y lg:divide-gray-200 lg:px-8">
            <div className="relative flex h-16 justify-between">
              <div className="relative z-10 flex px-2 lg:px-0">
                <div className="flex flex-shrink-0 items-center">
                  <Link to="/">
                    <Logo />
                  </Link>
                </div>
              </div>
              <div className="relative z-0 flex flex-1 items-center justify-center px-2 sm:absolute sm:inset-0">
                <nav className="hidden lg:flex lg:space-x-8 lg:py-2" aria-label="Global">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={clsx(
                        'inline-flex items-center rounded-md py-2 px-3 text-sm font-medium',
                        item.current
                          ? 'bg-gray-100 text-gray-900'
                          : 'text-gray-900 hover:bg-gray-50 hover:text-gray-900'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </a>
                  ))}
                </nav>
              </div>
              <div className="relative z-10 flex items-center lg:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Open menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="hidden lg:relative lg:z-10 lg:ml-4 lg:flex lg:items-center">
                {/* Profile dropdown */}
                {isAuthenticated ? (
                  <Menu as="div" className="relative ml-4 flex-shrink-0">
                    <div className="flex gap-2 items-center">
                      <Menu.Button className="flex rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        <span className="sr-only">Open user menu</span>
                        <div className="h-8 w-8 rounded-full bg-indigo-100 grid place-items-center font-bold">
                          {user?.name.charAt(0).toUpperCase()}
                        </div>
                      </Menu.Button>
                      <div className="text-base font-medium text-gray-800">{user?.name}</div>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to={
                                user?.roleName === SYSTEM_ROLES.SUPER_USER
                                  ? '/app/admin-dashboard'
                                  : '/app/employee-dashboard'
                              }
                              className={clsx(
                                'block px-4 py-2 text-sm text-gray-700',
                                active && 'bg-gray-100'
                              )}
                            >
                              Go to App
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={clsx(
                                'text-start w-full px-4 py-2 text-sm text-gray-700',
                                active && 'bg-gray-100'
                              )}
                              onClick={() => {
                                logout();
                                navigate('/');
                              }}
                            >
                              Sign Out
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                ) : (
                  <div className="flex gap-5">
                    {location.pathname !== '/auth/signin' && (
                      <Button variant="inverse" onClick={() => navigate('/auth/signin')}>
                        Sign In
                      </Button>
                    )}
                    {location.pathname !== '/auth/signup' && (
                      <Button onClick={() => navigate('/auth/signup')}>Sign Up</Button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel as="nav" className="lg:hidden" aria-label="Global">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={clsx(
                    'block rounded-md py-2 px-3 text-base font-medium',
                    item.current
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-900 hover:bg-gray-50 hover:text-gray-900'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
            {user ? (
              <div className="border-t border-gray-200 pb-3 pt-4">
                <div className="flex items-center px-4">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-indigo-100 grid place-items-center font-bold">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">{user.name}</div>
                    <div className="text-sm font-medium text-gray-500">{user.email}</div>
                  </div>
                  <button
                    type="button"
                    className="ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-3 space-y-1 px-2">
                  <Disclosure.Button
                    onClick={() => {
                      const path =
                        user.roleName === SYSTEM_ROLES.SUPER_USER
                          ? '/app/admin-dashboard'
                          : '/app/employee-dashboard';

                      navigate(path);
                    }}
                    className="w-full text-start rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                  >
                    Go to App
                  </Disclosure.Button>
                  <Disclosure.Button
                    onClick={() => {
                      logout();
                      navigate('/');
                    }}
                    className="w-full text-start rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                  >
                    Sign Out
                  </Disclosure.Button>
                </div>
              </div>
            ) : (
              <div className="flex gap-5 py-4 px-5">
                {location.pathname !== '/auth/signin' && (
                  <Button stretch variant="inverse" onClick={() => navigate('/auth/signin')}>
                    Sign In
                  </Button>
                )}
                {location.pathname !== '/auth/signup' && (
                  <Button stretch onClick={() => navigate('/auth/signup')}>
                    Sign Up
                  </Button>
                )}
              </div>
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};
