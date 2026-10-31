import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import CloseIcon from "./CloseIcon";
import { useCart } from "../context/cart";
import "./AuthCartPrompt.css";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

function AuthCartPrompt() {
  const { authPromptOpen, closeAuthPrompt } = useCart();
  const location = useLocation();
  const dialogRef = useRef(null);
  const primaryActionRef = useRef(null);

  useEffect(() => {
    if (!authPromptOpen) return undefined;

    const previouslyFocused = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    primaryActionRef.current?.focus();

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeAuthPrompt();
        return;
      }

      if (event.key !== "Tab") return;

      const focusableElements = [
        ...(dialogRef.current?.querySelectorAll(FOCUSABLE_SELECTOR) ?? []),
      ];

      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [authPromptOpen, closeAuthPrompt]);

  if (!authPromptOpen) return null;

  const authState = {
    from: {
      pathname: location.pathname,
      search: location.search,
      hash: location.hash,
    },
    authMessage: "Sign in or create an account to add products to your bag.",
  };

  return (
    <div
      className="auth-cart-prompt"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) closeAuthPrompt();
      }}
    >
      <section
        ref={dialogRef}
        className="auth-cart-prompt__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-cart-prompt-title"
        aria-describedby="auth-cart-prompt-description"
        tabIndex="-1"
      >
        <button
          className="auth-cart-prompt__close"
          type="button"
          aria-label="Close sign-in prompt"
          onClick={closeAuthPrompt}
        >
          <CloseIcon aria-hidden="true" />
        </button>

        <p className="auth-cart-prompt__eyebrow">Save your selection</p>
        <h2 id="auth-cart-prompt-title">Ready to add it to your bag?</h2>
        <p id="auth-cart-prompt-description">
          Sign in or create an account first. You&apos;ll return here afterward.
        </p>

        <div className="auth-cart-prompt__actions">
          <Link
            ref={primaryActionRef}
            to="/login"
            state={authState}
            onClick={closeAuthPrompt}
          >
            Sign in
          </Link>
          <Link
            className="auth-cart-prompt__register"
            to="/register"
            state={authState}
            onClick={closeAuthPrompt}
          >
            Create account
          </Link>
        </div>

        <button
          className="auth-cart-prompt__continue"
          type="button"
          onClick={closeAuthPrompt}
        >
          Keep browsing
        </button>
      </section>
    </div>
  );
}

export default AuthCartPrompt;
