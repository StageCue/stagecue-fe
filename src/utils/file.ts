export const convertFileToURL = (file: File) => {
  return URL.createObjectURL(file);
};

export const seperateFileNameFromPath = (path: string) => {
  const segment = path.split("\\");
  console.log("seg", segment);
  return segment[segment.length - 1] || "";
};
