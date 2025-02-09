module.exports = {
  apps: [
    {
      name: 'triploomserver',
      script: 'dist/server.js', // Ensure TypeScript compiles to `dist/`
      instances: 'max', // Use all available CPU cores
      exec_mode: 'cluster', // Runs multiple instances for scalability
      watch: false, // Set to `true` if you want automatic reloads on changes
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
