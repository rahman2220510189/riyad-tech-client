import { ImageResponse } from "next/og";

/**
 * The card that appears when the site is pasted into Slack, LinkedIn or a
 * message. Generated rather than designed in a file, so the copy can never
 * drift from the page it represents.
 *
 * Set in the same palette and the same voice as the site: a claim, a proof
 * line, no logo soup and no gradient.
 */
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
  "Riyad Tech — we turn document work into software. First working version in two weeks.";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F4F5F0",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: "#131A19",
          }}
        >
          Riyad Tech
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: 76,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "#131A19",
              maxWidth: 900,
            }}
          >
            We turn document work into
            {/* The marker, drawn rather than described — satori has no
                pseudo-elements, so the highlight is a box behind the word. */}
            <span
              style={{
                display: "flex",
                background: "#FFD84D",
                padding: "0 10px",
                marginLeft: 16,
                borderRadius: 4,
              }}
            >
              software
            </span>
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 32,
              fontSize: 28,
              color: "#3A4443",
              maxWidth: 820,
            }}
          >
            AI systems that read your documents, pull out the data, and put it
            where it belongs.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 40,
            fontSize: 20,
            color: "#6E7A77",
            borderTop: "1px solid #DCE0D8",
            paddingTop: 28,
          }}
        >
          <span>First version in 2 weeks</span>
          <span>·</span>
          <span>Fixed price from €1,500</span>
          <span>·</span>
          <span>Processed in the EU</span>
        </div>
      </div>
    ),
    size,
  );
}