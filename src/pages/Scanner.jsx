import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

function Scanner() {
  const [scanResult, setScanResult] = useState(null);
  const [credits, setCredits] = useState(0);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      qrbox: {
        width: 700,
        height: 600,
      },
      fps: 5,
    });

    scanner.render(success, error);

    function success(result) {
      scanner.clear(); // Stop the scanner after successful scan
      setScanResult(result);
      setCredits(500);
      alert(result);
    }

    function error(err) {
      console.error("Error:", err); // Log specific error details
      // Optionally handle the error by displaying a message or restarting scanner
    }

    // Cleanup function to stop the scanner on component unmount
    return () => scanner.stop?.();
  }, []);

  return (
    <div className="p-64 w-full flex justify-center items-center flex-col h-[60vh] mb-[70px]">
      <h1>{!scanResult && "Scanner"}</h1>
      <div id="reader" className="p-48 w-[25vw] h-[200px]">
        {scanResult && (
          <div className="flex justify-center items-center">
            {!scanResult && "Scanner"} &nbsp; {
              credits && (
                <h1 className="text-white text-5xl font-bold whitespace-nowrap">Congrats! You have earned {credits} credits</h1>
              )
            }
          </div>
        ) } {/* Only render when scanResult exists */}
       
      </div>
      
    </div>
  );
}

export default Scanner;