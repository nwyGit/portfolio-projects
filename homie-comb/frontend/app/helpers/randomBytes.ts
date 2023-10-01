export const generateRandomBytes = () => {
  const randomBytes = new Uint8Array(128 / 8);
  crypto.getRandomValues(randomBytes);
  return Array.from(randomBytes)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
};
