export const scrollToPosition = (top = 0) => {
  try {
    /**
     * Latest API
     */
    document.documentElement.scrollTo({
      top: top,
      left: 0,
<<<<<<< HEAD
      behavior: "smooth",
=======
      behavior: 'smooth',
>>>>>>> a8b2e304a5952c50aa9934d10fc721134cccd8e4
    });
  } catch (_) {
    /**
     * Fallback
     */
    document.documentElement.scrollTo(0, top);
  }
};

export const uuid = () => {
  let dt = new Date().getTime();

<<<<<<< HEAD
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
=======
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
>>>>>>> a8b2e304a5952c50aa9934d10fc721134cccd8e4
  });
};

export function currencyFormat(value) {
<<<<<<< HEAD
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
=======
  const formatter = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' });
>>>>>>> a8b2e304a5952c50aa9934d10fc721134cccd8e4
  return formatter.format(value);
}
