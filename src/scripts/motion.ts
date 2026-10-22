/**
 * Mawaddah — interaksi & gerak global (±3 KB).
 * Semua efek bersifat tambahan: tanpa JS, konten tetap tampil utuh.
 */
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/* ---------- Muncul saat terlihat ---------- */
const revealTargets = document.querySelectorAll<HTMLElement>('[data-reveal], [data-split], [data-media], [data-count], [data-progress], [data-inview]');

/* Angka "tahun berkhidmat" dihitung di peramban agar selalu mengikuti tahun berjalan */
document.querySelectorAll<HTMLElement>('[data-sejak]').forEach((el) => {
  const th = new Date().getFullYear() - Number(el.dataset.sejak);
  if (th > 0) { el.dataset.count = String(th); el.textContent = format(th, el); }
});

function onEnter(el: HTMLElement) {
  el.classList.add('is-in');
  if (el.hasAttribute('data-count')) countUp(el);
}

if (!('IntersectionObserver' in window) || reduce) {
  revealTargets.forEach((el) => {
    el.classList.add('is-in');
    if (el.hasAttribute('data-count')) el.textContent = format(Number(el.dataset.count), el);
  });
} else {
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          onEnter(e.target as HTMLElement);
          io.unobserve(e.target);
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
  );
  revealTargets.forEach((el) => io.observe(el));
}

/* ---------- Hitung naik ---------- */
function format(n: number, el: HTMLElement) {
  return new Intl.NumberFormat('id-ID').format(Math.round(n)) + (el.dataset.suffix ?? '');
}
function countUp(el: HTMLElement) {
  const target = Number(el.dataset.count);
  const dur = 1800;
  const t0 = performance.now();
  const ease = (t: number) => 1 - Math.pow(2, -10 * t);
  const tick = (now: number) => {
    const p = Math.min(1, (now - t0) / dur);
    el.textContent = format(target * (p === 1 ? 1 : ease(p)), el);
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

/* ---------- Header: menempel, sembunyi saat turun, muncul saat naik ---------- */
const header = document.querySelector<HTMLElement>('[data-header]');
const sheet = document.getElementById('menu-sheet') as HTMLDialogElement | null;
if (header) {
  let lastY = window.scrollY;
  let ticking = false;
  const update = () => {
    const y = window.scrollY;
    header.toggleAttribute('data-scrolled', y > 24);
    const goingDown = y > lastY + 4;
    const goingUp = y < lastY - 4;
    const focusInside = header.contains(document.activeElement);
    if (goingDown && y > 480 && !focusInside) header.setAttribute('data-hidden', '');
    else if (goingUp || y < 480) header.removeAttribute('data-hidden');
    lastY = y;
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  header.addEventListener('focusin', () => header.removeAttribute('data-hidden'));
  update();
}

/* ---------- Menu seluler (dialog native: Esc & fokus terkunci otomatis) ---------- */
const openBtn = document.querySelector<HTMLButtonElement>('[data-menu-open]');
if (sheet && openBtn) {
  openBtn.addEventListener('click', () => {
    sheet.showModal();
    openBtn.setAttribute('aria-expanded', 'true');
    document.documentElement.style.overflow = 'hidden';
  });
  sheet.addEventListener('close', () => {
    openBtn.setAttribute('aria-expanded', 'false');
    document.documentElement.style.overflow = '';
    openBtn.focus();
  });
  sheet.querySelector('[data-menu-close]')?.addEventListener('click', () => sheet.close());
  sheet.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => sheet.close()));
  window.matchMedia('(min-width: 1024px)').addEventListener('change', (e) => { if (e.matches && sheet.open) sheet.close(); });
}

/* ---------- Tombol salin (rekening, dll.) ---------- */
document.querySelectorAll<HTMLButtonElement>('[data-copy]').forEach((btn) => {
  const label = btn.querySelector('[data-copy-label]');
  const original = label?.textContent ?? '';
  btn.addEventListener('click', async () => {
    const text = btn.dataset.copy ?? '';
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = Object.assign(document.createElement('textarea'), { value: text });
      document.body.append(ta); ta.select(); document.execCommand('copy'); ta.remove();
    }
    btn.classList.add('is-copied');
    if (label) label.textContent = 'Tersalin';
    announce(`Nomor ${text} tersalin`);
    window.setTimeout(() => {
      btn.classList.remove('is-copied');
      if (label) label.textContent = original;
    }, 2200);
  });
});

