import type { LanguageOption } from '@/domain/entities/LanguageOption';
import { LanguageCode } from '@/adapters/ui/i18n/translations';

interface LanguageSelectorProps {
  readonly languages: readonly LanguageOption[];
  readonly selectedLanguageCode: LanguageCode;
  readonly onChange: (languageCode: LanguageCode) => void;
  readonly disabled?: boolean;
}

export function LanguageSelector({
  languages,
  selectedLanguageCode,
  onChange,
  disabled = false,
}: LanguageSelectorProps): JSX.Element | null {
  if (languages.length === 0) return null;

  return (
    <div className="language-dropdown">
      <select
        value={selectedLanguageCode}
        onChange={(e) => onChange(e.target.value as LanguageCode)}
        disabled={disabled}
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.language}
          </option>
        ))}
      </select>
    </div>
  );
}