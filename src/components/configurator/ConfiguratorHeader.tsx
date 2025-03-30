
import { PageHeader } from "@/components/ui/page-header";
import ConfigDetailSheet from "@/components/configurator/ConfigDetailSheet";
import { ProjectConfig } from "@/types/configurator";
import { useIsMobile, useIsTablet } from "@/hooks/use-mobile";

interface ConfiguratorHeaderProps {
  config: ProjectConfig;
}

const ConfiguratorHeader = ({ config }: ConfiguratorHeaderProps) => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
      <h1 className={`${isMobile ? 'text-xl' : isTablet ? 'text-2xl' : 'text-3xl'} font-bold mb-3 sm:mb-0`}>
        Configuration de votre projet DevSecOps
      </h1>
      <div className="mt-2 sm:mt-0">
        <ConfigDetailSheet config={config} />
      </div>
    </div>
  );
};

export default ConfiguratorHeader;
