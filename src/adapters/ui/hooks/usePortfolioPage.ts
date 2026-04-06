import { useCallback, useEffect, useMemo, useState } from 'react';
import type { PortfolioPageController } from '@/adapters/controllers/PortfolioPageController';
import type { LanguageOption } from '@/domain/entities/LanguageOption';
import type { PortfolioAggregate } from '@/domain/entities/PortfolioAggregate';
import type { LanguageCode } from '@/adapters/ui/i18n/translations';

interface PortfolioPageState {
  readonly languages: readonly LanguageOption[];
  readonly selectedLanguageCode: LanguageCode;
  readonly portfolio: PortfolioAggregate | null;
  readonly isLoadingLanguages: boolean;
  readonly isLoadingPortfolio: boolean;
  readonly errorMessage: string | null;
  readonly onLanguageChange: (languageCode: LanguageCode) => void;
  readonly reload: () => void;
}

const DEFAULT_LANGUAGE_CODE: LanguageCode = 'ESP';

export function usePortfolioPage(controller: PortfolioPageController): PortfolioPageState {
  const [languages, setLanguages] = useState<readonly LanguageOption[]>([]);
  const [selectedLanguageCode, setSelectedLanguageCode] =
    useState<LanguageCode>(DEFAULT_LANGUAGE_CODE);

  const [portfolio, setPortfolio] = useState<PortfolioAggregate | null>(null);
  const [isLoadingLanguages, setIsLoadingLanguages] = useState(true);
  const [isLoadingPortfolio, setIsLoadingPortfolio] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const loadPortfolio = useCallback(
    async (languageCode: LanguageCode) => {
      setIsLoadingPortfolio(true);
      setErrorMessage(null);

      try {
        const response = await controller.getPortfolio(languageCode);
        setPortfolio(response);
      } catch {
        setErrorMessage('No se pudo cargar la información del portfolio.');
      } finally {
        setIsLoadingPortfolio(false);
      }
    },
    [controller],
  );

  const loadLanguages = useCallback(async () => {
    setIsLoadingLanguages(true);
    setErrorMessage(null);

    try {
      const response = await controller.getLanguages();
      setLanguages(response);

      await loadPortfolio(DEFAULT_LANGUAGE_CODE);
    } catch {
      setLanguages([]);
      await loadPortfolio(DEFAULT_LANGUAGE_CODE);
    } finally {
      setIsLoadingLanguages(false);
    }
  }, [controller, loadPortfolio]);

  useEffect(() => {
    void loadLanguages();
  }, [loadLanguages]);

  const onLanguageChange = useCallback(
    (languageCode: LanguageCode) => {
      setSelectedLanguageCode(languageCode);
      void loadPortfolio(languageCode);
    },
    [loadPortfolio],
  );

  const reload = useCallback(() => {
    void loadPortfolio(selectedLanguageCode);
  }, [loadPortfolio, selectedLanguageCode]);

  return useMemo(
    () => ({
      languages,
      selectedLanguageCode,
      portfolio,
      isLoadingLanguages,
      isLoadingPortfolio,
      errorMessage,
      onLanguageChange,
      reload,
    }),
    [
      errorMessage,
      isLoadingLanguages,
      isLoadingPortfolio,
      languages,
      onLanguageChange,
      portfolio,
      reload,
      selectedLanguageCode,
    ],
  );
}