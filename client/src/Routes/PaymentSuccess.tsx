// pages/SuccessPage.jsx
import { useEffect } from "react";
import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { endPoint } from "@/config/siteConfig";
import { getAPIData } from "@/helper/apiHelper";
import toast from "react-hot-toast";
import { useLoader } from "@/context/LoaderContext";

export default function SuccessPage() {
  const { showLoader, hideLoader } = useLoader();
  // const navigate = useNavigate();
  const { sessionId } = useParams();

  const confirmPayment = async () => {
    try {
      showLoader();
      if (sessionId) {
        const res: any = await getAPIData(
          `${endPoint?.payment?.confirm}/${import.meta.env.VITE_STRIPE_SUCCESS_URL}`,
          { session_id: sessionId },
          "POST",
        );
        if (res?.code === "0000") {
          toast.success(res?.message);
          // navigate("/order");
        } else {
          toast.error(res?.message || "Something went wrong");
        }
      }
    } catch (error) {
      console.log("error: ", error);
      toast.error(error?.message || "Something went wrong");
    } finally {
      hideLoader();
    }
  };

  useEffect(() => {
    // const params = new URLSearchParams(window.location.search);
    // const sessionId = params.get("session_id");
    confirmPayment();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <Typography variant="h4" color="success.main">
        🎉 Payment Successful!
      </Typography>
    </div>
  );
}
