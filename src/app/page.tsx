"use client";

import { useState } from "react";

export default function Home() {
  const [contactOpen, setContactOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);

  return (
    <>
      <main className="mx-auto mx-w-280 px-7">
        main stuff
      </main>
    </>
  );
}
