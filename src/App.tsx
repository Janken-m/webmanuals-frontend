import Navbar from "./components/Navbar";
import "./styles/App.css";
import spinner from "./assets/spinner.svg";
import { BsCheckLg } from "react-icons/bs";

import { FormEvent, ChangeEvent, useState, useEffect } from "react";
import {
  useAddUrlMutation,
  useGetUrlsQuery,
  useRemoveUrlMutation,
} from "./store/Api";
import { BsFillTrashFill } from "react-icons/bs";
import { toast } from "react-toastify";
import CountdownTimer from "./components/CountdownTimer";
import { Iurl } from "./types/IurlDB";
import { handleSingleRequest } from "./services/UrlserviceData";
import Dropdown from "./components/Dropdown";

function App() {
  const [originalUrl, setOriginalUrl] = useState<string>("");
  const [expair, setExpair] = useState<string>("");
  const { data: urls = [] } = useGetUrlsQuery("urls");
  const [AddUrl, { error: errors, isLoading }] = useAddUrlMutation();
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
      if (expair) {
        toast.info("Please don't close the window before the count is done.");
      }
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

  const handleChangeSetExpair = (e: ChangeEvent<HTMLSelectElement>) => {
    setExpair(e.target.value);
  };

  useEffect(() => {}, [expair]);
  return (
    <>
      <Navbar />
      <div className="continer">
        <form className="form" onSubmit={handleSubmit}>
          <h2 style={{ padding: "0.5rem", color: "var(--secondry)" }}>
            {" "}
            Shorten urls Service{" "}
          </h2>
          <input
            className="input_original"
            placeholder="Add url..."
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
          />
          <Dropdown onChange={handleChangeSetExpair} expair={expair} />
          {errors && (
            //@ts-ignore
            <p className="validation-error">{errors.data.error}</p>
          )}
          <button type="submit"> Shorten URL</button>
        </form>
        <div>
          <h1 className="right-top-text"> Shortened URLS </h1>
          <div className="right_side">
            {isLoading && (
              <img
                style={{ placeSelf: "center" }}
                src={spinner}
                width="100px"
                height="100px"
              />
            )}
            {urls?.map((url: Iurl) => (
              <div key={url._id} className="list-group">
                <div className="List-items">
                  <p
                    className="url-hash"
                    title={url.originalUrl}
                    onClick={() => handleSingleRequest(url.shortenId)}
                  >
                    {url.shortenId}
                  </p>
                  <div style={{ paddingRight: "5px", paddingLeft: "5px" }}>
                    {url.expair ? (
                      <CountdownTimer duration={url.expair} id={url._id} />
                    ) : (
                      <p style={{ color: "#7EE787", fontWeight: "bold" }}>
                        Valid URL <BsCheckLg size={16} />
                      </p>
                    )}
                  </div>
                  <BsFillTrashFill
                    title="Remove"
                    size={18}
                    color="red"
                    style={{ placeSelf: "center", cursor: "pointer" }}
                    onClick={() => handleRemoveUrl(url._id)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
