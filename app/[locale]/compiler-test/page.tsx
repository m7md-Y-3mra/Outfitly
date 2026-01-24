"use client";

import { useEffect, useState } from "react";

export default function CompilerTestPage() {
  const [status, setStatus] = useState("initial");

  useEffect(() => {
    setStatus("updated in useEffect");
  }, []);

  return <div>useEffect state: {status}</div>;
}
