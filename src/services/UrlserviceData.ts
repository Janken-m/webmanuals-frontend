import axios from "axios";
import { toast } from "react-toastify";

export const handleSingleRequest = async (shortenId: string) => {
  await axios
    .get(
      `https://webmanuals-arbetsprov-api.onrender.com/api/shorten/${shortenId}`
    )
    .then((res) => window.open(res.data))
    .catch((error) => {
      toast.error(error.response.data.error);
    });
};
