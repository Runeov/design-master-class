export const getTheme = (themeName) => {
  const themes = {
    green: {
      bg: 'bg-emerald-50',
      text: 'text-emerald-600',
      border: 'border-emerald-200',
      accent: 'bg-emerald-500',
      subtle: 'bg-emerald-100',
    },
    orange: {
      bg: 'bg-orange-50',
      text: 'text-orange-600',
      border: 'border-orange-200',
      accent: 'bg-orange-500',
      subtle: 'bg-orange-100',
    }
  };
  return themes[themeName] || themes.green;
};