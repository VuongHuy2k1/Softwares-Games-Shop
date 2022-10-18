<<<<<<< HEAD
const { useEffect } = require("react");
=======
const { useEffect } = require('react');
>>>>>>> a8b2e304a5952c50aa9934d10fc721134cccd8e4

function useEnterPress(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
<<<<<<< HEAD
      if (event.code === "Enter" || event.code === "NumpadEnter") {
=======
      if (event.code === 'Enter' || event.code === 'NumpadEnter') {
>>>>>>> a8b2e304a5952c50aa9934d10fc721134cccd8e4
        event.preventDefault();
        handler(event);
      }
    };
<<<<<<< HEAD
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
=======
    document.addEventListener('keydown', listener);
    return () => {
      document.removeEventListener('keydown', listener);
>>>>>>> a8b2e304a5952c50aa9934d10fc721134cccd8e4
    };
  }, [handler, ref]);

  return useEnterPress;
}

export default useEnterPress;
