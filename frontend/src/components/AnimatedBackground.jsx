import { useCallback } from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

function AnimatedBackground() {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: {
          color: {
            value: "#0f172a",
          },
        },
        fullScreen: {
          enable: true,
          zIndex: -1,
        },
        particles: {
          number: {
            value: 80,
          },
          color: {
            value: "#38bdf8",
          },
          links: {
            enable: true,
            color: "#38bdf8",
          },
          move: {
            enable: true,
            speed: 2,
          },
        },
      }}
    />
  );
}

export default AnimatedBackground;