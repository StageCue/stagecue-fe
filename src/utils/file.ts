export const convertFileToBinaryData = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event: ProgressEvent<FileReader>) => {
      const arrayBuffer = event.target?.result as ArrayBuffer;
      const uint8Array = new Uint8Array(arrayBuffer);
      const binaryString = Array.from(uint8Array)
        .map((byte) => String.fromCharCode(byte))
        .join("");
      resolve(binaryString);
    };

    reader.onerror = () => {
      reject("Failed to read file");
    };

    reader.readAsArrayBuffer(file);
  });
};

export const convertFileToURL = (file: File) => {
  return URL.createObjectURL(file);
};

export const seperateFileNameFromPath = (path: string) => {
  const segment = path.split("\\");
  console.log("seg", segment);
  return segment[segment.length - 1] || "";
};
