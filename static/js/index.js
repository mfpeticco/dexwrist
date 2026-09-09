// Local design-study links can carry an explicit header treatment and angle.
const designParameters = new URLSearchParams(window.location.search);
const headerTreatment = designParameters.get('header');
if (['contained', 'accents', 'full'].includes(headerTreatment)) {
  document.documentElement.dataset.headerTreatment = headerTreatment;
}
const gradientAngle = Number(designParameters.get('angle'));
if (designParameters.has('angle') && Number.isFinite(gradientAngle) && gradientAngle >= 0 && gradientAngle <= 180) {
  document.documentElement.style.setProperty('--gradient-angle', `${gradientAngle}deg`);
}

// Keep the wrist demonstrations playing inline while respecting reduced motion.
document.addEventListener('DOMContentLoaded', () => {
  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const videos = document.querySelectorAll('video');
  const updateMotion = () => {
    videos.forEach((video) => {
      if (motionPreference.matches) {
        video.pause();
      } else {
        video.play().catch(() => {
          // Native controls remain available when autoplay is blocked.
        });
      }
    });
  };
  updateMotion();
  motionPreference.addEventListener('change', updateMotion);
});
