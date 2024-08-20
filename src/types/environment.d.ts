type Environment = {
  Bindings: EnvironmentBindings;
};

type EnvironmentBindings = {
  remoteAddr: () => string;

  // Define all environment variables
  DENO_ENV: string;
};
