import { Outlet } from "react-router-dom";
import { NavBarComponent } from "./navBarComponent";
import { FooterComponent } from "./FooterComponent";

export const PublicLayout = () => {
  return (
    <>
      <NavBarComponent />

      <main className="main-content">
        <Outlet />
      </main>

      <FooterComponent />
    </>
  );
};
