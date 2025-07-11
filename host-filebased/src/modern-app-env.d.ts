/// <reference types='@modern-js/plugin-garfish/types' />
/// <reference types='@modern-js/app-tools/types' />
/// <reference types='@modern-js/runtime/types' />
/// <reference types='@modern-js/runtime/types/router' />

declare module 'remote/PlainJavascriptComponent' {
  const PlainJavascriptComponent: React.Node;
  export default PlainJavascriptComponent;
}

declare module 'remote/Button' {
  const Button: React.ComponentType<{
    onClick?: () => void;
    children?: React.ReactNode;
  }>;
  export default Button;
}

declare module 'remote/Card' {
  const Card: React.ComponentType<{
    title?: string;
    content?: string;
    children?: React.ReactNode;
  }>;
  export default Card;
}
