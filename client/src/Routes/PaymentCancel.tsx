// pages/CancelPage.jsx
import { endPoint } from "@/config/siteConfig";
import { useLoader } from "@/context/LoaderContext";
import { getAPIData } from "@/helpers/apiHelper";
import { Typography, Button } from "@mui/material";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

export default function CancelPage() {
  const navigate = useNavigate();
  const { showLoader, hideLoader } = useLoader();
  const { sessionId } = useParams();
  const confirmPayment = async () => {
    try {
      showLoader();
      if (sessionId) {
        const res: any = await getAPIData(
          `${endPoint?.payment?.confirm}/${import.meta.env.VITE_STRIPE_CANCEL_URL}`,
          { session_id: sessionId },
          "POST",
        );
        if (res?.status) {
          toast.success(res?.message);
          // navigate("/order");
        } else {
          toast.error(res?.message || "Something went wrong");
        }
      }
    } catch (error) {
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
      <Typography variant="h4" color="error.main">
        ❌ Payment Cancelled
      </Typography>
      <Button variant="contained" onClick={() => navigate("/")}>
        Try Again
      </Button>
    </div>
  );
}
