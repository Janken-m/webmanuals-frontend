import { ChangeEvent } from "react";
import "../styles/App.css";

interface Props {
  expair: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const Dropdown = ({ expair, onChange }: Props) => {
  return (
    <div className="dropdown-continer">
      <select
        className="dropdown"
        value={expair}
        name="expair"
        onChange={onChange}
      >
        <option value={""} disabled={true}>
          Chose expair time
        </option>
        <option value={""}> None</option>
        <option value={"60000"}>1 minutes</option>
        <option value={"180000"}>3 minutes</option>
        <option value={"300000"}>5 minutes</option>
      </select>
    </div>
  );
};

export default Dropdown;
