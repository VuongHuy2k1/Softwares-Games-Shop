<<<<<<< HEAD
import { uuid } from "../utils";
import { useState, useEffect } from "react";
=======
import { uuid } from 'src/utils';
import { useState, useEffect } from 'react';
>>>>>>> a8b2e304a5952c50aa9934d10fc721134cccd8e4

function useToastPortal() {
  const [loaded, setLoaded] = useState(false);
  const [portalId] = useState(`toast-portal-${uuid()}`);

  useEffect(() => {
<<<<<<< HEAD
    const div = document.createElement("div");
    div.id = portalId;
    div.style = "position: fixed; bottom: 10px; right: 10px; z-index: 10";
    document.getElementsByTagName("body")[0].prepend(div);

    setLoaded(true);

    return () => document.getElementsByTagName("body")[0].removeChild(div);
=======
    const div = document.createElement('div');
    div.id = portalId;
    div.style = 'position: fixed; bottom: 10px; right: 10px; z-index: 10';
    document.getElementsByTagName('body')[0].prepend(div);

    setLoaded(true);

    return () => document.getElementsByTagName('body')[0].removeChild(div);
>>>>>>> a8b2e304a5952c50aa9934d10fc721134cccd8e4
  }, [portalId]);
  return { loaded, portalId };
}

export default useToastPortal;
