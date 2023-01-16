import Navbar from "./components/Navbar";
import "./styles/App.css";
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import {
  useAddUrlMutation,
  useGetUrlsQuery,
  useRemoveUrlMutation,
} from "./store/Api";
import { BsFillTrashFill } from "react-icons/bs";
import { toast } from "react-toastify";

interface Iurl {
  _id: string;
  originalUrl: string;
  shortenId?: string;
  expiration?: Date;
  expair?: number;
  createdAt: Date;
}

function App() {
  const [originalUrl, setOriginalUrl] = useState<string>("");
  const [expair, setExpair] = useState<string>("");
  const { data: urls = [] } = useGetUrlsQuery("urls");
  const [AddUrl, { error: errors }] = useAddUrlMutation();
  const [RemoveUrl] = useRemoveUrlMutation();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const body = {
      originalUrl,
      expair,
    };
    try {
      AddUrl(body);
      setOriginalUrl("");
      setExpair("");
    } catch (error) {
      console.log(error);
    }
  }
  const handleRemoveUrl = (id: string) => {
    try {
      RemoveUrl(id);
      toast.success("Url has been deleted.");
    } catch (error) {
      toast.error("Something went worng, please try again later.");
    }
  };

  const handleSingleRequest = async (shortenId: string) => {
    await axios
      .get(`http://localhost:5000/api/shorten/${shortenId}`)
      .then((res) => window.open(res.data))
      .catch((error) => {
        toast.error(error.response.data.error);
      });
  };

  useEffect(() => {}, [urls, errors]);

  return (
    <>
      <Navbar />
      <div className="continer">
        <form className="form" onSubmit={handleSubmit}>
          <h2 style={{ padding: "0.5rem" }}> Shorten urls Service </h2>
          <input
            className="input_original"
            placeholder="Add url..."
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
          />
          <div className="dropdown-continer">
            <select
              className="dropdown"
              value={expair}
              onChange={(e) => setExpair(e.target.value)}
            >
              <option value={""} disabled={true}>
                Chose expair time
              </option>
              <option value={""}> None</option>
              <option value={60000}>1 minutes</option>
              <option value={180000}>3 minutes</option>
              <option value={300000}>5 minutes</option>
            </select>
          </div>
          {errors && (
            <p style={{ color: "red", padding: "0.5rem" }}>
              {JSON.stringify(errors.data.error)}
            </p>
          )}
          <button type="submit"> Shorten </button>
        </form>
        <div className="right_side">
          <h1 style={{ color: "var(--primary)" }}> Shortened URLS </h1>
          {urls?.map((url: Iurl) => (
            <ul key={url._id}>
              <li className="List-items">
                <p
                  className="url-hash"
                  title={url.originalUrl}
                  //@ts-ignore
                  onClick={() => handleSingleRequest(url.shortenId)}
                >
                  {url.shortenId}{" "}
                </p>
                <p style={{ paddingRight: "5px", paddingLeft: "5px" }}>
                  {url.expair
                    ? Math.floor(url.expair) / 60 / 1000 + `min`
                    : url.createdAt.toLocaleString()}
                </p>
                <BsFillTrashFill
                  size={18}
                  color="red"
                  style={{ placeSelf: "center", cursor: "pointer" }}
                  onClick={() => handleRemoveUrl(url._id)}
                />
              </li>
            </ul>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
