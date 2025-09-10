/**
 * This file was automatically generated based on your preset configuration.
 *
 * For better type checking and IntelliSense:
 * 1. Install azion as dev dependency:
 *    npm install -D azion
 *
 * 2. Use defineConfig:
 *    import { defineConfig } from 'azion'
 *
 * 3. Replace the configuration with defineConfig:
 *    export default defineConfig({
 *      // Your configuration here
 *    })
 *
 * For more configuration options, visit:
 * https://github.com/aziontech/lib/tree/main/packages/config
 */

export default {
  build: {
    preset: 'typescript',
    polyfills: true,
    entry: 'index.ts'
  },
  functions: [
    {
      name: 'mindthesec-security-demo',
      path: './functions/index.js',
      bindings: {
        storage: {
          bucket: 'mindthesec-security-demo',
          prefix: '20250910122545'
        }
      }
    }
  ],
  storage: [
    {
      name: 'mindthesec-security-demo',
      prefix: '20250910122545',
      dir: './src/templates',
      edgeAccess: 'read_only'
    }
  ],
  connectors: [
    {
      name: 'mindthesec-security-demo',
      active: true,
      type: 'storage',
      attributes: {
        bucket: 'mindthesec-security-demo',
        prefix: '20250910122545'
      }
    }
  ],
  applications: [
    {
      name: 'mindthesec-security-demo',
      rules: {
        request: [
          {
            name: 'Deliver Static Assets',
            description: 'Deliver static assets directly from storage',
            active: true,
            criteria: [
              [
                {
                  variable: '${uri}',
                  conditional: 'if',
                  operator: 'matches',
                  argument:
                    '\\.(jpg|jpeg|png|gif|bmp|webp|svg|ico|ttf|otf|woff|woff2|eot|pdf|doc|docx|xls|xlsx|ppt|pptx|mp4|webm|mp3|wav|ogg|css|js|json|xml|html|txt|csv|zip|rar|7z|tar|gz|webmanifest|map|md|yaml|yml)$'
                }
              ]
            ],
            behaviors: [
              {
                type: 'set_connector',
                attributes: {
                  value: 'mindthesec-security-demo'
                }
              },
              {
                type: 'deliver'
              }
            ]
          },
          {
            name: 'Redirect to index.html',
            description:
              'Handle all routes by rewriting to index.html for client-side routing',
            active: true,
            criteria: [
              [
                {
                  variable: '${uri}',
                  conditional: 'if',
                  operator: 'matches',
                  argument: '^\\/'
                }
              ]
            ],
            behaviors: [
              {
                type: 'set_connector',
                attributes: {
                  value: 'mindthesec-security-demo'
                }
              },
              {
                type: 'rewrite_request',
                attributes: {
                  value: '/homepage.html'
                }
              }
            ]
          },
          {
            name: 'Execute Function',
            description: 'Execute function for all requests',
            active: true,
            criteria: [
              [
                {
                  variable: '${uri}',
                  conditional: 'if',
                  operator: 'matches',
                  argument: '^/'
                }
              ]
            ],
            behaviors: [
              {
                type: 'run_function',
                attributes: {
                  value: 'mindthesec-security-demo'
                }
              }
            ]
          }
        ]
      },
      functionsInstances: [
        {
          name: 'mindthesec-security-demo',
          ref: 'mindthesec-security-demo'
        }
      ]
    }
  ],
  workloads: [
    {
      name: 'mindthesec-security-demo',
      active: true,
      infrastructure: 1,
      protocols: {
        http: {
          versions: ['http1', 'http2'],
          httpPorts: [80],
          httpsPorts: [443],
          quicPorts: null
        }
      },
      deployments: [
        {
          name: 'mindthesec-security-demo',
          current: true,
          active: true,
          strategy: {
            type: 'default',
            attributes: {
              application: 'mindthesec-security-demo'
            }
          }
        }
      ]
    }
  ]
}
