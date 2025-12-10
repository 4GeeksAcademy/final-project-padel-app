import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div className="layout">
      {/*navbar */}
      <main>
        <Outlet />
      </main>
      {/* footer */}
    </div>
  );
};