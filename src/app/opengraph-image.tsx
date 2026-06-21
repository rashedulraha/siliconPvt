import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "EstateHub — Premium Real Estate";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0f2e5c",
        backgroundImage:
          "radial-gradient(circle at 25% 25%, rgba(234, 179, 8, 0.15) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)",
        color: "white",
        padding: "60px",
      }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          marginBottom: "32px",
        }}>
        <div
          style={{
            width: "64px",
            height: "64px",
            borderRadius: "12px",
            background: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "32px",
          }}>
          🏠
        </div>
        <div
          style={{
            fontSize: "42px",
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}>
          EstateHub
        </div>
      </div>
      <div
        style={{
          fontSize: "64px",
          fontWeight: 700,
          textAlign: "center",
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
          maxWidth: "900px",
        }}>
        Find Your Dream Home
      </div>
      <div
        style={{
          fontSize: "28px",
          marginTop: "24px",
          opacity: 0.85,
          textAlign: "center",
        }}>
        Premium real estate listings for modern living
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "40px",
          fontSize: "20px",
          opacity: 0.7,
        }}>
        estatehub.com
      </div>
    </div>,
    { ...size },
  );
}
