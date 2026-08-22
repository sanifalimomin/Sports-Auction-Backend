const playerImages = import.meta.glob('../assets/images/**/*.{png,jpg,jpeg,webp,gif}', {
  eager: true,
  import: 'default',
});

export function resolvePlayerImage(picture, placeholder) {
  if (!picture) {
    return placeholder;
  }

  const normalized = String(picture).replace(/\\/g, '/');
  const match = Object.entries(playerImages).find(([key]) => {
    const filePath = key.replace(/\\/g, '/');
    return (
      filePath.endsWith(`/assets/images/${normalized}`) ||
      filePath.endsWith(`/${normalized}`)
    );
  });

  return match ? match[1] : placeholder;
}
