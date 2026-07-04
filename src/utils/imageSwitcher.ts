export function initImageSwitcher(images: string[]) {
  const imgEl = document.getElementById('profile-img') as HTMLImageElement | null;
  const dots = document.querySelectorAll<HTMLButtonElement>('[data-dot]');

  if (!imgEl || dots.length === 0) return;

  imgEl.style.transition = 'opacity 0.2s ease';

  function switchImage(index: number) {
    if (!imgEl) return;
    imgEl.style.opacity = '0';
    setTimeout(() => {
      imgEl.src = images[index];
      imgEl.style.opacity = '1';
    }, 200);

    dots.forEach((dot, i) => {
      dot.className = i === index
        ? 'h-2 w-5 rounded-full transition-all duration-300 bg-blue-400'
        : 'h-2 w-2 rounded-full transition-all duration-300 bg-white/30';
    });
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => switchImage(Number(dot.dataset.dot)));
  });
}
