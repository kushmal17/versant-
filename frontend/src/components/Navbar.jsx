import logo from "../assets/bbc.jpg"; 

const Navbar = () => {
  return (
    <div
      style={{
        backgroundColor: "#1f2d3d",
        height: "80px",
        display: "flex",
        alignItems: "center",
        paddingLeft: "40px",
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 1000
      }}
    >
      <img
        src={logo}
        alt="Company Logo"
        style={{ height: "45px" }}
      />
    </div>
  );
};

export default Navbar;
