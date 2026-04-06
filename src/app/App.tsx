import { PortfolioPage } from '@/adapters/ui/pages/PortfolioPage';
import { createPortfolioPageController } from '@/infrastructure/config/dependencies';

const controller = createPortfolioPageController();

export function App(): JSX.Element {
  return <PortfolioPage controller={controller} />;
}
