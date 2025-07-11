import { useModuleApps } from '@modern-js/plugin-garfish/runtime';

const Index = () => {
  const { Dashboard } = useModuleApps();

  return (
    <div>
      <h1>Component from host</h1>
      <Dashboard />
    </div>
  );
};

export default Index;