/* Wilayah pengumuman untuk pembaca layar */
function announce(msg: string) {
  let region = document.getElementById('sr-live');
  if (!region) {
    region = Object.assign(document.createElement('div'), { id: 'sr-live', className: 'sr-only' });
    region.setAttribute('aria-live', 'polite');
    document.body.append(region);
  }
  region.textContent = '';
  window.setTimeout(() => { region!.textContent = msg; }, 50);
}
(window as any).__announce = announce;

/* ---------- Pratinjau mengikuti kursor (hanya pointer presisi) ---------- */
document.querySelectorAll<HTMLElement>('[data-cursor-preview]').forEach((list) => {
  if (!finePointer || reduce) return;
  const preview = list.querySelector<HTMLElement>('[data-preview]');
  if (!preview) return;
  let x = 0, y = 0, cx = 0, cy = 0, raf = 0, active = false;
  const loop = () => {
    cx += (x - cx) * 0.14;
    cy += (y - cy) * 0.14;
    preview.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%) rotate(${(x - cx) * 0.04}deg)`;
    if (active || Math.abs(x - cx) > 0.5) raf = requestAnimationFrame(loop);
  };
  list.addEventListener('pointermove', (e) => {
    const r = list.getBoundingClientRect();
    x = e.clientX - r.left; y = e.clientY - r.top;
    if (!active) { cx = x; cy = y; }
  });
  list.querySelectorAll<HTMLElement>('[data-preview-item]').forEach((item) => {
    item.addEventListener('pointerenter', () => {
      preview.dataset.tone = item.dataset.previewItem;
      preview.classList.add('is-on');
      if (!active) { active = true; raf = requestAnimationFrame(loop); }
    });
  });
  list.addEventListener('pointerleave', () => {
    active = false;
    preview.classList.remove('is-on');
    cancelAnimationFrame(raf);
  });
});

/* ---------- Tombol magnetik halus ---------- */
if (finePointer && !reduce) {
  document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) * 0.18;
      const dy = (e.clientY - (r.top + r.height / 2)) * 0.28;
      el.style.transform = `translate(${dx}px, ${dy}px)`;
    });
    el.addEventListener('pointerleave', () => { el.style.transform = ''; });
  });
}

/* ---------- Dropdown navigasi desktop ---------- */
const subs = [...document.querySelectorAll<HTMLElement>('[data-sub]')];
const closeAll = (except?: HTMLElement) =>
  subs.forEach((li) => {
    if (li === except) return;
    li.classList.remove('open');
    li.querySelector('.nav-trigger')?.setAttribute('aria-expanded', 'false');
  });
subs.forEach((li) => {
  const trigger = li.querySelector<HTMLButtonElement>('.nav-trigger')!;
  trigger.addEventListener('click', () => {
    const open = !li.classList.contains('open');
    closeAll(li);
    li.classList.toggle('open', open);
    trigger.setAttribute('aria-expanded', String(open));
  });
  li.addEventListener('mouseleave', () => {
    li.classList.remove('open');
    trigger.setAttribute('aria-expanded', 'false');
  });
  li.addEventListener('focusout', (e) => {
    if (!li.contains(e.relatedTarget as Node)) { li.classList.remove('open'); trigger.setAttribute('aria-expanded', 'false'); }
  });
  li.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && li.classList.contains('open')) { closeAll(); trigger.focus(); }
  });
});
document.addEventListener('click', (e) => { if (!subs.some((li) => li.contains(e.target as Node))) closeAll(); });
