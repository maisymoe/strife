const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
export default (len: number) =>
    [...crypto.getRandomValues(new Uint8Array(len)).map((n) => n % chars.length)]
        .map((n) => chars.charAt(n)).join("");
