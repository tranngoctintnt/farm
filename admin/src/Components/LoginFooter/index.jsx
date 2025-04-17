import React from "react";

const LoginFooter = () => {
  return (
    <footer className="flex flex-col-reverse items-center justify-between px-4 py-5 lg:flex-row lg:px-16 lg:py-6 2xl:px-24 2xl:py-10">
      <div className="text-center leading-relaxed text-gray-500 lg:text-start">
        © Copyright 2025. Theme by{" "}
        <a
          className="font-medium transition-colors hover:text-primary"
          href="https://redq.io/"
        >
          Suoi Tien Farm
        </a>
        , all rights reserved.
      </div>
      <div className="-mx-2.5 flex items-center justify-end pb-3 font-medium text-gray-700 lg:w-1/2 lg:pb-0">
        <a className="px-2.5 py-1.5 transition-colors hover:text-primary" href="/">
          Help
        </a>
        <a className="px-2.5 py-1.5 transition-colors hover:text-primary" href="/">
          Privacy
        </a>
        <a className="px-2.5 py-1.5 transition-colors hover:text-primary" href="/">
          Terms
        </a>
      </div>
    </footer>
  );
};

export default LoginFooter;
