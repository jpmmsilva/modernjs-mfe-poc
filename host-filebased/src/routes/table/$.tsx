import { useModuleApps } from '@modern-js/plugin-garfish/runtime';

const Index = () => {
  const { Table } = useModuleApps();

  return (
    <div>
      <h1>Component from host</h1>
      <Table />
    </div>
  );
};

export default Index;