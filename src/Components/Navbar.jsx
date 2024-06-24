// src/components/Navbar.js
import { useState, useEffect } from "react";
import React from "react";
import { Link } from "react-router-dom";
import {
  Disclosure,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { useDarkMode } from "../hooks/useDarkMode";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = ({ darkMode, disableDarkMode, enableDarkMode }) => {
  const [firstName, setFirstName] = useState("Isaiah");
  const [lastName, setLastName] = useState("Asaolu");

  return (
    <>
      {/* For Toggling to and from darkmode */}
      <Disclosure as="nav" className="bg-neutral-100 dark:bg-gray-900">
        {({ open }) => (
          <>
            <div className="mx-auto px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-20 items-center justify-between">
                <div className="relative">
                  <div className="flex flex-shrink-0 items-center">
                    <Link to="/">
                      <img
                        className="h-16 w-auto"
                        src="/ShoppingListLogoNoBackground.png"
                        alt="App Logo"
                      />
                    </Link>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <div
                    className={`mx-4  ${
                      darkMode
                        ? "bg-gray-700 border-gray-500"
                        : "bg-white border-gray-300"
                    } rounded-xl border `}
                  >
                    <div className="flex items-center">
                      <button
                        className={`flex items-center justify-center w-10 h-10 rounded-xl ${
                          darkMode
                            ? "bg-gray-700 hover:bg-gray-400"
                            : "bg-white hover:bg-slate-100"
                        }`}
                        onClick={disableDarkMode}
                      >
                        <SunIcon className="w-6 h-6 text-orange-300" />
                      </button>
                      <button
                        className={`flex items-center justify-center w-10 h-10 rounded-xl ${
                          darkMode
                            ? "bg-gray-700 hover:bg-gray-400"
                            : "bg-white hover:bg-slate-100"
                        }`}
                        onClick={enableDarkMode}
                      >
                        <MoonIcon className="w-6 h-6 text-gray-900" />
                      </button>
                    </div>
                  </div>
                  {/* user fullname */}
                  <div className="hidden sm:block text-black dark:text-white">
                    {firstName + " " + lastName}
                  </div>
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-2">
                    <div>
                      <MenuButton className="relative flex rounded-full bg-gray-800 text-sm  focus:ring-white focus:ring-offset-4 focus: ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <div class="relative inline-flex items-center justify-center w-12 h-12 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                          <span class="font-medium text-2xl text-gray-600 dark:text-gray-300">
                            {firstName.at(0) + lastName.at(0)}
                          </span>
                        </div>
                      </MenuButton>
                    </div>
                    <Transition
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <MenuItem>
                          {({ focus }) => (
                            <Link
                              to="/Account"
                              className={classNames(
                                focus ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Account
                            </Link>
                          )}
                        </MenuItem>
                        <MenuItem>
                          {({ focus }) => (
                            <Link
                              to="/Login"
                              className={classNames(
                                focus ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Sign out
                            </Link>
                          )}
                        </MenuItem>
                      </MenuItems>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
          </>
        )}
      </Disclosure>
    </>
  );
};

export default Navbar;
