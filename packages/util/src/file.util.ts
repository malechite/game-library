/**
 * Convert a File to base64 string (data portion only, without the data URL prefix)
 * @example
 * const file = new File(["hello"], "test.txt", { type: "text/plain" });
 * const base64 = await fileToBase64(file); // "aGVsbG8="
 */
export const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(",")[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
