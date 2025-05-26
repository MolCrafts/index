import { useState } from "react";
import { motion } from "framer-motion";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { buttonVariants } from "./ui/button";
import { Menu } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { LogoIcon } from "./Icons";

interface RouteProps {
  href: string;
  label: string;
}

const routeList: RouteProps[] = [
  {
    href: "#features",
    label: "Ecosystem",
  },
  {
    href: "#about",
    label: "About"
  }
];

// Documentation links
const docsRoutes: RouteProps[] = [
  {
    href: "/docs/molpy",
    label: "MolPy",
  },
  {
    href: "/docs/molpot",
    label: "MolPot",
  },
  {
    href: "/docs/molvis",
    label: "MolVis",
  },
];

// Animacje dla elementów nawigacji
const navItemVariants = {
  hidden: { y: -10, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { duration: 0.3 } 
  }
};

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <motion.header 
      className="sticky border-b top-0 z-40 w-full bg-background/95 backdrop-blur-md dark:border-b-slate-800 border-slate-200"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="container h-14 px-4 w-screen flex justify-between">
          <NavigationMenuItem className="font-bold flex">
            <motion.a
              rel="noreferrer noopener"
              href="/"
              className="ml-2 font-bold text-2xl flex items-center space-x-2"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <LogoIcon />
              <span className="gradient-text-primary">MolCrafts</span>
            </motion.a>
          </NavigationMenuItem>

          {/* mobile */}
          <span className="flex md:hidden">
            <ModeToggle />

            <Sheet
              open={isOpen}
              onOpenChange={setIsOpen}
            >
              <SheetTrigger className="px-2">
                <Menu
                  className="flex md:hidden h-5 w-5"
                  onClick={() => setIsOpen(true)}
                >
                  <span className="sr-only">Menu Icon</span>
                </Menu>
              </SheetTrigger>

              <SheetContent side={"left"}>
                <SheetHeader>
                  <SheetTitle className="font-bold text-xl gradient-text-primary">
                    MolCrafts
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col justify-center items-center gap-2 mt-4">
                  {routeList.map(({ href, label }: RouteProps, i) => (
                    <motion.a
                      rel="noreferrer noopener"
                      key={label}
                      href={href}
                      onClick={() => setIsOpen(false)}
                      className={buttonVariants({ variant: "ghost" })}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ x: 5 }}
                    >
                      {label}
                    </motion.a>
                  ))}
                  
                  <h3 className="text-sm uppercase text-muted-foreground mt-4 font-medium">
                    Documentation
                  </h3>
                  
                  {docsRoutes.map(({ href, label }: RouteProps, i) => (
                    <motion.a
                      rel="noreferrer noopener"
                      key={label}
                      href={href}
                      onClick={() => setIsOpen(false)}
                      className={buttonVariants({ variant: "ghost" })}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: (routeList.length + i) * 0.1 }}
                      whileHover={{ x: 5 }}
                    >
                      {label}
                    </motion.a>
                  ))}
                  
                  <motion.a
                    rel="noreferrer noopener"
                    href="https://github.com/MolCrafts"
                    target="_blank"
                    className={`w-[110px] border ${buttonVariants({
                      variant: "secondary",
                    })}`}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: (routeList.length + docsRoutes.length) * 0.1 }}
                  >
                    <GitHubLogoIcon className="mr-2 w-5 h-5" />
                    Github
                  </motion.a>
                </nav>
              </SheetContent>
            </Sheet>
          </span>

          {/* desktop */}
          <motion.nav 
            className="hidden md:flex gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {routeList.map((route: RouteProps, i) => (
              <motion.a
                rel="noreferrer noopener"
                href={route.href}
                key={i}
                className={`text-[17px] ${buttonVariants({
                  variant: "ghost",
                })}`}
                variants={navItemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -2 }}
              >
                {route.label}
              </motion.a>
            ))}
            
            <div className="relative group">
              <motion.a
                href="#"
                className={`text-[17px] ${buttonVariants({
                  variant: "ghost",
                })}`}
                variants={navItemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: routeList.length * 0.1 }}
                whileHover={{ y: -2 }}
              >
                Documentation
              </motion.a>
              
              <div className="absolute left-0 hidden pt-2 group-hover:block">
                <div className="bg-background border rounded-md shadow-lg py-1 min-w-32">
                  {docsRoutes.map((route: RouteProps, i) => (
                    <motion.a
                      rel="noreferrer noopener"
                      href={route.href}
                      key={i}
                      className="block px-4 py-2 text-sm hover:bg-muted"
                      whileHover={{ x: 5 }}
                    >
                      {route.label}
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.nav>

          <motion.div 
            className="hidden md:flex gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <motion.a
              rel="noreferrer noopener"
              href="https://github.com/MolCrafts"
              target="_blank"
              className={`border ${buttonVariants({ variant: "secondary" })}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <GitHubLogoIcon className="mr-2 w-5 h-5" />
              Github
            </motion.a>

            <ModeToggle />
          </motion.div>
        </NavigationMenuList>
      </NavigationMenu>
    </motion.header>
  );
};
