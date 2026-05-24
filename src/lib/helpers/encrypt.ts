const SECRET_SALT = "357312";

export const encryptId = (id: string) => {
  const mixed = `${SECRET_SALT}:${id}`;

  return btoa(mixed)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
};

/* ================= DECRYPT ================= */

export const decryptId = (hash: string) => {
  try {
    const base64 = hash
      .replace(/-/g, "+")
      .replace(/_/g, "/")
      .padEnd(hash.length + (4 - (hash.length % 4)) % 4, "=");

    const decoded = atob(base64);

    const [salt, id] = decoded.split(":");

    if (salt !== SECRET_SALT) {
      throw new Error("Invalid salt");
    }

    return id;
  } catch (err) {
    console.error("Decrypt error:", err);
    return hash;
  }
};