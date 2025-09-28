import { useCallback } from "react";
import html2canvas from "html2canvas";

type ElementToCapture = HTMLDivElement;

export const useDownload = (options: { filename: string; format: string }) => {
  const { filename, format } = options;

  const downloadFunc = useCallback(
    async (element: ElementToCapture) => {
      if (!element) {
        console.error("Element is not available to capture.");
        return;
      }

      try {
        const canvas = await html2canvas(element, { useCORS: true });
        const dataUrl = canvas.toDataURL(`image/${format}`);

        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `${filename}.${format}`;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error("Error during screenshot", error);
      }
    },
    [filename, format]
  );

  return { downloadFunc };
};
