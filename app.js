let isPause = false,
  isComplete = false;
const Complete = () => {
  isComplete = true;
};
const ballAnimation = () => {
  var tl = new TimelineMax();

  tl.staggerFrom(".ball", 1.5, {
    y: -400,
    onStart: function () {
      isComplete = false;
    },
    ease: Bounce.easeOut,
  });
  tl.add("ball-going");
  tl.staggerTo(
    ".ball",
    2.5,
    {
      x: 750,
      ease: Power1.easeOut,
    },
    "-=.2",
    "ball-going"
  );
  tl.staggerTo(
    ".ball",
    2.4,
    {
      rotation: 500,
    },
    "-=2.8",
    "ball-going"
  );
  tl.staggerTo(".ball", 1, {
    y: 800,
    rotation: 180,
    ease: Power1.easeIn,
    onComplete: Complete,
  });
  return tl;
};

const repeat = new TimelineMax();
repeat.add(ballAnimation());

Draggable.create(".btn-playPaused", {
  cursor: "pointer",
  liveSnap: [10],
  onClick: function () {
    if (isPause) {
      repeat.play();
      isPause = false;
    } else if (isComplete) {
      repeat.restart();
    } else {
      repeat.pause();
      isPause = true;
    }
  },
});
