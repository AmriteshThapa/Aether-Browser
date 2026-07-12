import Lightfall from "../Lightfall";
import DecodeText from "../DecodeText";
import AetherSearch from "../components/AetherSearch/AetherSearch";

export default function Home() {
  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <Lightfall
        colors={["#A6C8FF", "#5227FF", "#FF9FFC"]}
        backgroundColor="#0A29FF"
        speed={0.5}
        streakCount={2}
        streakWidth={1}
        streakLength={1}
        glow={1}
        density={0.6}
        twinkle={1}
        zoom={3}
        backgroundGlow={0.5}
        opacity={1}
        mouseInteraction
        mouseStrength={0.5}
        mouseRadius={1}
      />

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "white",
          zIndex: 10,
          textAlign: "center",
        }}
      >
        <h1>
          <DecodeText text="Aether" speed={70} lockEvery={6} />
        </h1>
        <AetherSearch />
      </div>
    </div>
  );
}