
import { PageHeader } from "@/components/ui/page-header";
import ConfigDetailSheet from "@/components/configurator/ConfigDetailSheet";
import { ProjectConfig } from "@/types/configurator";

interface ConfiguratorHeaderProps {
  config: ProjectConfig;
}

const ConfiguratorHeader = ({ config }: ConfiguratorHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold">Configuration de votre projet DevSecOps</h1>
      <ConfigDetailSheet config={config} />
    </div>
  );
};

export default ConfiguratorHeader;
