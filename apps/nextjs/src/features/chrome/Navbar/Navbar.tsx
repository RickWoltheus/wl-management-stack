"use client";

import * as React from "react";
import { List, PlusSquare } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "~/features/shared/components/NavigationMenu";
import { cn } from "~/features/shared/utils/utils";

export function Navbar() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Work tickets</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              <ListItem href="/authenticated/work-tickets" title="Overview">
                <div className="mt-2 flex">
                  <List className="mr-2" size={16} /> A overview of all work
                  tickets assigned to you
                </div>
              </ListItem>
              <ListItem
                href="/authenticated/work-tickets/create"
                title="Create work ticket"
              >
                <div className="mt-2 flex">
                  <PlusSquare className="mr-2" size={16} />
                  Create a new work ticket quickly{" "}
                </div>
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Employees</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              <ListItem href="/authenticated/employees" title="Overview">
                <div className="mt-2 flex">
                  <List className="mr-2" size={16} /> A overview of all
                  employees at [PLACEHOLDER]
                </div>
              </ListItem>
              <ListItem
                href="/authenticated/employees/create"
                title="Create employee"
              >
                <div className="mt-2 flex">
                  <PlusSquare className="mr-2" size={16} />
                  Create a new work ticket quickly{" "}
                </div>
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100 dark:hover:bg-slate-700 dark:focus:bg-slate-700",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none text-white">
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-slate-500 dark:text-slate-400">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
