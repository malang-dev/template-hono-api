type Environment = {
  Bindings: EnvironmentBindings;
};

type EnvironmentBindings = {
  // Define environment variable, if deploy in cloudflare worker
  NODE_ENV: string;
};
