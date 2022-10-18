function useNotification(ref) {
<<<<<<< HEAD
  const addToast = (mode, message = "") => {
    if (message === "") {
      message = "Message";
=======
  const addToast = (mode, message = '') => {
    if (message === '') {
      message = 'Message';
>>>>>>> a8b2e304a5952c50aa9934d10fc721134cccd8e4
    }
    ref.current.addMessage({ mode: mode, message: message });
  };
  return addToast;
}

export default useNotification;
