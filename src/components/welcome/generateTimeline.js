import gasp from "gsap";

let timeline;

export const generateTimeline = (sentences, words, characters) => {
  timeline = new gasp.timeline({ repeat: -1, repeatDelay: 0.5 });
  if (sentences[0])
    timeline
      .from(sentences[0], 1, {
        opacity: 0
      })
      .to(sentences[0], 1, {
        opacity: 0
      });
  if (sentences[1])
    timeline
      .from(sentences[1], 1, {
        opacity: 0,
        y: 100
      })
      .to(sentences[1], 1, {
        opacity: 0,
        x: -100
      });
  if (words)
    timeline.staggerFrom(
      words.filter((w) => w.id.includes("s2")),
      1,
      {
        opacity: 0,
        rotationX: -90,
        transformOrigin: "50% top"
      },
      0.2
    );
  if (characters)
    timeline.staggerTo(
      characters.filter((c) => c.id.includes("s2")),
      0.5,
      {
        opacity: 0,
        y: -20
      },
      0.1
    );
};

export const play = () => timeline.play();
export const pause = () => timeline.pause();
export const restart = () => timeline.restart();
