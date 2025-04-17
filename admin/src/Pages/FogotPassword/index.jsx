import { Button } from "@mui/material";
import React from "react";

const FogotPassword = () => {
  return (
    <div class="flex w-full flex-col py-10 justify-center px-5">
      <div class="mx-auto w-full max-w-md py-12 md:max-w-lg lg:max-w-xl 2xl:pb-8 2xl:pt-2">
        <div class="flex flex-col items-center">
          <a class="mb-7 inline-block max-w-[100px] lg:mb-9" href="/">
            <img
              alt="Isomorphic - React Typescript Admin Dashboard Template"
              loading="lazy"
              width="100"
              height="100"
              decoding="async"
              data-nimg="1"
              className="transparent"
              src="../../logo-stf.png"
            />
          </a>
          <h2 class="rizzui-title-h2 mb-7 text-center text-[28px] font-bold leading-snug md:text-3xl md:!leading-normal lg:mb-10 lg:text-4xl">
            Having trouble to sign in? <br class="hidden sm:inline-block" />{" "}
            Reset your password.
          </h2>
        </div>
        <form novalidate="">
          <div class="space-y-6">
            <div class="rizzui-input-root flex flex-col [&amp;>label>span]:font-medium">
              <label class="block">
                <span class="rizzui-input-label block text-base mb-2 font-medium">
                  Email
                </span>
                <span
                  class="rizzui-input-container flex items-center peer w-full transition duration-200 [&amp;.is-focus]:ring-[0.8px] ring-[0.6px] [&amp;.is-hover]:border-primary [&amp;.is-focus]:border-primary [&amp;.is-focus]:ring-primary [&amp;_input::placeholder]:opacity-60 px-5 py-2.5 text-base h-14 rounded-md border border-muted ring-muted bg-transparent"
                  data-focus="false"
                  data-hover="false"
                >
                  <input
                    spellcheck="false"
                    placeholder="Enter your email"
                    class="rizzui-input-field inherit w-full border-0 bg-transparent p-0 focus:outline-none focus:ring-0 [&amp;::-ms-clear]:hidden [&amp;::-ms-reveal]:hidden [&amp;::-webkit-search-cancel-button]:hidden [&amp;::-webkit-inner-spin-button]:m-0 [&amp;::-webkit-inner-spin-button]:appearance-none [&amp;::-webkit-outer-spin-button]:m-0 [&amp;::-webkit-outer-spin-button]:appearance-none"
                    type="email"
                    name="email"
                  />
                </span>
              </label>
            </div>
            <Button
              class="rizzui-button !text-white !font-salute !inline-flex !font-medium !items-center !justify-center active:enabled:!translate-y-px focus:!outline-none focus-visible:!ring-[1.8px] focus-visible:!ring-offset-2 !ring-offset-background !transition-colors !duration-200 !px-8 !py-2.5 !text-base !h-14 !rounded-md !border !border-transparent dark:!backdrop-blur !bg-primary hover:!bg-primary-dark dark:!hover:bg-primary/90 focus-visible:!ring-muted !text-primary-foreground !w-full"
              type="submit"
            >
              Reset Password
            </Button>
          </div>
        </form>
        <p class="rizzui-text-p font-normal mt-6 text-center text-[15px] leading-loose text-gray-500 md:mt-7 lg:mt-9 lg:text-base">
          Don’t want to reset?{" "}
          <a
            class="font-semibold text-gray-700 transition-colors hover:text-primary"
            href="/auth/login-admin"
          >
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
};

export default FogotPassword;
