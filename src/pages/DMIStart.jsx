import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";

export default function DMIStart(){
  const nav = useNavigate();
  useEffect(()=>{
    const id = nanoid();
    localStorage.setItem("dmi_session_id", id);
    nav("/dmi/org");
  }, [nav]);
  return null;
}
