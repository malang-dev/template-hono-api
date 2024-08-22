type Environment = {
  Bindings: EnvironmentBindings;
};

type EnvironmentBindings = {
  remoteAddr: () => string;

  // Define all environment variables
  NODE_ENV: string;
};
