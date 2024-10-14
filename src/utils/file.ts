export const convertFileToBinaryData = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event: ProgressEvent<FileReader>) => {
      const arrayBuffer = event.target?.result as ArrayBuffer; // ArrayBuffer로 파일 읽기
      const uint8Array = new Uint8Array(arrayBuffer); // ArrayBuffer를 Uint8Array로 변환
      const binaryString = Array.from(uint8Array) // 각 바이트를 순회하며 문자열로 변환
        .map((byte) => String.fromCharCode(byte))
        .join(""); // 문자열 합치기
      resolve(binaryString); // 바이너리 문자열 반환
    };

    reader.onerror = () => {
      reject("Failed to read file");
    };

    reader.readAsArrayBuffer(file); // 파일을 ArrayBuffer로 읽기
  });
};

export const convertFileToURL = (file: File) => {
  return URL.createObjectURL(file);
};
