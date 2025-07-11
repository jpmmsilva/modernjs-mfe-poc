import { kit, ERROR_TYPE } from '@module-federation/modern-js/runtime';

const { createRemoteComponent } = kit;

const Button = createRemoteComponent(
  {
    loader: () => {
      return import('remote/Button');
    },
    loading: 'loading...',
    export: 'default',
    fallback: ({ error, errorType, dataFetchMapKey }) => {
      console.log(error, errorType, dataFetchMapKey)
      if (errorType === ERROR_TYPE.LOAD_REMOTE) {
        return <div>load remote failed</div>
      }
      return <div>error type is unknown</div>;
    }
  }
)






const Index = (): JSX.Element => {
  return (
    <div>
      <h1>Basic usage with data fetch</h1>
      <Button />
    </div>
  );
};

export default Index;