export interface FabricCaServerConfig {
  version?: string;
  port?: number;
  cors?: {
    enabled?: boolean;
    origins?: string[];
  };
  debug?: boolean;
  crlsizelimit?: number;
  tls?: {
    enabled?: boolean;
    certfile?: string;
    keyfile?: string;
    clientauth?: {
      type?: string;
      certfiles?: string[];
    };
  };
  ca?: {
    name?: string;
    keyfile?: string;
    certfile?: string;
    chainfile?: string;
    reenrollIgnoreCertExpiry?: boolean;
  };
  crl?: {
    expiry?: string;
  };
  registry?: {
    maxenrollments?: number;
    identities?: {
      name?: string;
      pass?: string;
      type?: string;
      affiliation?: string;
      attrs?: Record<string, any>;
    }[];
  };
  db?: {
    type?: string;
    datasource?: string;
    tls?: {
      enabled?: boolean;
      certfiles?: string[];
      client?: {
        certfile?: string;
        keyfile?: string;
      };
    };
  };
  ldap?: {
    enabled?: boolean;
    url?: string;
    tls?: {
      certfiles?: string[];
      client?: {
        certfile?: string;
        keyfile?: string;
      };
    };
    attribute?: {
      names?: string[];
      converters?: {
        name?: string;
        value?: string;
      }[];
      maps?: Record<string, { name?: string; value?: string }[]>;
    };
  };
  affiliations?: Record<string, string[] | Record<string, string[]>>;
  signing?: {
    default?: {
      usage?: string[];
      expiry?: string;
    };
    profiles?: {
      ca?: {
        usage?: string[];
        expiry?: string;
        caconstraint?: {
          isca?: boolean;
          maxpathlen?: number;
        };
      };
      tls?: {
        usage?: string[];
        expiry?: string;
      };
    };
  };
  csr?: {
    cn?: string;
    keyrequest?: {
      algo?: string;
      size?: number;
    };
    names?: {
      C?: string;
      ST?: string;
      L?: string;
      O?: string;
      OU?: string;
    }[];
    hosts?: string[];
    ca?: {
      expiry?: string;
      pathlength?: number;
    };
  };
  idemix?: {
    rhpoolsize?: number;
    nonceexpiration?: string;
    noncesweepinterval?: string;
    curve?: string;
  };
  bccsp?: {
    default?: string;
    sw?: {
      hash?: string;
      security?: number;
      filekeystore?: {
        keystore?: string;
      };
    };
  };
  cacount?: number;
  cafiles?: string[];
  intermediate?: {
    parentserver?: {
      url?: string;
      caname?: string;
    };
    enrollment?: {
      hosts?: string[];
      profile?: string;
      label?: string;
    };
    tls?: {
      certfiles?: string[];
      client?: {
        certfile?: string;
        keyfile?: string;
      };
    };
  };
  cfg?: {
    identities?: {
      passwordattempts?: number;
    };
  };
  operations?: {
    listenAddress?: string;
    tls?: {
      enabled?: boolean;
      cert?: {
        file?: string;
      };
      key?: {
        file?: string;
      };
      clientAuthRequired?: boolean;
      clientRootCAs?: {
        files?: string[];
      };
    };
  };
  metrics?: {
    provider?: string;
    statsd?: {
      network?: string;
      address?: string;
      writeInterval?: string;
      prefix?: string;
    };
  };
}
