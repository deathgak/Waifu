let highestZ = 1;

class Paper {
  holdingPaper = false;
  touchOffsetX = 0;
  touchOffsetY = 0;
  currentPaperX = 0;
  currentPaperY = 0;
  rotation = Math.random() * 30 - 15;
  rotating = false;

  init(paper) {
    const moveHandler = (x, y) => {
      if (this.holdingPaper) {
        this.currentPaperX = x - this.touchOffsetX;
        this.currentPaperY = y - this.touchOffsetY;

        paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
      }
    };

    // Mouse events
    paper.addEventListener('mousedown', (e) => {
      e.preventDefault();
      this.holdingPaper = true;

      paper.style.zIndex = highestZ++;
      this.touchOffsetX = e.clientX - this.currentPaperX;
      this.touchOffsetY = e.clientY - this.currentPaperY;

      const onMouseMove = (e) => moveHandler(e.clientX, e.clientY);
      const onMouseUp = () => {
        this.holdingPaper = false;
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
      };

      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    });

    // Touch events
    paper.addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.holdingPaper = true;

      const touch = e.touches[0];
      paper.style.zIndex = highestZ++;
      this.touchOffsetX = touch.clientX - this.currentPaperX;
      this.touchOffsetY = touch.clientY - this.currentPaperY;

      const onTouchMove = (e) => {
        const touch = e.touches[0];
        moveHandler(touch.clientX, touch.clientY);
      };

      const onTouchEnd = () => {
        this.holdingPaper = false;
        window.removeEventListener('touchmove', onTouchMove);
        window.removeEventListener('touchend', onTouchEnd);
      };

      window.addEventListener('touchmove', onTouchMove, { passive: false });
      window.addEventListener('touchend', onTouchEnd);
    });
  }
}

const papers = Array.from(document.querySelectorAll('.paper'));

papers.forEach(paper => {
  const p = new Paper();
  p.init(paper);
});
