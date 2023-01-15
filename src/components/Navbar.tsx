import logo from "../assets/logo.png";
const Navbar = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1F4E78",
        height: "100px",
      }}
    >
      <img src={logo} width="300px" />
    </div>
  );
};

export default Navbar;
