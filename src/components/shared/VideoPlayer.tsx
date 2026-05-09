"use client";

import { useState, useEffect } from "react";

interface VideoPlayerProps {
  url: string;
  title?: string;
}

export default function VideoPlayer({ url, title }: VideoPlayerProps) {
  const [videoType, setVideoType] = useState<"youtube" | "vimeo" | "drive" | "unknown">("unknown");
  const [embedUrl, setEmbedUrl] = useState<string>("");

  useEffect(() => {
    if (!url) return;

    // YouTube
    const ytMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    if (ytMatch) {
      setVideoType("youtube");
      setEmbedUrl(`https://www.youtube.com/embed/${ytMatch[1]}`);
      return;
    }

    // Vimeo
    const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
    if (vimeoMatch) {
      setVideoType("vimeo");
      setEmbedUrl(`https://player.vimeo.com/video/${vimeoMatch[1]}`);
      return;
    }

    // Google Drive
    const driveMatch = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (driveMatch) {
      setVideoType("drive");
      setEmbedUrl(`https://drive.google.com/file/d/${driveMatch[1]}/preview`);
      return;
    }

    // Google Drive share link
    const driveShareMatch = url.match(/drive\.google\.com\/open\?id=([a-zA-Z0-9_-]+)/);
    if (driveShareMatch) {
      setVideoType("drive");
      setEmbedUrl(`https://drive.google.com/file/d/${driveShareMatch[1]}/preview`);
      return;
    }

    setVideoType("unknown");
  }, [url]);

  if (!url) return null;

  if (videoType === "youtube" || videoType === "vimeo") {
    return (
      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-charcoal-light">
        <iframe
          src={embedUrl}
          title={title || "Video"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
    );
  }

  if (videoType === "drive") {
    return (
      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-charcoal-light border border-charcoal-200">
        <iframe
          src={embedUrl}
          title={title || "Google Drive Video"}
          allow="autoplay"
          className="absolute inset-0 w-full h-full"
        />
      </div>
    );
  }

  // Fallback for unknown URLs - show link
  return (
    <div className="w-full aspect-video rounded-xl bg-charcoal-light border border-charcoal-200 flex items-center justify-center">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-hover transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
        Buka Video
      </a>
    </div>
  );
}