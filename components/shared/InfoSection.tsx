"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface InfoSectionProps {
  headline: string;
  copy: string;
  imageSrc: string;
  imageAlt: string;
  buttonLink?: string;
  buttonText?: string;
  reverse?: boolean;
  livePreviewUrl?: string;
  disablePreviewInteraction?: boolean;
  previewDesktopWidth?: number;
  previewDesktopHeight?: number;
  previewScale?: number;
}

export default function InfoSection({
  headline,
  copy,
  imageSrc,
  imageAlt,
  buttonLink,
  buttonText,
  reverse = false,
  livePreviewUrl,
  disablePreviewInteraction = false,
  previewDesktopWidth,
  previewDesktopHeight,
  previewScale = 1,
}: InfoSectionProps) {
  const [previewReady, setPreviewReady] = useState(false);
  const [previewFailed, setPreviewFailed] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const hasDesktopDims = Boolean(previewDesktopWidth && previewDesktopHeight);
  const frameOuterStyle =
    hasDesktopDims && previewScale !== 1
      ? {
          height: ((previewDesktopHeight as number) - 40) * previewScale + 40, // include top bar height
        }
      : undefined;
  const frameInnerStyle =
    hasDesktopDims || previewScale !== 1
      ? {
          width: hasDesktopDims ? previewDesktopWidth : undefined,
          height: hasDesktopDims ? previewDesktopHeight : undefined,
          transform: previewScale !== 1 ? `scale(${previewScale})` : undefined,
          transformOrigin: "top left" as const,
        }
      : undefined;

  useEffect(() => {
    if (!livePreviewUrl) return;
    setPreviewReady(false);
    setPreviewFailed(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setPreviewFailed(true), 8000);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [livePreviewUrl]);

  const handleLoad = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setPreviewReady(true);
  };

  const handleError = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setPreviewFailed(true);
  };

  const showIframe = Boolean(livePreviewUrl) && !previewFailed;

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`grid md:grid-cols-2 gap-12 items-center ${
            reverse ? "md:flex-row-reverse" : ""
          }`}
        >
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: reverse ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={`relative h-96 rounded-2xl overflow-hidden ${
              reverse ? "md:order-2" : ""
            }`}
            style={frameOuterStyle}
          >
            {showIframe ? (
              <div className="relative h-full w-full bg-gray-900 border border-white/5 rounded-2xl overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-10 bg-gray-900/80 backdrop-blur-sm border-b border-white/10 flex items-center gap-2 px-4 z-10">
                  <span className="h-3 w-3 rounded-full bg-red-400" />
                  <span className="h-3 w-3 rounded-full bg-yellow-400" />
                  <span className="h-3 w-3 rounded-full bg-green-400" />
                  <span className="text-sm text-gray-300 truncate">
                    {livePreviewUrl?.replace(/^https?:\/\//, "")}
                  </span>
                </div>
                <iframe
                  src={livePreviewUrl}
                  title={headline}
                  loading="lazy"
                  onLoad={handleLoad}
                  onError={handleError}
                  className="absolute inset-0 w-full h-full pt-10 bg-gray-950"
                  style={
                    disablePreviewInteraction
                      ? { ...frameInnerStyle, pointerEvents: "none" as const }
                      : frameInnerStyle
                  }
                  sandbox="allow-scripts allow-same-origin"
                  allow="accelerometer; ambient-light-sensor; autoplay; camera; encrypted-media; geolocation; gyroscope; microphone; midi; payment; usb; vr; xr-spatial-tracking"
                  referrerPolicy="no-referrer"
                  aria-hidden={disablePreviewInteraction ? "true" : undefined}
                  tabIndex={disablePreviewInteraction ? -1 : undefined}
                  allowFullScreen={false}
                  scrolling="no"
                />
                {!previewReady && (
                  <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/70 to-gray-900/90 flex flex-col items-center justify-center gap-2 text-gray-300">
                    <span className="h-10 w-10 border-4 border-primary-500/50 border-t-transparent rounded-full animate-spin" />
                    <p className="text-sm">Loading live preview…</p>
                  </div>
                )}
              </div>
            ) : (
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="object-cover hover:scale-110 transition-transform duration-700"
              />
            )}
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: reverse ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={reverse ? "md:order-1" : ""}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              {headline}
            </h2>
            <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
              {copy}
            </p>
            {buttonLink && buttonText && (
              <Link
                href={buttonLink}
                className="inline-block px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-primary-500 to-pink-600 rounded-full hover:shadow-2xl hover:shadow-primary-500/50 transition-all duration-300 hover:scale-105"
                target="_blank"
                rel="noopener noreferrer"
              >
                {buttonText}
              </Link>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
