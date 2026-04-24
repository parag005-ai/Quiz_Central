"use client";

import { useCallback, useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";

interface QRCodeModalProps {
  quizCode: string;
  slug: string;
  isLive?: boolean;
  /** If true, render the modal open inline (no trigger button) */
  inline?: boolean;
  quizTitle?: string;
}

export function QRCodeModal({ quizCode, slug, isLive = true, inline = false, quizTitle }: QRCodeModalProps) {
  const [isOpen, setIsOpen] = useState(inline);
  const [copied, setCopied] = useState(false);

  const quizUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/quiz/${slug}`
      : `/quiz/${slug}`;

  const shareText = quizTitle
    ? `Take this quiz: "${quizTitle}" — Code: ${quizCode}`
    : `Take this quiz — Code: ${quizCode}`;

  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(quizUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const input = document.createElement("input");
      input.value = quizUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [quizUrl]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen || inline) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, inline]);

  const shareLinks = {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${shareText}\n${quizUrl}`)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(quizUrl)}&text=${encodeURIComponent(shareText)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(quizUrl)}&text=${encodeURIComponent(shareText)}`,
    email: `mailto:?subject=${encodeURIComponent(`Quiz: ${quizTitle || quizCode}`)}&body=${encodeURIComponent(`${shareText}\n\n${quizUrl}`)}`,
  };

  const shareButtonStyle: React.CSSProperties = {
    flex: 1,
    minWidth: "60px",
    padding: "0.5rem 0.4rem",
    border: "1px solid var(--color-ink)",
    background: "var(--color-paper)",
    cursor: "pointer",
    fontFamily: "var(--font-label), monospace",
    fontSize: "0.68rem",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    textAlign: "center",
    textDecoration: "none",
    color: "var(--color-ink)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.25rem",
  };

  const modalContent = (
    <div
      style={{
        background: "var(--color-paper)",
        border: "2px solid var(--color-ink)",
        padding: "2rem",
        maxWidth: "400px",
        width: "90%",
        textAlign: "center",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-label), monospace",
          fontSize: "0.72rem",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          marginBottom: "0.5rem",
        }}
      >
        Share Quiz
      </p>
      <h3
        style={{
          fontFamily: "var(--font-heading), serif",
          fontSize: "1.3rem",
          marginTop: 0,
          marginBottom: "1.25rem",
        }}
      >
        {quizCode}
      </h3>

      {!isLive && (
        <div
          style={{
            padding: "0.5rem 0.75rem",
            background: "rgba(191,97,106,0.1)",
            border: "1px solid var(--color-accent)",
            color: "var(--color-accent)",
            fontSize: "0.8rem",
            fontWeight: 600,
            marginBottom: "1rem",
          }}
        >
          ⚠ Quiz is not live — this QR code won&apos;t work for students until you go live.
        </div>
      )}

      <div
        style={{
          display: "inline-block",
          padding: "1rem",
          background: "#fff",
          border: "1px solid var(--color-ink)",
          marginBottom: "1rem",
          opacity: isLive ? 1 : 0.4,
        }}
      >
        <QRCodeSVG
          value={quizUrl}
          size={200}
          level="M"
          includeMargin={false}
        />
      </div>

      <p
        style={{
          fontSize: "0.82rem",
          color: "var(--color-muted)",
          marginBottom: "1.25rem",
          wordBreak: "break-all",
        }}
      >
        {quizUrl}
      </p>

      {/* Social share buttons */}
      <div style={{ marginBottom: "1rem" }}>
        <p
          style={{
            fontFamily: "var(--font-label), monospace",
            fontSize: "0.68rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: "0.5rem",
            color: "var(--color-muted)",
          }}
        >
          Share via
        </p>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          <a
            href={shareLinks.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            style={shareButtonStyle}
          >
            <span style={{ fontSize: "1.1rem" }}>💬</span>
            WhatsApp
          </a>
          <a
            href={shareLinks.telegram}
            target="_blank"
            rel="noopener noreferrer"
            style={shareButtonStyle}
          >
            <span style={{ fontSize: "1.1rem" }}>✈️</span>
            Telegram
          </a>
          <a
            href={shareLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
            style={shareButtonStyle}
          >
            <span style={{ fontSize: "1.1rem" }}>𝕏</span>
            Twitter
          </a>
          <a
            href={shareLinks.email}
            style={shareButtonStyle}
          >
            <span style={{ fontSize: "1.1rem" }}>✉️</span>
            Email
          </a>
        </div>
      </div>

      <div style={{ display: "flex", gap: "0.75rem" }}>
        <button
          type="button"
          className="btn-secondary"
          style={{ flex: 1 }}
          onClick={() => void copyLink()}
        >
          {copied ? "✓ Copied!" : "📋 Copy Link"}
        </button>
        {!inline && (
          <button
            type="button"
            className="btn-primary"
            style={{ flex: 1 }}
            onClick={() => setIsOpen(false)}
          >
            Close
          </button>
        )}
      </div>
    </div>
  );

  // Inline mode — render modal content directly, no button trigger
  if (inline) {
    return modalContent;
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        title={isLive ? "Show QR Code" : "Quiz is not live"}
        style={{
          padding: "0.35rem 0.55rem",
          border: "1px solid var(--color-ink)",
          background: isLive ? "var(--color-paper)" : "var(--color-panel)",
          cursor: "pointer",
          fontFamily: "var(--font-label), monospace",
          fontSize: "0.78rem",
          lineHeight: 1,
          display: "inline-flex",
          alignItems: "center",
          gap: "0.3rem",
          opacity: isLive ? 1 : 0.5,
        }}
      >
        <span style={{ fontSize: "1rem" }}>⊞</span> QR
      </button>

      {isOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.55)",
            display: "grid",
            placeItems: "center",
            zIndex: 9999,
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsOpen(false);
          }}
        >
          {modalContent}
        </div>
      )}
    </>
  );
}
