import { useEffect, useState } from "react";

const FolderFileExplorerOne = () => {
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    fetch("/auth-proxy-sequence-diagrams.md")
      .then((response) => response.text())
      .then((text) => setHtmlContent(text))
      .catch((error) => console.error("Error loading markdown:", error));
  }, []);

  console.log(htmlContent);
  return (
    <div>
      <pre className="p-6 prose">{htmlContent}</pre>
    </div>
  );
};

export default FolderFileExplorerOne;
