import { useState, useEffect } from "react";

const IpAddresses = () => {
  const [localIp, setLocalIp] = useState("");
  console.log("🚀 ~ App ~ localIp:", localIp);

  useEffect(() => {
    const getLocalIP = async () => {
      const ipRegex = /([0-9]{1,3}\.){3}[0-9]{1,3}/;

      const pc = new RTCPeerConnection({
        iceServers: [],
      });

      pc.createDataChannel("");

      pc.createOffer().then((offer) => pc.setLocalDescription(offer));

      pc.onicecandidate = (ice) => {
        if (ice && ice.candidate && ice.candidate.candidate) {
          const ipMatch = ipRegex.exec(ice.candidate.candidate);
          if (ipMatch) {
            setLocalIp(ipMatch[0]);
            pc.onicecandidate = null;
          }
        }
      };
    };

    getLocalIP();
  }, []);

  console.log("localIp--->", localIp);

  return <div>IpAddresses</div>;
};

export default IpAddresses;
