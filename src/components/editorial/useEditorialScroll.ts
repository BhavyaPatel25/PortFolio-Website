import { useEffect, type RefObject } from 'react';

/** One scroll frame updates the reading guide and motion throughout the page. */
export function useEditorialScroll(root: RefObject<HTMLDivElement>) {
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobile = window.matchMedia('(max-width: 600px)');
    const hero = element.querySelector<HTMLElement>('.ed-hero');
    const covers = [...element.querySelectorAll<HTMLElement>('.ed-cover')];
    const sections = [...element.querySelectorAll<HTMLElement>('.ed-section')];
    const chapters = [...element.querySelectorAll<HTMLAnchorElement>('[data-chapter]')];
    const timeline = element.querySelector<HTMLElement>('.ed-experience-list');
    let frame = 0;
    const clamp = (value: number) => Math.max(0, Math.min(1, value));
    const update = () => {
      frame = 0;
      const height = window.innerHeight;
      // Read geometry before writes, including after an accordion changes height.
      const heroRect = hero?.getBoundingClientRect();
      const coverRects = covers.map(cover => cover.getBoundingClientRect());
      const sectionRects = sections.map(section => section.getBoundingClientRect());
      const timelineRect = timeline?.getBoundingClientRect();
      const scrollable = document.documentElement.scrollHeight - height;
      let active = '';
      sectionRects.forEach((rect, index) => {
        if (rect.top <= height * 0.45) active = sections[index].id;
      });
      if (scrollable > 0 && window.scrollY >= scrollable - 2) active = 'contact';
      chapters.forEach(chapter => {
        if (chapter.dataset.chapter === active) chapter.setAttribute('aria-current', 'location');
        else chapter.removeAttribute('aria-current');
      });
      if (media.matches) return;
      const strength = mobile.matches ? 0.35 : 1;
      element.style.setProperty('--ed-page-progress', String(scrollable > 0 ? clamp(window.scrollY / scrollable) : 0));
      if (hero && heroRect) {
        hero.style.setProperty('--ed-drift', `${clamp(-heroRect.top / heroRect.height) * 32 * strength}px`);
      }
      covers.forEach((cover, index) => {
        const rect = coverRects[index];
        if (rect.bottom < 0 || rect.top > height) return;
        const progress = clamp((height - rect.top) / (height + rect.height));
        cover.style.setProperty('--ed-depth', `${(progress - 0.5) * 48 * strength}px`);
      });
      sections.forEach((section, index) => {
        const rect = sectionRects[index];
        section.style.setProperty('--ed-section-progress', String(clamp((height * 0.65 - rect.top) / rect.height)));
      });
      if (timeline && timelineRect) {
        timeline.style.setProperty('--ed-progress', String(clamp((height * 0.6 - timelineRect.top) / timelineRect.height)));
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const preferenceChanged = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      if (media.matches) {
        element.style.removeProperty('--ed-page-progress');
        hero?.style.removeProperty('--ed-drift');
        covers.forEach(cover => cover.style.removeProperty('--ed-depth'));
        sections.forEach(section => section.style.removeProperty('--ed-section-progress'));
        timeline?.style.removeProperty('--ed-progress');
      }
      schedule();
    };
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    media.addEventListener('change', preferenceChanged);
    const resize = new ResizeObserver(schedule);
    resize.observe(element);
    schedule();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      media.removeEventListener('change', preferenceChanged);
      resize.disconnect();
    };
  }, [root]);
}
