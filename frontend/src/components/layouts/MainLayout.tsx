// src/layouts/MainLayout.tsx
import type { ReactNode } from "react";
import { Navigation } from "../Navigation";
import { Footer } from "../Footer";
// import { Navigation } from "../Navigation";
// import { Footer } from "../Footer";

type Props = {
  children: ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return (
    <>
      <Navigation />
      <main className="">{children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;
