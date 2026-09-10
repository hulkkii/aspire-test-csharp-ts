import { useEffect, useState } from 'react';
import { Monitor, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

type Theme = 'light' | 'dark' | 'system';
const options = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: Moon },
  { value: 'system', label: 'System', icon: Monitor },
] as const;

export function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>(() => {
    const initial = document.documentElement.dataset.theme;
    return initial === 'light' || initial === 'dark' ? initial : 'system';
  });

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    function apply() {
      const dark = theme === 'dark' || (theme === 'system' && media.matches);
      document.documentElement.dataset.theme = theme;
      document.documentElement.classList.toggle('dark', dark);
      document.documentElement.style.colorScheme = dark ? 'dark' : 'light';
    }
    apply();
    media.addEventListener('change', apply);
    return () => media.removeEventListener('change', apply);
  }, [theme]);

  function selectTheme(value: string) {
    if (value !== 'light' && value !== 'dark' && value !== 'system') return;
    setTheme(value);
    try {
      localStorage.setItem('workroom-theme', value);
    } catch { /* The selection still applies for this visit. */ }
  }

  const Icon = options.find((option) => option.value === theme)!.icon;
  return <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="header" size="icon" aria-label={`Theme: ${theme}`} title="Change theme">
        <Icon aria-hidden="true" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuGroup>
        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={theme} onValueChange={selectTheme} aria-label="Theme">
          {options.map(({ value, label, icon: OptionIcon }) =>
            <DropdownMenuRadioItem key={value} value={value}><OptionIcon aria-hidden="true" />{label}</DropdownMenuRadioItem>)}
        </DropdownMenuRadioGroup>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>;
}
