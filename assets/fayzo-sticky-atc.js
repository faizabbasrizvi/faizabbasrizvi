if (!customElements.get('fayzo-sticky-atc')) {
  customElements.define(
    'fayzo-sticky-atc',
    class FayzoStickyAddToCart extends HTMLElement {
      connectedCallback() {
        const targetId = this.dataset.watchTarget;
        const target = targetId && document.getElementById(targetId);
        if (!target) return;

        this.observer = new IntersectionObserver(
          (entries) => {
            const entry = entries[0];
            // Show once the real Add to Cart button has scrolled above the
            // viewport (user scrolled past it); hide while it's visible or
            // the user hasn't reached it yet.
            const scrolledPast = !entry.isIntersecting && entry.boundingClientRect.top < 0;
            this.hidden = !scrolledPast;
          },
          { threshold: 0 }
        );
        this.observer.observe(target);
      }

      disconnectedCallback() {
        if (this.observer) this.observer.disconnect();
      }
    }
  );
}
